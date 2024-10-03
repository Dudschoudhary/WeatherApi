import React, { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'https://weatherapi-com.p.rapidapi.com/current.json?';

const WeatherApi = () => {
    const [record, setRecord] = useState(null); // Start with null

    const fetchData = async () => {
        try {
            const response = await axios.get(url, {
                params: { q: '53.1,-0.13' },
                headers: {
                    'x-rapidapi-key': 'e77d0e53c2mshacbad01d6303583p1183d6jsnfbf9b61c70af',
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                }
            });
            setRecord(response.data); // Set the fetched data directly
            console.log(response.data); // Log the fetched data
        } catch (error) {
            console.log(error); // Log the error
            setError('Failed to fetch data');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Prepare data for mapping
    const weatherData = record ? [
        {
            id: 'location', // Just a placeholder ID
            name: record.location.name,
            temp: record.current.temp_c,
            condition: record.current.condition.text
        }
    ] : [];

    return (
        <div>
            <h1>Weather API</h1>
            
            
            {weatherData.length > 0 ? ( // Check if there's data to display
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Temperature (°C)</th>
                            <th>Condition</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weatherData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.temp}</td>
                                <td>{item.condition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p> // Loading state
            )}
        </div>
    );
};

export default WeatherApi;
