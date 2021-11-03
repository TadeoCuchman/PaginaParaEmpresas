import React from 'react';
import { useState } from 'react'
import { Link } from "react-router-dom";
import Login from '../Components/Login'

const Main = (props) => {
  const [openLogin, setOpenLogin] = useState(false)
  return (
    <main>
        <br />
        <br />
        <h1>Cuchman Servicios AgroIndustriales</h1>
        <br />
        {(openLogin === false) && (!props.token) &&
        <button id="login" onClick={() => setOpenLogin(true)}>Login</button>}
        {(openLogin === true) &&
          <div id="loginPopup">
            <Login setOpenLogin={setOpenLogin} setToken={props.setToken} />
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

