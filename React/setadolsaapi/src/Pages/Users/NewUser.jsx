import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const NewUser = () => {
    const [user, setUser] = useState('')
    const [mail, setMail] = useState('')
    const [rol, setRol] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
      };
    
    const postNewUser = async () => {
        try {
            const newUser = {
            name: user,
            mail: mail,
            rol: rol,
            password: password,
            salt: ''
            }
        
            await fetch('http://localhost:3333/users/register',{
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
                    setUser('');
                    setPassword(''); 
                    setMail('');  
                    setRol('');              
                }
                })
        } catch (err) {
            alert ('No conexión con servidor')
        }
    }

    return (
        <main>
            <br />
            <h1>Registrar Nuevo Usuario:</h1>
            <br />
            <form method="POST" className="forms" onSubmit={handleSubmit}>
                <p>Email*:</p>
                <input className="logs" id="rmail" type="email" name="rmail" placeholder="Ingresar Mail" value={mail} onChange={(e) => setMail(e.target.value)}/>
                <p>Nombre de Usuario*:</p>
                <input className="logs" id="rname" type="text" name="rname" placeholder="Ingresar Usuario"  value={user} onChange={(e) => setUser(e.target.value)}/>
                <p>Contraseña*:</p>
                <input className="logs" id="rpassword" type="password" name="rpassword" placeholder="Ingresar Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
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