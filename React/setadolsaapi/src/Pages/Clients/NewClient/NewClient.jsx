import React from 'react';
import { useState } from 'react'
import { Link } from "react-router-dom";

const NewClient = () => {
  const [razon_social, setRazon_Social] = useState('')
  const [nombre_fantasia, setNombre_Fantasia] = useState('')
  const [rut, setRut] = useState('')

  const postNewClient = () => {
    const newClient = {
      razon_social,
      nombre_fantasia,
      rut
    }
  
    fetch('http://localhost:3333/clients/newClient',{
      method: "POST",
      headers:{
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("jwt")
      },
      body: JSON.stringify(newClient)
      }).then(function(respuesta) {
        return respuesta.json()
      }).then(function (res) {
        if (res.success === false) {
            alert (res.message);
        } else {
            alert (res.message);                 
        }
      })
    }


  
  return (
    <main>
      <br />
      <br />
      <h1>Nuevo Cliente</h1>
      <br />
      <br />
      <form method = 'POST' id='form-NewClient' action="javascript:void(0);">
        <span>Razón Social:</span>
        <input type="text" placeholder="Razón Social" onChange={(e) => setRazon_Social(e.target.value)}/>
        <span>Nombre Fantasia:</span>
        <input type="text" placeholder="Nombre Fantasia" onChange={(e) => setNombre_Fantasia(e.target.value)}/>
        <span>RUT:</span>
        <input type="text" placeholder="RUT" onChange={(e) => setRut(e.target.value)}/>
        <br/>
        <br/>
        <input type="submit" id="submit-form" value="Agregar" onClick={() => postNewClient() }/>
        <br />
      </form>
    </main>
    )
}

export default NewClient;
