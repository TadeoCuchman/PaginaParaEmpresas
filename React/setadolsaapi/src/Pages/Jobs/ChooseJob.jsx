import React from 'react';
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const ChooseJob = (props) => {
  const [option, setOption] = useState('')
  const [allJobs, setAllJobs] = useState([])
  const [popUpJobInfo, setPopupJobInfo] = useState(false)
  const [allClients, setAllClients] = useState([])
  const [allPlaces, setAllPlaces] = useState([])


  useEffect(() => {
    AllJobs()
    chargeClients()
    chargePlaces()
  }, [])


  
  const chargeClients = async () => {
    try{
        await fetch('http://localhost:3333/clients/allClients', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            }).then(response => response.json())
            .then(data => setAllClients(data.array))
    }catch (err) {
        alert(err);
        }
  }

  const chargePlaces = async () => {
    try{
      await fetch('http://localhost:3333/places/allPlaces', {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem("jwt")
        },
        }).then(response => response.json())
        .then(data => setAllPlaces(data.array))
    }catch (err) {
      alert(err);
    }
  }

  const AllJobs = async () => {
    try{
      await fetch('http://localhost:3333/jobs/allJobs', {
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
      <h1>Elegir Trabajo:</h1>
      <br />
      <SelectJob setOption={setOption} setPopupJobInfo={setPopupJobInfo} array={allJobs}/>
      <br />
      <br />
      { option !== '' &&
      <Link to={`/Job/${option}`}><button>Enter</button></Link>}
      { option !== '' && popUpJobInfo && 
        <InfoDiv 
          popUpJobInfo={popUpJobInfo}
          allJobs={allJobs} 
          option={option}
          allPlaces={allPlaces}
          allClients={allClients}
          setJob={props.setJob}
        />}
    </main>
  )
}

const InfoDiv = (props) => {
  const array = props.allJobs
  const clients = props.allClients
  const places = props.allPlaces

  const job = array.find((job) => job.id === props.option)
  const client = clients.find((client) => client.id === job.cliente_id)
  const place = places.find((place) => place.id === job.planta_id)

  props.setJob(job)

  
  return(
    <div className="info-job">
      <br />
      <span>Cliente: {client.nombre_fantasia}</span>
      <br />
      <span>Planta: {place.nombre_fantasia}</span>
      <br />
      <span>Tipo de Trabajo: {job.tipo_de_trabajo}</span>
      <br />
      <span>Fecha de Inicio: {job.fecha_de_inicio}</span>
      <br />
    </div>
  )
}

const OptionJob = (props) => {
  return (
    <option value={props.jobId}> {props.jobName} </option>
  )
}

const SelectJob = (props) => {
  const array = props.array
  
  return (
    <select onChange={(e) => {
      props.setOption(e.target.value)
      props.setPopupJobInfo(true)
      }}>
      <option value=''> Trabajo: </option>
      { array.map((option, key) => {
        return ( <OptionJob
          key={key}
          jobId={option.id} 
          jobName={option.tipo_de_trabajo + ' ' + option.id}
          />
        )
      })}
    </select>

  )
}

export default ChooseJob;
