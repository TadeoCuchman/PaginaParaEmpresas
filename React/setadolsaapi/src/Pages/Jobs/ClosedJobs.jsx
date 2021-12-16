import React from 'react';
import { Link } from "react-router-dom";
import { ListOfJobs } from "./JobsInProcess"
import { useState, useEffect } from "react"



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
            <ListOfJobs jobs={allJobs} selected={selected} setSelected={setSelected}/>
        </main>
    )
}

export default ClosedJobs;