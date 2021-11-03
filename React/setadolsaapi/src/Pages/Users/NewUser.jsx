import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const NewUser = () => {
    const [user, setUser] = useState('')
    const [mail, setMail] = useState('')
    const [rol, setRol] = useState('')
    const [password, setPassword] = useState('')

    
    const postNewUser = () => {
        const newUser = {
            name: user,
            mail: mail,
            rol: rol,
            password: password,
            salt: ''
        }
      
        fetch('http://localhost:3333/users/register',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            body: JSON.stringify(newUser)
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
            <h1>Register</h1>
            <br />
            <form method="POST" action="javascript:void(0);" className="forms">
                <p>Email*:</p>
                <input className="logs" id="rmail" type="email" name="rmail" placeholder="Ingresar Mail"  onChange={(e) => setMail(e.target.value)}/>
                <p>Nombre de Usuario*:</p>
                <input className="logs" id="rname" type="text" name="rname" placeholder="Ingresar Usuario"  onChange={(e) => setUser(e.target.value)}/>
                <p>Contraseña*:</p>
                <input className="logs" id="rpassword" type="password" name="rpassword" placeholder="Ingresar Contraseña"  onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <span>Rol*:</span>
                <br />
                <select onChange={(e) => setRol(e.target.value)}>
                    <option selected disabled >Elegir Rol</option>
                    <option value="operario">Operario</option>
                    <option value="administrativo">Administrativo</option>
                    <option value="admin">Admin</option>
                </select>
                <br />
                <br />  
                <button className="logss" type="sumbit" id="register" onClick={ () =>  postNewUser()  } >Registrar Usuario</button>
                <br />
                <br />
                <span>* Obligatorios</span>
            </form>
        </main>
    )
}

export default NewUser;