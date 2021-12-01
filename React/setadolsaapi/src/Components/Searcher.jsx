import React from 'react';
import { useState, useEffect} from 'react';
    
const Searcher = () => {
    const [research, setResearch] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        GoResearch()
    }, [research])

    const GoResearch = () => {
        fetch(`http://localhost:3333/search/?search=${research}`)
            .then(response => response.json())
            .then(data => { setData(data.array) })
    }

    return (
        <div>
            <input type='text' id='searcher' placeholder='Research' onChange={(e) => {setResearch(e.target.value)}}/>
            { (data.length > 0) && (research !== '') && 
            <ul id='searched'>
                { data.map((data, key) => { if (key < 8) return <li>{data.nombre.fantasia + ' | ' + data }</li>})}
            </ul>}
        </div>
    )
}

export default Searcher;

