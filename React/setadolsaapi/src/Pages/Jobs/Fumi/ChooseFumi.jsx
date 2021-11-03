import React from 'react';
import { useState } from "react"
import { Link } from "react-router-dom";

const ChooseFumi = () => {
    const [option, setOption] = useState('')

    const OptionJob = () => {}

    return (
      <main>
        <br />
        <h1>Elegir Fumigación:</h1>
        <br />
        <select onChange={(a) => setOption(a.target.value)} placeholder='Trabajo:'>
          <option disabled defaultValue selected value=''> Trabajo: </option>
          <option value='1'> Fumigación 1 </option>
        </select>
        <br />
        <br />
        { option !== '' &&
        <Link to={`/Fumi/${option}`}><button>Enter</button></Link>
        }
      </main>
    )
}

export default ChooseFumi;
