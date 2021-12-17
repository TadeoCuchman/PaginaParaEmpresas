import React from 'react';
import { useState } from 'react'

const Login = (props) => {
    const [userName, changeUser] = useState('')
    const [password, changePassword] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault();
      };

    const newLogin = () => {
        try{
            fetch("http://localhost:3333/users/login", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: userName, 
                    password: password
                })
            }).then(function(respuesta) {
                return respuesta.json();
            }).then(function (res) {
                if (res.error) {
                    alert (res.error);
                } else {
                    alert (res.message);
                    localStorage.setItem('jwt', res.token);
                    localStorage.setItem('alias', res.user.name)
                    localStorage.setItem('rol', res.user.rol)
                    props.setToken(res.token)
                    props.setRol(res.user.rol)
                    props.setOpenLogin(false)
                }   
            })
        } catch (err) {
            alert('Error con conexión al servidor.')
        }
    }

    return (
        <form method="POST" className="forms" onSubmit={handleSubmit}>
            <button className="closeAddPopup" onClick={() => props.setOpenLogin(false)}>X</button>
            <p>Usuario:</p>
            <input className="logs" id="user" type="text" name="user" placeholder="Nombre de Usuario" onChange={(e) => changeUser(e.target.value)} />
            <p>Password:</p>
            <input className="logs" id="password" type="password" name="password" placeholder="Contraseña" onChange={(e) => changePassword(e.target.value)} />
            <br />
            <button className="logss" type="sumbit" id="login" onClick={ newLogin }>Login!</button>
        </form>
    )
}

export default Login;




