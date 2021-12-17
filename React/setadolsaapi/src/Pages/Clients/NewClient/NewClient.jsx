import React from 'react';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const NewClient = () => {
  const [razon_social, setRazon_Social] = useState('')
  const [nombre_fantasia, setNombre_Fantasia] = useState('')
  const [rut, setRut] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
  };


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
            setRazon_Social('');
            setNombre_Fantasia('');
            setRut('');           
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
      <form method = 'POST' id='form-NewClient' onSubmit={handleSubmit}>
        <span>Razón Social:</span>
        <input type="text" placeholder="Razón Social" value={razon_social} onChange={(e) => setRazon_Social(e.target.value)}/>
        <span>Nombre Fantasia:</span>
        <input type="text" placeholder="Nombre Fantasia" value={nombre_fantasia} onChange={(e) => setNombre_Fantasia(e.target.value)}/>
        <span>RUT:</span>
        <input type="text" placeholder="RUT" value={rut} onChange={(e) => setRut(e.target.value)}/>
        <br/>
        <input type="submit" id="submit-form" value="Agregar" onClick={() => postNewClient() }/> 
        <br />
      </form>
    </main>
    )
}

export default NewClient;
