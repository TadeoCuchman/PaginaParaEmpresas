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


    const chargeUsers = () => {
        fetch('http://localhost:3333/users/allUsers', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            }).then(response => response.json())
            .then(data => setAllUsers(data.array))
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
        const [name, setName] = useState('' || allUsers[selected].name)
        const [mail, setMail] = useState('' || allUsers[selected].mail)
        const [rol, setRol] = useState('' || allUsers[selected].rol) 

        const modifyUser = (a) => {
            const modifyBody = {
                name,
                mail,
                rol
            }
            
            fetch(`http://localhost:3333/users/${a}`, {
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
        }
        
        return (
            <div id="editUserPopUpDiv">
                <button onClick={() => setEditUserPopUp(false)}>X</button>
                <br />
                <form action="PUT" action="javascript:void(0);">
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
                    <input type="text" value={rol} onChange={(e) => setRol(e.target.value)}/>
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
                <div id='users'>
                    { users.map((user => {
                        return ( <User
                            name={user.name}
                            mail={user.mail}
                            rol={user.rol}
                            id={user.id}
                            selected={user.id === selected}
                            setSelected={setSelected}
                            />)
                    }))}
                </div>
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