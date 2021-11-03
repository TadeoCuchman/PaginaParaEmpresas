import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const NewPlace = () => {
  const [openPopupSilosInfo, setPopupSilosInfo] = useState(false)
  const [cantidadDeSilos, setCantidadDeSilos] = useState('')



  const SilosPopup = () => {
    
    const RenderSilos = () => {
    let menuItems = [];
    for (var i = 0; i < cantidadDeSilos; i++) {
        menuItems.push(
          <div className="siloInfo"> 
            <span>Número de Silo:</span>
            <input type="text" />
            <span>Tipo de Silo:</span>
            <select>
              <option selected defaultValue disabled>Tipo de Silo</option>
              <option value="Silo Bolsa">Silo Bolsa</option>
              <option value="">etc</option>
            </select>
            <br />
            <span>Toneladas:</span>
            <input type="text" />
         </div>);
    }
    return(menuItems)

    }
    
    return (
      <div className="silosInfo"> 
            <button onClick={() => setPopupSilosInfo(false)}>X</button>
            <RenderSilos/>
            <input type="submit" onClick={() => setPopupSilosInfo(false)} value="Agregar  Info"/>
            
      </div>

    )
  }
  




  return (
    <main>
      <br />
      <br />
      <h1>Nueva Planta</h1>
      <br />
      <br />
      <form method = 'POST' id='form-NewClient' action="javascript:void(0);">
        <span>Empresa:</span>
        <input type="text" placeholder="Empresa"/>
        <span>Localidad:</span>
        <input type="text" placeholder="Localidad"/>
        <span>Coordenadas:</span>
        <input type="text" placeholder="Coordenadas"/>
        <span>Padrón:</span>
        <input type="text" placeholder="Padrón"/>
        <span> Plano:</span>
        <input type="text" placeholder="Plano"/>
        <span>Gerente:</span>
        <input type="text" placeholder="Gerente"/>
        <span>Cantidad de Silos:</span>
        <input type="text" placeholder="Cantidad de Silos" onChange={(e) => setCantidadDeSilos(e.target.value)}/> 
        <button onClick={() => setPopupSilosInfo(true)}>Agregar info</button>
        { openPopupSilosInfo && 
          <div className="siloInfo_div">
            <SilosPopup/>
          </div>
        }

        <br/>
        <br />
        <input type="submit" value="Ingresar" />
      </form>
    </main>
  )


}

export default NewPlace;