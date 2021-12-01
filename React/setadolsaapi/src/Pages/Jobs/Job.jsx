import React from 'react';
import { useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'
import ListOfExpences from '../../Components/ListOfExpences';

import { ReactComponent as NewTaskIcon} from '../../Icons/NewTask.svg'
import { ReactComponent as ExitIcon } from '../../Icons/Exit.svg'
  
const Job = (props) => {
  const [addPopup, setAddPopup] = useState('')
  const { id } = useParams('')
  const [insumo, setInsumo] = useState('')
  const [costo, setCosto] = useState('')
  const [moneda, setMoneda] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [no_factura, setNo_factura] = useState('')
  const [rut, setRut] = useState('')
  const [proveedor, setProveedor] = useState('')
  const [no_de_receta, setNo_de_receta] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [noches, setNoches] = useState('')
  const [fecha_entrada, setFecha_entrada] = useState('')
  
  const [allExpences, setAllExpences] = useState([])
  
  console.log(props.job)

  useEffect(() => {
    chargeExpences()
  }, [])

  //obtener objeto del trabajo desde la pagina anterior 


  const posting = async () => {
    try {
        const postBody = {
          trabajo_id: id,
          tipo: addPopup,
          insumo,
          costo,
          moneda,
          cantidad,
          no_factura,
          rut,
          proveedor,
          no_de_receta,
          descripcion,
          noches,
          fecha_entrada 
      }
    
      fetch('http://localhost:4000/jobs/addToJob', {
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
          }else{ 
            alert (res.message)
            setAddPopup('')
            setInsumo('')
            setCosto('')
            setMoneda('')
            setCantidad('')
            setNo_factura('')
            setRut('')
            setProveedor('')
            setNo_de_receta('')
            setDescripcion('')
            setNoches('')
            setFecha_entrada('')
          }
      }).then(() => { 
      })
    } catch (err) {
      alert('No conexión con servidor.')
    }
  }

  const chargeExpences = async () => {
    try{
      await fetch(`http://localhost:3333/jobs/allExpences/${id}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem("jwt")
        },
        }).then(response => response.json())
        .then(data => setAllExpences(data.array))
    }catch (err) {
      alert(err);
    }
  }

 function resetStates (type) {
  setAddPopup(type)
  setInsumo('')
  setCosto('')
  setMoneda('')
  setCantidad('')
  setNo_factura('')
  setRut('')
  setProveedor('')
  setNo_de_receta('')
  setDescripcion('')
  setNoches('')
  setFecha_entrada('')
 }

  return (
    <main id="main_Fumi">
      <h1>{props.job.tipo}: {id}.</h1>
      <br />
      <div className="info">
        <ListOfExpences array={allExpences}/>
      </div>
      
      < div className="addButtons">
        <br /><br /><br />
        <span>Insumo</span>
        <br />
        <button onClick={() => {
          resetStates('Insumo')
        }}><NewTaskIcon/></button>
        <br />
        <br />
        <span>Alimentación</span>
        <br />
        <button onClick={() => {
          resetStates('Alimentación')
        }}><NewTaskIcon/></button>
        <br />
        <br />
        <span>Transporte</span>
        <br />
        <button onClick={() => {
          resetStates('Transporte')
        }}><NewTaskIcon/></button>
        <br />
        <br />
        <span>Hospedaje</span>
        <br />
        <button onClick={() => {
          resetStates('Hospedaje')
        }}><NewTaskIcon/></button>
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
      <AddPopup 
        id={id}
        posting={posting}
        addPopup={addPopup}
        setAddPopup={setAddPopup}
        insumo={insumo}
        setInsumo={setInsumo}
        costo={costo}
        setCosto={setCosto}
        moneda={moneda}
        setMoneda={setMoneda}
        cantidad= {cantidad}
        setCantidad= {setCantidad}
        no_factura= {no_factura}
        setNo_factura= {setNo_factura}
        rut={rut}
        setRut= {setRut}
        proveedor= {proveedor}
        setProveedor= {setProveedor}
        no_de_receta= {no_de_receta}
        setNo_de_receta= {setNo_de_receta}
        descripcion= {descripcion}
        setDescripcion= {setDescripcion}
        noches= {noches}
        setNoches= {setNoches}
        fecha_entrada= {fecha_entrada}
        setFecha_entrada = {setFecha_entrada}
      />}
    </main>
    )
}


const Moneda = (props) => {
  return(
    <select value='$' onChange={(e) => props.setMoneda(e.target.value)}>
      <option value="$"> Pesos </option>
      <option value="USD$"> USD </option>
    </select>
  )
}

const Render = (props) => {

  if (props.addPopup === 'Insumo') {
    return (
      <>
        <h1>Agregar Insumo:</h1>
        <br />
        <span>Insumo:</span>  
        <br />
        <input type="text" placeholder="" value={props.insumo} onChange={(e) => props.setInsumo(e.target.value)}/>
        <br />
        <span>Costo:</span>
        <br />
        <input type="text" placeholder="" value={props.costo} onChange={(e) => props.setCosto(e.target.value)}/>
        <br />
        <span>Moneda:</span>
        <br />
        <Moneda setMoneda={props.setMoneda}/>
        <br />
        <br />
        <span>Cantidad:</span>
        <br />
        <input type="text" placeholder="" value={props.cantidad} onChange={(e) => props.setCantidad(e.target.value)}/>
        <br />
        <span>No.Factura:</span>
        <br />
        <input type="text" placeholder="" value={props.no_factura} onChange={(e) => props.setNo_factura(e.target.value)}/>
        <br />
        <span>RUT:</span>
        <br />
        <input type="text" placeholder="" value={props.rut} onChange={(e) => props.setRut(e.target.value)}/>
        <br />
        <span>Proveedor:</span>
        <br />
        <input type="text" placeholder="" value={props.proveedor} onChange={(e) => props.setProveedor(e.target.value)}/>
        <br />
        <span>No. de Receta:</span>
        <br />
        <input type="text" placeholder="" value={props.no_de_receta} onChange={(e) => props.setNo_de_receta(e.target.value)}/>
        <br />
        <span>Descripción:</span>
        <br />
        <input type="text" placeholder="" value={props.descripcion} onChange={(e) => props.setDescripcion(e.target.value)}/>
        <br />
        <br />
      </> )
  } else if (props.addPopup === 'Alimentación') {
    return (
      <>
        <h1>Agregar a Alimentación:</h1>
        <br />  
        <span>Cantidad:</span>  
        <br />
        <input type="text" placeholder="" value={props.cantidad} onChange={(e) => props.setInsumo(e.target.value)}/>
        <br />
        <span>Costo:</span>
        <br />
        <input type="text" placeholder="" value={props.costo} onChange={(e) => props.setCosto(e.target.value)}/>
        <br />
        <Moneda setMoneda={props.setMoneda}/>
        <br />
        <span>No.Factura:</span>
        <br />
        <input type="text" placeholder="" value={props.no_factura} onChange={(e) => props.setNo_factura(e.target.value)}/>
        <br />
        <span>RUT:</span>
        <br />
        <input type="text" placeholder="" value={props.rut} onChange={(e) => props.setRut(e.target.value)}/>
        <br />
        <span>Proveedor:</span>
        <br />
        <input type="text" placeholder="" value={props.proveedor} onChange={(e) => props.setProveedor(e.target.value)}/>
        <br />
        <span>Descripción:</span>
        <br />
        <input type="text" placeholder="" value={props.descripcion} onChange={(e) => props.setDescripcion(e.target.value)}/>
        <br />
        <br />
      </> )
  } else if (props.addPopup === 'Transporte') {
    return (
      <>
        <h1>Agregar a Transporte:</h1>
        <br />
        <span>Descripción:</span>
        <br />
        <input type="text" placeholder="" value={props.descripcion} onChange={(e) => props.setDescripcion(e.target.value)}/>
        <br />
        <span>Costo:</span>
        <br />
        <input type="text" placeholder="" value={props.costo} onChange={(e) => props.setCosto(e.target.value)}/>
        <br />
        <Moneda setMoneda={props.setMoneda}/>
        <br />
        <span>Cantidad (Litros):</span>
        <br />
        <input type="text" placeholder="" value={props.cantidad} onChange={(e) => props.setCantidad(e.target.value)}/>
        <br />
        <span>No.Factura:</span>
        <br />
        <input type="text" placeholder="" value={props.no_factura} onChange={(e) => props.setNo_factura(e.target.value)}/>
        <br />
        <span>RUT:</span>
        <br />
        <input type="text" placeholder="" value={props.rut} onChange={(e) => props.setRut(e.target.value)}/>
        <br />
        <span>Proveedor:</span>
        <br />
        <input type="text" placeholder="" value={props.proveedor} onChange={(e) => props.setProveedor(e.target.value)}/>
        <br />
        <br />
      </> )
  } else if (props.addPopup === 'Hospedaje') {
    return (
      <>
        <h1>Agregar a Hospedaje:</h1>
        <br />
        <span>Proveedor:</span>
        <br />
        <input type="text" placeholder="" value={props.proveedor} onChange={(e) => props.setProveedor(e.target.value)}/>
        <br />
        <span>Costo:</span>
        <br />
        <input type="text" placeholder="" value={props.costo} onChange={(e) => props.setCosto(e.target.value)}/>
        <br />
        <Moneda setMoneda={props.setMoneda}/>
        <br />
        <span>Noches:</span>
        <br />
        <input type="text" placeholder="" value={props.noches} onChange={(e) => props.setNoches(e.target.value)}/>
        <br />
        <span>No.Factura:</span>
        <br />
        <input type="text" placeholder="" value={props.no_factura} onChange={(e) => props.setNo_factura(e.target.value)}/>
        <br />
        <span>RUT:</span>
        <br />
        <input type="text" placeholder="" value={props.rut} onChange={(e) => props.setRut(e.target.value)}/>
        <br />
        <span>Entrada:</span>
        <br />
        <input type="text" placeholder="" value={props.fecha_entrada} onChange={(e) => props.setFecha_entrada(e.target.value)}/>
        <br />
        <span>Descripción:</span>
        <br />
        <input type="text" placeholder="" value={props.descripcion} onChange={(e) => props.setDescripcion(e.target.value)}/>
        <br />
      </> )
  } else { return (null)}

}

const AddPopup = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
      <div className="popUp_div"> 
        <form method='POST' onSubmit = {handleSubmit}>
          <button className="closeAddPopup" onClick={() => props.setAddPopup('')}>X</button>
          <Render
            addPopup = {props.addPopup}
            tipo = {props.addPopup}
            insumo = {props.insumo}
            setInsumo = {props.setInsumo}
            costo = {props.setInsumo}
            setCosto = {props.costo}
            moneda = {props.moneda}
            setMoneda = {props.setMoneda}
            cantidad = {props.cantidad}
            setCantidad = {props.setCantidad}
            no_factura = {props.no_factura}
            setNo_factura = {props.setNo_factura}
            rut = {props.rut}
            setRut = {props.setRut}
            proveedor = {props.proveedor}
            setProveedor = {props.setProveedor}
            no_de_receta = {props.no_de_receta}
            setNo_de_receta = {props.setNo_de_receta}
            descripcion = {props.descripcion}
            setDescripcion = {props.setDescripcion}
            noches = {props.noches}
            setNoches = {props.setNoches}
            fecha_entrada = {props.fecha_entrada}
            setFecha_entrada = {props.setFecha_entrada}
          />
          <input type="submit" value="Agregar" onClick={() => props.posting()}/>
        </form>
      </div>
  )
}


  
  




export default Job;
