import React from 'react';
import { useState, useEffect} from 'react'
import { Link } from "react-router-dom";

const Users = () => {
    const [allUsers, setAllUsers] = useState([])
    const [editUserPopup, setEditUserPopUp] = useState(false)
    const [selected, setSelected] = useState(-1)
    
 
    useEffect(() => {
        chargeUsers()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
      };


    const chargeUsers = async () => {
        try{
            await fetch('http://localhost:3333/users/allUsers', {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "auth-token" : localStorage.getItem("jwt")
                },
                }).then(response => response.json())
                .then(data => setAllUsers(data.array))
        }catch (err) {
            alert('No conexión con Servidor')
        }
    }


    const User = (props) => {
        return (
            <li className="user" onClick={() => props.setSelected(props.id)}>
                <h4>Nombre: {props.name}</h4>
                <br />
                <span>Mail: {props.mail}</span>
                <br />
                <span>Rol: {props.rol}</span>
                <br />
                {props.selected && 
                <button onClick={() => setEditUserPopUp(true)}>Editar</button>}
            </li>
        )
    }

    const EditPopUp = () => {
        const result = allUsers.find(user => user.id === selected)

        const [name, setName] = useState('' || result.name)
        const [mail, setMail] = useState('' || result.mail)
        const [rol, setRol] = useState('' || result.rol) 

        const modifyUser = async (a) => {
            const modifyBody = {
                name,
                mail,
                rol
            }
            try {
            await fetch(`http://localhost:3333/users/${a}`, {
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
                    chargeUsers()
                    setEditUserPopUp(false)
                })
            } catch (err) {
                alert('Falló el Servidor')
            }
        }
        
        return (
            <div id="editUserPopUpDiv">
                <button id="cerrarInfo" onClick={() => setEditUserPopUp(false)}>X</button>
                <br />
                <form action="PUT" onSubmit={handleSubmit}>
                    <span>Nombre:</span>
                    <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <br />
                    <span>Mail:</span>
                    <br />
                    <input type="text" value={mail} onChange={(e) => setMail(e.target.value)}/>
                    <br />
                    <span>Rol:</span>
                    <br />
                    <select onChange={(e) => setRol(e.target.value)}>
                        <option selected disabled value="" >Elegir Rol</option>
                        <option value="operario">Operario</option>
                        <option value="administrativo">Administrativo</option>
                        <option value="admin">Admin</option>
                    </select>
                    <br />
                    <br />
                    <input type="submit" id="submit" onClick = { () =>  modifyUser(selected)} /> 
                </form>
            </div>
        )
    }
    
    const ListOfUsers = (props) => {
        const users =  props.users
        
        if (users){
            return(
                <ul id='users'>
                    { users.map(((user, key)=> {
                        return ( <User
                            id={user.id}
                            key={key}
                            name={user.name}
                            mail={user.mail}
                            rol={user.rol}
                            selected={user.id === selected}
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
            <h1>Lista de Usuarios:</h1>
            <ListOfUsers users={allUsers} />
            { editUserPopup && 
                <EditPopUp selected={selected}/>}
        </main>
    )
}

export default Users;