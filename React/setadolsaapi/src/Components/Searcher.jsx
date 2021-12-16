import React from 'react';
import { useState, useEffect} from 'react';
    
const Searcher = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(props.array)
    },[])

    console.log(data)
    

    function search (word) {
       const result = data.filter(object => object.nombre === word || object.nombre_fantasia === word)
       
       return (result)
    }

    return (
        <div>
            <input type='text' id='searcher' placeholder='Research' onChange={(e) => setData(search(e.target.value))}/>
            { (data.length > 0) && 
            <ul id='searched'>
                { data.map((data, key) => { if (key < 8) return <li>{data.nombre_fantasia + data.nombre }</li>})}
            </ul>}
        </div>
    )
}

export default Searcher;

