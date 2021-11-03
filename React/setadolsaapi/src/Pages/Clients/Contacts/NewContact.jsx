import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const NewContact = () => {
    const [name, setName] = useState('')
    const [planta_id, setPlanta_id] = useState()
    const [cliente_id, setCliente_id] = useState()
    const [mail, setMail] = useState('')
    const [cel, setCel] = useState('')
    const [tel, setTel] = useState()
    const [rol, setRol] = useState('')
    
    const [workPlace, setWorkPlace] = useState('')
    const [allClients, setAllClients] = useState([])
    const [allPlaces, setAllPlaces] = useState([])


    useEffect(() => {
        chargeClients()
        chargePlaces()
    }, [])


    const chargeClients = () => {
        fetch('http://localhost:3333/clients/allClients', {
          method: "GET",
          headers: {
              "Content-Type" : "application/json",
              "auth-token" : localStorage.getItem("jwt")
          },
          }).then(response => response.json())
          .then(data => setAllClients(data.array))
    }
    
    const chargePlaces = () => {
        fetch('http://localhost:3333/places/allPlaces', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            }).then(response => response.json())
            .then(data => setAllPlaces(data.array))
    }

    const postNewContact = () => {
        const newContact = {
          name,
          planta_id,
          cliente_id,
          mail,
          cel,
          tel,
          rol
        }
      
        fetch('http://localhost:3333/contacts/newContact',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            body: JSON.stringify(newContact)
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
    
    const OptionRender = (props) => {
            return (
                <option value={props.id}>
                    {props.nombre_fantasia}
                </option>
            )
    }
    
    const RenderPLacesOrClients = (props) => {
        const array = props.array
        console.log(array)
           return( 
                <select onChange={(e) => {
                    if (workPlace === 'planta'){setPlanta_id(e.target.value)}
                    if (workPlace === 'cliente'){setCliente_id(e.target.value)}
                }}>
                    <option disabled selected>{`Seleccionar ${props.selections}:`}</option>
                    { array.map((option) => {
                        return ( <OptionRender 
                            nombre_fantasia={option.nombre_fantasia}
                            nombre_fantasia_planta={option.nombre_fantasia_planta}
                            id={option.id}
                            />
                        )
                    })}
                </select>)
    }

    return (
        <main>
            <br />
            <br />
            <h1>Nuevo Contacto</h1>
            <br />
            <br />
            <form method = 'POST' id='form-NewClient' action="javascript:void(0);">
                <span>Nombre y Apellido*:</span>
                <input type="text" placeholder="Nombre y Apellido" onChange={(e) => setName(e.target.value) }/>
                <span>Lugar de Trabajo*:</span>
                <br />
                <select onChange={(e) => setWorkPlace(e.target.value) }>
                    <option selected disabled >Lugar de Trabajo</option>
                    <option value="">No Especificado</option>
                    <option value="planta">Planta</option>
                    <option value="cliente">Cliente</option>
                </select>
                <br />
                {(workPlace === 'planta') &&
                    <RenderPLacesOrClients array={allPlaces} selections={workPlace} />}
                {(workPlace === 'cliente') &&
                    <RenderPLacesOrClients array={allClients} selections={workPlace}/>}
                <br />  
                <span>Mail*:</span>
                <input type="text" placeholder="Mail" onChange={(e) => setMail(e.target.value) }/>
                <span>Tel:</span>
                <input type="text" placeholder="Tel" onChange={(e) => setTel(e.target.value) }/>
                <span>Cel*:</span>
                <input type="text" placeholder="Cel" onChange={(e) => setCel(e.target.value) }/>
                <span>Rol:*</span>
                <input type="text" placeholder="Rol" onChange={(e) => setRol(e.target.value)}/>
                <br/>
                <br/>
                <input type="submit" id="submit-form" value="Agregar" onClick={() => postNewContact() }/>
                <br />
                <span>*  Obligatorios</span>
                <br />
            </form>
        </main>
    )


}

export default NewContact;