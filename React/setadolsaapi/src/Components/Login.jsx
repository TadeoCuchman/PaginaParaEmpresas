import React from 'react';
import { useState } from 'react'

const Login = (props) => {
    const [userName, changeUser] = useState('')
    const [password, changePassword] = useState('')


    const newLogin = () => {

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
                localStorage.setItem('alias', JSON.stringify(res.user.name))
                props.setToken(localStorage.jwt)
                props.setOpenLogin(false)
            }   
        })
    }

    return (
        <form method="POST" action="javascript:void(0);" className="forms">
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




