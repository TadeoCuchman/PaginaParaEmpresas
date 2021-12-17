import React from 'react';
import { useState } from 'react'
import Login from '../Components/Login'

const Main = (props) => {
  const [openLogin, setOpenLogin] = useState(false)
  return (
    <main>
        <br />
        <br />
        <h1 id='titulo'>Cuchman Servicios Agro Industriales</h1>
        <br />
        {(openLogin === false) && (!props.token) &&
        <button id="login" onClick={() => setOpenLogin(true)}>Login</button>}
        {(openLogin === true) &&
          <div id="loginPopup">
            <Login setOpenLogin={setOpenLogin} setToken={props.setToken} setRol={props.setRol}/>
          </div>
        }
        <br />
        <br />
        <h2>Novedades</h2>
        <div id="novedades"></div>
        <br />
    </main>
  )
}

export default Main;

