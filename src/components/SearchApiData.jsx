import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
const url = 'https://weatherapi-com.p.rapidapi.com/current.json?'
const SearchApiData = () => {
    const [record, setRecord] = useState(null)
    const [input, setInput] = useState('');
    const fetchData = async (input) => {
        try {
            const response = await axios.get(url, {
                params: { q: input.trim() },

                headers: {
                    'x-rapidapi-key': 'e77d0e53c2mshacbad01d6303583p1183d6jsnfbf9b61c70af',
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                }

            })
            setRecord(response.data)
            console.log(response.data)


        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const searchData = (e) => {
        e.preventDefault()
        // console.log(input)
        if (input) {
            fetchData(input)
        }
    }
    return (
        <>
            <div>SearchApiData</div>
            <form onClick={searchData}>
                <input type="text" placeholder='search data ' value={input} className='border outline-none px-4 py-1 rounded' onChange={(e) => setInput(e.target.value)} /><br />
                <button className='btn bg-teal-200 px-2 py-1 rounded my-4 hover:bg-slate-500 '>Submit</button>
            </form>
            {record ? (
                <>
                    <div>Location name:- {record.location.name}</div>
                    <div>Country Name:- {record.location.country}</div>
                    <div>Region name:- {record.location.region}</div>
                    <div>Current Tep:- {record.current.temp_c}</div>

                </>
            )
                : (
                    <div>Data Not Fopund</div>
        )}
        </>

    )
}

export default SearchApiData