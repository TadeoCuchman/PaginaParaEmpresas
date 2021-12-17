import React from 'react';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import { ListOfJobs } from "./Views/JobsInProcess"

const FinishJob = () => {
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

    const finishJob = async (a, array) => {
        try{
            const Job = array.find((job) => job.id === a)
            if (Job){
            await fetch(`http://localhost:3333/jobs/finishJob/${a}`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "auth-token" : localStorage.getItem("jwt")
                },
                body: JSON.stringify(Job)
            }).then(function(respuesta) {
                return respuesta.json()
            }).then(function (res) {
                if (res.success === false) {
                    alert (res.message);
                } else {
                    alert (res.message)
                    AllJobs()
                }
            })
            }
        }catch(err) {
          alert('Error con servidor' + err);
        }
        
    }

    return (
        <main>
            <br />
            <h1>Facturar trabajo:</h1>
            {selected > 0 &&
            <>
            <button onClick={() => finishJob(selected, allJobs)}>Facturar</button>
            <span>{selected}</span>
            </>}
            <ListOfJobs jobs={allJobs} selected={selected} setSelected={setSelected}/>
        </main>
    )
}

export default FinishJob;