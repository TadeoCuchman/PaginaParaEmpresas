import React from 'react';
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ListOfExpences from '../../../Components/ListOfExpences';

import { ReactComponent as NewTaskIcon} from '../../../Icons/NewTask.svg'
import { ReactComponent as ExitIcon } from '../../../Icons/Exit.svg'
  
const Fumi = () => {
  const [addPopup, setAddPopup] = useState('')
  const { id } = useParams('')

  return (
    <main id="main_Fumi">
      <h1>Fumigación: {id}.</h1>
      <br />
      <div className="info">
        <ListOfExpences/>
      </div>
      
      < div className="addButtons">
        <br /><br /><br />
        <span>Insumo</span>
        <br />
        <button onClick={() => setAddPopup('insumo')}><NewTaskIcon/></button>
        <br />
        <br />
        <span>Alimentación</span>
        <br />
        <button onClick={() => setAddPopup('alimentacion')}><NewTaskIcon/></button>
        <br />
        <br />
        <span>Transporte</span>
        <br />
        <button onClick={() => setAddPopup('transporte')}><NewTaskIcon/></button>
        <br />
        <br />
        <span>Hospedaje</span>
        <br />
        <button onClick={() => setAddPopup('hospedaje')}><NewTaskIcon/></button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <span>Entregar</span>
        <br />
        <button><ExitIcon/></button>
        <br />
        <br />
        <br />
      </div>
      <br />
      { (addPopup !== '') && 
      <AddPopup addPopup={addPopup} setAddPopup={setAddPopup}/>}


    </main>
    )
}


const AddPopup = (props) => {
  const [tipo, setTipo] =useState('')
  const [insumo, setInsumo] =useState('')
  const [costo, setCosto] =useState('')
  const [cantidad, setCantidad] =useState('')
  const [no_factura, setNo_factura] =useState('')
  const [rut, setRut] =useState('')
  const [proveedor, setProveedor] =useState('')
  const [no_de_receta, setNo_de_receta] =useState('')
  const [descripción, setDescripción] =useState('')
  const [noches, setNoches] =useState('')
  const [fecha_entrada, setFecha_entrada] =useState('')

  const posting = () => {
    const postBody = {
        tipo,
        insumo,
        costo,
        cantidad,
        no_factura,
        rut,
        proveedor,
        no_de_receta,
        descripción,
        noches,
        fecha_entrada 
    }
  
    fetch('http://localhost:4000/feed', {
          method: "POST",
          headers: {
                 "Content-Type" : "application/json",
                 "auth-token" : localStorage.getItem("jwt")
          },
          body: JSON.stringify(postBody)
    }).then(function(respuesta) {
        return respuesta.json()
    }).then(function(res) {
        if (!res.succes) {
            alert (res.message);
        }
    }).then(() => { 
        props.cargarPosts() 
        props.setMostrar(false)
    })
  }

  const Render = (props) => {
    if (props.addPopup === 'insumo') {
      return (
        <>
          <h1>Agregar Insumo:</h1>
          <br />
          <span>Insumo:</span>  
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Costo:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Cantidad:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>No.Factura:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>RUT:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Proveedor:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>No. de Receta:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Descripción:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <br />
          <button onClick={() => posting()}>Agregar</button>
        </> )
    } else if (props.addPopup === 'alimentacion') {
      return (
        <>
          <h1>Agregar a Alimentación:</h1>
          <br />  
          <span>Cantidad:</span>  
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Costo:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>No.Factura:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>RUT:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Proveedor:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Descripción:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <br />
          <button onClick={() => posting()}>Agregar</button>
        </> )
    } else if (props.addPopup === 'transporte') {
      return (
        <>
          <h1>Agregar a Transporte:</h1>
          <br />
          <span>Descripción:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Costo:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Cantidad (Litros):</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>No.Factura:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>RUT:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Proveedor:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <br />
          <button onClick={() => posting()}>Agregar</button>
        </> )
    } else if (props.addPopup === 'hospedaje') {
      return (
        <>
          <h1>Agregar a Hospedaje:</h1>
          <br />
          <span>Proveedor:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Costo:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Noches:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>No.Factura:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>RUT:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Entrada:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <span>Descripción:</span>
          <br />
          <input type="text" placeholder="" />
          <br />
          <button onClick={() => posting()}>Agregar</button>
        </> )
    } else { return ('')}
  }
  

  return (
      <div className="popUp_div"> 
        <form method='POST' >
          <button className="closeAddPopup" onClick={() => props.setAddPopup('')}>X</button>
          <Render addPopup={props.addPopup}/>
        </form>
      </div>
)
  
  

}


export default Fumi;
