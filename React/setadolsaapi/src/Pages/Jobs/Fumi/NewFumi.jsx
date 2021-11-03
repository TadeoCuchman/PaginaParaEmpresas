import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const NewFumi = () => {
    const [openPopUpInstalationes, setPopUpInstalaciones] = useState(false)
    const [cantidadDeSilos, setCantidadDeSilos] = useState('3')
    
    const SilosPopup = () => {
      // cantidad e informacion de silos buscada a la bd 
      const RenderSilos = () => {
      let menuItems = [];
      for (var i = 0; i < cantidadDeSilos; i++) {
          menuItems.push(
            <div className="siloInfo"> 
              <span> Silo Número:</span>
              <input type="text" />
              <span>Cantidad de Substrato:</span>
              <input type="text" />
              <br />
              <span>Toneladas:</span>
              <input type="text" />
           </div>);
      }
      return(menuItems)
  
      }
      
      return (
        <div className="silosInfo"> 
              <button onClick={() => setPopUpInstalaciones(false)}>X</button>
              <RenderSilos/>
              <input type="submit" onClick={() => setPopUpInstalaciones(false)} value="Agregar  Info"/>
              
        </div>
  
      )
    }
    return (
      <main>
        <br />
        <h1>Nueva Fumigación:</h1>
        <br />
        <form method = 'POST' id='form-NewFumi' action="javascript:void(0);">
          <span>Cliente:</span>
          <input type="text" placeholder="Cliente"/>
          <span>Lugar:</span>
          <select>
            <option>Plantas de Silos:</option>
          </select>
          <br />
          <span>Fecha de Inicio:</span>
          <input type="date" />
          <br />
          <span>Servicio</span>
          <select>
            <option>Servicios</option>
          </select>
          <br />
          <span>Instalaciones:</span>
          <button onClick={() => setPopUpInstalaciones(true)}>Ingresar Instalaciones a Usar</button>
          {openPopUpInstalationes && <SilosPopup/>}
          <br />
          <br />
          <input type="submit" value="Ingresar" />
        </form>
      </main>
    )
}

export default NewFumi;
