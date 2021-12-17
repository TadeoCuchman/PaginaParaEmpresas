import React from 'react';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import Spiner from '../../../Components/Spiner'
import Searcher from '../../../Components/Searcher';

const JobsInProcess = () => {
    const [allJobs, setAllJobs] = useState([])
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        AllJobs()
      }, [])

    const AllJobs = async () => {
        try{
          await fetch('http://localhost:3333/jobs/onProcess', {
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
            <h1>Trabajos en Proceso:</h1>
            <br />
            <Searcher array={allJobs}/>
            <br />
            {allJobs.length > 0 ?
            <ListOfJobs jobs={allJobs} selected={selected} setSelected={setSelected}/>
            : <Spiner/>}
        </main>
    )
}

export const ListOfJobs = (props) => {
    const jobs =  props.jobs

    if (jobs){
        return(
            <ul id='contacts'>
                {jobs && jobs.map(((job, key) => {
                    return ( <Job
                        key={key}
                        id={job.id}
                        codigo={job.codigo}
                        fecha={job.fecha}
                        tipo_de_trabajo={job.tipo_de_trabajo}
                        cliente={job.nombre_fantasia}
                        planta={job.nombre_fantasia_planta}
                        fecha_de_inicio={job.fecha_de_inicio}
                        descripcion={job.descripcion}
                        selected={job.id === props.selected}
                        setSelected={props.setSelected}
                        setEditContactPopUp={props.setEditJobPopUp}
                        />)
                }))}
            </ul>
        )
    } else { return[] }
}

const Job = (props) => {

    return (
        <li className={props.selected ? "contact2" : "contact"} onClick={() => props.setSelected(props.id)}>
            <h4>Tipo de Trabajo: {props.tipo_de_trabajo}</h4>
            <br />
            <span>Cliente: {props.cliente}</span>
            <br />
            <span>Planta: {props.planta}</span>
            <br />
            <span>Codigo: {props.codigo}</span>
            <br />
            <span>Fecha: {props.fecha}</span>
            <br />
            <span>Fecha de inicio: {props.fecha_de_inicio}</span>
            <br />
            <span>Descripción:{props.id} {props.descripcion}</span>
            <br />
            <Link to={`/Job/${props.id}`}><button> Ir a trabajo </button> </Link>
        </li>
    )
}


export default JobsInProcess;