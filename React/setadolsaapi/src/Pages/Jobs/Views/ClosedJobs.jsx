import React from 'react';
import { Link } from "react-router-dom";
import { ListOfJobs } from "./JobsInProcess"
import { useState, useEffect } from "react"
import Spiner from '../../../Components/Spiner'
import Searcher from '../../../Components/Searcher';



const ClosedJobs = () => {
    
    const [allJobs, setAllJobs] = useState([])
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        AllJobs()
      }, [])

    const AllJobs = async () => {
        try{
          await fetch('http://localhost:3333/jobs/closeds', {
              method: "GET",
              headers: {
                  "Content-Type" : "application/json",
                  "auth-token" : localStorage.getItem("jwt")
              },
              }).then(response => response.json())
              .then(data => setAllJobs(data.array))
      }catch (err) {
          alert(err);
        }
    }
    return (
        <main>
            <br />
            <h1>Trabajos Cerrados:</h1>
            <br />
            <Searcher array={allJobs}/>
            <br />
            {allJobs.length > 0 ?
            <ListOfJobs jobs={allJobs} selected={selected} setSelected={setSelected}/>
            : <Spiner />}
        </main>
    )
}

export default ClosedJobs;