import React from 'react';
import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect} from 'react'
import ListOfExpences from '../../Components/ListOfExpences';

import { ReactComponent as NewTaskIcon} from '../../Icons/NewTask.svg'
import { ReactComponent as ExitIcon } from '../../Icons/Exit.svg'
  
const Job = () => {
  const [addPopup, setAddPopup] = useState('')
  const { id } = useParams('')
  const [insumo, setInsumo] = useState('')
  const [costo, setCosto] = useState(0)
  const [moneda, setMoneda] = useState('$')
  const [cantidad, setCantidad] = useState(0)
  const [no_factura, setNo_factura] = useState('')
  const [rut, setRut] = useState()
  const [proveedor, setProveedor] = useState('')
  const [no_de_receta, setNo_de_receta] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [noches, setNoches] = useState(0)
  const [fecha_entrada, setFecha_entrada] = useState('')
  const [fecha_gasto, setFecha_gasto] = useState('')
  
  const [allExpences, setAllExpences] = useState([])
  const [jobInfo, setJobInfo] = useState({
    tipo_de_trabajo: '',
    id: ''
  })

  const [advertisement, openAdvertisment] = useState(false)
  
  // const location = useLocation()

  // console.log(location)

  useEffect(() => {
    chargeExpences(id)
    chargeJob(id)
  }, [])


  const chargeJob = async (a) => {
    try{
      await fetch(`http://localhost:3333/jobs/infoJob/${a}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            "auth-token" : localStorage.getItem("jwt")
        },
        }).then(response => response.json())
        .then(data => setJobInfo(data.array))
    }catch (err) {
      alert(err);
    }
  }

  const chargeExpences = async (a) => {
    try{
      await fetch(`http://localhost:3333/jobs/allExpences/${a}`, {
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

  const deliverJob = async (a, job) => {
    try{
      const Job = job
    
      await fetch(`http://localhost:3333/jobs/deliverJob/${a}`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem("jwt")
        },
        body: JSON.stringify(Job)
      }).then(function(respuesta) {
          return respuesta.json()
      }).then(function (res) {
          if (res.success === false) {
              alert (res.message);
          } else {
              alert (res.message)
          }
      })

    }catch(err) {
      alert('Error con servidor' + err);
    }
  }

 function resetStates (type) {
  setAddPopup(type)
  setInsumo('')
  setCosto('')
  setMoneda('$Pesos')
  setCantidad(0)
  setNo_factura('')
  setRut('')
  setProveedor('')
  setNo_de_receta('')
  setDescripcion('')
  setNoches(0)
  setFecha_entrada(null)
 }

  return (
    <main id="main_Fumi">
      <h1>{jobInfo.tipo_de_trabajo}: {jobInfo.codigo}.</h1>
      <br />
      <div className="info">
        <ListOfExpences spends={allExpences}/>
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
        <button onClick={() =>{
          openAdvertisment(true)
        }}><ExitIcon/></button>
        {advertisement && <Advertisement openAdvertisment={openAdvertisment} deliverJob={deliverJob} id={id} jobInfo={jobInfo}/>}
        <br />
        <br />
        <br />
      </div>
      <br />
      { (addPopup !== '') && 
        <AddPopup 
          id={id}
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
          fecha_gasto={fecha_gasto}
          setFecha_gasto={setFecha_gasto}
          chargeExpences= {chargeExpences}
        />}
    </main>
    )
}


const Moneda = (props) => {
  return(
    <select  onChange={(e) => props.setMoneda(e.target.value)}>
      <option value="$Pesos"> Pesos </option>
      <option value="USD$"> USD </option>
    </select>
  )
}

const Costo = (props) => {
  return (
    <>
      <br />
      <span>Costo:</span>
      <br />
      <input type="number" placeholder="" value={props.costo} onChange={(e) => props.setCosto(e.target.value)}/>
    </>
  )
}

const FechaGasto = (props) => {
  const n = new Date
  const y = n.getFullYear();
  const m = n.getMonth() + 1;
  const d = n.getDate();
  return (
    <>
      <span>Fecha Gasto:</span>
      <br />
      <input type="date" value={d + "/" + m + "/" + y} value={props.fecha_gasto} onChange={(e) => props.setFecha_gasto(e.target.value)} />
      <br />
    </>
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
        <Costo costo={props.costo} setCosto={props.setCosto}/>
        <br />
        <span>Moneda:</span>
        <br />
        <Moneda setMoneda={props.setMoneda} moneda={props.moneda}/>
        <br />
        <br />
        <span>Cantidad:</span>
        <br />
        <input type="number" placeholder="" value={props.cantidad} onChange={(e) => props.setCantidad(e.target.value)}/>
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
        <FechaGasto fecha_gasto={props.fecha_gasto} setFecha_gasto={props.setFecha_gasto}/>
        <br />
      </> )
  } else if (props.addPopup === 'Alimentación') {
    return (
      <>
        <h1>Agregar a Alimentación:</h1>
        <br />  
        <span>Cantidad de Comidas:</span>  
        <br />
        <input type="number" placeholder="" value={props.cantidad} onChange={(e) => props.setCantidad(e.target.value)}/>
        <br />
        <span>Costo:</span>
        <br />
        <input type="text" placeholder="" value={props.costo} onChange={(e) => props.setCosto(e.target.value)}/>
        <br />
        <Moneda setMoneda={props.setMoneda}  moneda={props.moneda}/>
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
        <FechaGasto fecha_gasto={props.fecha_gasto} setFecha_gasto={props.setFecha_gasto}/>
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
        <Moneda setMoneda={props.setMoneda}  moneda={props.moneda}/>
        <br />
        <span>Cantidad (Litros):</span>
        <br />
        <input type="number" placeholder="" value={props.cantidad} onChange={(e) => props.setCantidad(e.target.value)}/>
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
        <FechaGasto fecha_gasto={props.fecha_gasto} setFecha_gasto={props.setFecha_gasto}/>
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
        <Moneda setMoneda={props.setMoneda}  moneda={props.moneda}/>
        <br />
        <span>Noches:</span>
        <br />
        <input type="number" placeholder="" value={props.noches} onChange={(e) => props.setNoches(e.target.value)}/>
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
        <input type="date" placeholder="" value={props.fecha_entrada} onChange={(e) => props.setFecha_entrada(e.target.value)}/>
        <br />
        <span>Descripción:</span>
        <br />
        <input type="text" placeholder="" value={props.descripcion} onChange={(e) => props.setDescripcion(e.target.value)}/>
        <br />
        <FechaGasto fecha_gasto={props.fecha_gasto} setFecha_gasto={props.setFecha_gasto}/>
        <br />
      </> )
  } else { return (null)}

}

const AddPopup = (props) => {


  const handleSubmit = (event) => {
    event.preventDefault();
  };


  const posting = async (a) => {
    try {
        
        const postBody = {
          tipo: props.addPopup,
          insumo: props.insumo,
          costo: parseInt(props.costo),
          moneda: props.moneda,
          cantidad: parseInt(props.cantidad),
          no_factura: props.no_factura,
          rut: parseInt(props.rut),
          proveedor: props.proveedor,
          no_de_receta: props.no_de_receta,
          descripcion: props.descripcion,
          noches: parseInt(props.noches),
          fecha_entrada: props.fecha_entrada,
          fecha_gasto: props.fecha_gasto
      }
      console.log(postBody)

      await fetch(`http://localhost:3333/jobs/addToJob/${a}`, {
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
            props.chargeExpences(props.id)
            props.setAddPopup('')
            props.setInsumo('')
            props.setCosto('')
            props.setMoneda('')
            props.setCantidad('')
            props.setNo_factura('')
            props.setRut('')
            props.setProveedor('')
            props.setNo_de_receta('')
            props.setDescripcion('')
            props.setNoches('')
            props.setFecha_entrada('')
            props.setFecha_gasto('')
          }
      })
    } catch (err) {
      alert('No conexión con servidor.' + err)
    }
  }

  return (
      <div className="popUp_div"> 
        <form method='POST' onSubmit = {handleSubmit}>
          <button className="closeAddPopup" onClick={() => props.setAddPopup('')}>X</button>
          <Render
            addPopup = {props.addPopup}
            tipo = {props.addPopup}
            insumo = {props.insumo}
            setInsumo = {props.setInsumo}
            costo = {props.costo}
            setCosto = {props.setCosto}
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
            fecha_gasto = {props.fecha_gasto}
            setFecha_gasto = {props.setFecha_gasto}
          />
          <input type="submit" value="Agregar" onClick={() => posting(props.id)}/>
        </form>
      </div>
  )
}

const Advertisement = (props) => {
  return (
    <div className='advertisement'>
      <div>
        <h1>Seguro querés entregar el trabajo?</h1>
        <button onClick={() => props.openAdvertisment(false)}>Cancelar</button>
        <button onClick={() => props.deliverJob(props.id, props.jobInfo)}>Entregar</button>
      </div>
    </div>
  )
}

  
  




export default Job;
