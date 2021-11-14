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

    const handleSubmit = (event) => {
        event.preventDefault();
      };
    

    useEffect(() => {
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

    const postNewContact = async () => {
        try{
            const newContact = {
                name,
                planta_id,
                cliente_id,
                mail,
                cel,
                tel,
                rol
            }
      
        await fetch('http://localhost:3333/contacts/newContact',{
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
        } catch (err) {
            alert(err);
        }
    }
    
   
    return (
        <main>
            <br />
            <br />
            <h1>Nuevo Contacto</h1>
            <br />
            <br />
            <form method = 'POST' id='form-NewClient' onSubmit={handleSubmit}>
                <span>Nombre y Apellido*:</span>
                <input type="text" placeholder="Nombre y Apellido" onChange={(e) => setName(e.target.value) }/>
                <span>Lugar de Trabajo*:</span>
                <br />
                <select onChange={(e) => setWorkPlace(e.target.value) }>
                    <option value="" >Lugar de Trabajo</option>
                    <option value="">No Especificado</option>
                    <option value="Planta">Planta</option>
                    <option value="Cliente">Cliente</option>
                </select>
                <br />
                    { workPlace &&
                    <RenderPLacesOrClients 
                        array={(workPlace === "Cliente") ? allClients : allPlaces} 
                        setCliente_id={setCliente_id}
                        setPlanta_id={setPlanta_id}
                        workPlace={workPlace}
                    />}
                <br />  
                <span>Mail*:</span>
                <input type="mail" placeholder="Mail" onChange={(e) => setMail(e.target.value) }/>
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

const OptionRender = (props) => {
        return (
            <option value={`${props.id}`}> {props.nombre_fantasia} </option>
        )
}

const RenderPLacesOrClients = (props) => {
    const array = props.array
 
    return( 
        <select onChange={(e) => { 
            if (props.workPlace === 'Cliente') {
                props.setPlanta_id()
                props.setCliente_id(`${e.target.value}`)
            } else if (props.workPlace === 'Planta'){ 
                props.setCliente_id()
                props.setPlanta_id(`${e.target.value}`)
            } }}>
            <option  value=''>{`Seleccionar ${props.workPlace}:`}</option>
            { array.map((option, key) => {
                return ( <OptionRender 
                    nombre_fantasia={option.nombre_fantasia}
                    id={option.id}
                    key={key}
                    />
                )
            })
            }
        </select>)
}



export default NewContact;