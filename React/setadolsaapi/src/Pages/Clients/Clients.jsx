import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Clients = () => {
  const [allClients, setAllClients] = useState([])
  const [editUserPopup, setEditUserPopUp] = useState(false)
  const [selected, setSelected] = useState(-1)

   
  useEffect(() => {
    chargeClients()
}, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  };
    
  const chargeClients = async () => {
    try {
      await fetch('http://localhost:3333/clients/allClients', {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem("jwt")
        },
        }).then(response => response.json())
        .then(data => setAllClients(data.array))
    }catch (err) {
      alert('No conexión con Servidor')
    }
  }
    
  const Client = (props) => {
    return (
      <li className="client" onClick={() => props.setSelected(props.id)}>
        <span>Razón Social: {props.razon_social}</span>
        <br />
        <span>Nombre Fantasia: {props.nombre_fantasia}</span>
        <br />
        <span>Rut: {props.rut}</span>
        <br />
        {props.selected && 
          <button onClick={() => setEditUserPopUp(true)}>Editar</button>}
      </li>
    )
  }

const EditPopUp = () => {
  const result = allClients.find(client => client.id === selected)


  const [razon_social, setRazon_Social] = useState('' || result.razon_social)
  const [nombre_fantasia, setNombre_Fantasia] = useState('' || result.nombre_fantasia)
  const [rut, setRut] = useState('' || result.rut) 

  const modifyUser = async (a) => {
      const modifyBody = {
          razon_social,
          nombre_fantasia,
          rut
      }
      try {
      await fetch(`http://localhost:3333/clients/${a}`, {
              method: 'PUT',
              headers: {
                  "Content-Type" : "application/json",
                  "auth-token" : localStorage.getItem("jwt")
              },body: JSON.stringify(modifyBody)
          }).then((respuesta) => {
              return respuesta.json()
          }).then(function (res) {
              if (!res.succes) {
                  alert (res.message);
              }
          }).then(() => { 
              chargeClients()
              setEditUserPopUp(false)
          })
      } catch (err) {
          alert('Falló el Servidor')
      }
  }

  return (
    <div id="editUserPopUpDiv">
        <button onClick={() => setEditUserPopUp(false)}>X</button>
        <br />
        <form action="PUT" onSubmit={handleSubmit}>
            <span>Razón Social:</span>
            <br />
            <input type="text" value={razon_social} onChange={(e) => setRazon_Social(e.target.value)}/>
            <br />
            <span>Nombre Fantasia:</span>
            <br />
            <input type="text" value={nombre_fantasia} onChange={(e) => setNombre_Fantasia(e.target.value)}/>
            <br />
            <span>Rut:</span>
            <br />
            <input type="text" value={rut} onChange={(e) => setRut(e.target.value)}/>
            <br />
            <br />
            <br />
            <input type="submit" id="submit" onClick = { () =>  modifyUser(selected)} /> 
        </form>
    </div>
)
}

  const ListaOfClients = (props) => {
    const clients = props.clients
    if (clients){
      return( 
        <ul id='clients'>
          { clients.map(((client, key) => {
          return ( <Client
              id={client.id}
              key={key}
              nombre_fantasia={client.nombre_fantasia}
              rut={client.rut}
              razon_social={client.razon_social}                            
              selected={client.id === selected}
              setSelected={setSelected}
              />)
          }))}
        </ul>
      )
    } else { return[] }
  }

  return (
      <main>
          <br />
          <h1>Lista de Clientes:</h1>
          <br />
          <ListaOfClients clients={allClients}/>
          { editUserPopup && 
            <EditPopUp selected={selected}/>}

      </main>
  )

}


export default Clients;