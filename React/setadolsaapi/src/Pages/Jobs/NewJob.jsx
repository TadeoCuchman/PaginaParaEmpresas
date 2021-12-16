import React from 'react';
import { useState, useEffect } from 'react';

const NewJob = () => {
    const [openPopUpInstalationes, setPopUpInstalaciones] = useState(false)
    const [selectedClient, setSelectedClient] = useState(-1)
    const [selectedPlace, setSelectedPlace] = useState(-1)
    
    const [code, setCode] = useState('')
    const [start_date, setStartDate] = useState('')
    const [typeOfJob, setTypeOfJob] = useState('')
    const [description, setDescription] = useState('')
    const [cantidadDeSilos, setCantidadDeSilos] = useState(0)
    const [silosArray, setSilosArray] = useState([])
    
    const [allClients, setAllClients] = useState([])
    const [allPlaces, setAllPlaces] = useState([])
    


    useEffect(() => {
      chargeClients()
      chargePlaces()
    }, [])


    const handleSubmit = (event) => {
      event.preventDefault();
    };

    const chargeClients = async () => {
      try{
        await fetch('http://localhost:3333/clients/allClients', {
          method: "GET",
          headers: {
              "Content-Type" : "application/json",
              "auth-token" : localStorage.getItem("jwt")
          },
          }).then(response => response.json())
          .then(data => setAllClients(data.array))
      }catch (err) {
        alert(err);
      }
    }
    
    const chargePlaces = async () => {
      try{
        await fetch('http://localhost:3333/places/allPlaces', {
          method: "GET",
          headers: {
              "Content-Type" : "application/json",
              "auth-token" : localStorage.getItem("jwt")
          },
          }).then(response => response.json())
          .then(data => setAllPlaces(data.array))
      }catch (err) {
        alert(err);
      }
    }

    const chargeSilos = async (a) => {
      try{
        await fetch(`http://localhost:3333/places/allSilos/${a}`, {
          method: "GET",
          headers: {
              "Content-Type" : "application/json",
              "auth-token" : localStorage.getItem("jwt")
          },
          }).then(response => response.json())
          .then(data => setSilosArray(data.array))
      }catch (err) {
        alert('silos' + err);
      }
    }

    const PostNewJob = async () => {
      try{
        const newJob = {
            client_id: selectedClient,
            place_id: selectedPlace,
            code,
            start_date,
            typeOfJob,
            description,
            silosArray 
        }
      
  
        await fetch('http://localhost:3333/jobs/addJob',{
          method: "POST",
          headers:{
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem("jwt")
          },
          body: JSON.stringify(newJob)
        }).then(function(respuesta) {
            return respuesta.json()
        }).then(function (res) {
            if (res.success === false) {
                alert (res.message);
            } else {
                alert (res.message)
                setStartDate('')
                setTypeOfJob('')
                setDescription('')
                setCantidadDeSilos(0)
                setSilosArray([])
                setSelectedClient('')
                setSelectedPlace('')
            }
        })
  
      }catch(err) {
        alert('Error con servidor' + err);
      }
      
    }
  

    
    return (
      <main>
        <br />
        <h1>Nuevo Trabajo:</h1>
        <br />
        <form method = 'POST' id='form-NewFumi' onSubmit={handleSubmit}>
          <span>Cliente*:</span>
          <RenderOptions array={allClients} selections={'Cliente'} setSelected={setSelectedClient} />
          <span>Lugar*:</span>
          <RenderOptions array={allPlaces} selections={'Planta'} setSelected={setSelectedPlace} setCantidadDeSilos={setCantidadDeSilos} chargeSilos={chargeSilos}/>
          <br />
          <span>Codigo*:</span>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
          <br />
          <span>Fecha de Inicio*:</span>
          <input value={start_date} type="date" onChange={(e) => setStartDate(e.target.value) }/>
          <br />
          <span>Servicio*:</span>
          <select onChange={(e) => setTypeOfJob(e.target.value)}>
            <option value=''>Servicios</option>
            <option value="Fumigacion">Fumigación</option>
            <option value="Lavado de Silos">Lavado de Silos</option>
            <option value="Control de Plagas">Control de Plagas</option>
          </select>
          <br />
          <span>Instalaciones*:</span>
          <button onClick={() => {
            setPopUpInstalaciones(true)
          }}>Ingresar Instalaciones a Usar</button>
          {openPopUpInstalationes && 
            <SilosPopup 
              cantidadDeSilos={cantidadDeSilos} 
              setCantidadDeSilos={setCantidadDeSilos}
              selected={selectedPlace} 
              setPopUpInstalaciones={setPopUpInstalaciones}
              silosArray={silosArray}
              setSilosArray={setSilosArray}
              />}
          <span>Descripción:</span>
          <input type="text" placeholder="Descripción" onChange={(e) => setDescription(e.target.value)}/>
          <br />
          <br />
          <input type="submit" value="Ingresar" onClick={PostNewJob}/>
        </form>
        <span>* Obligatorios</span>
      </main>
    )
}



const Option = (props) => {
  return (
      <option value={props.id}> {props.nombre_fantasia} </option>
  )
}

const RenderOptions = (props) => {
  const array = props.array

  return (
    <select onChange={(e) => {
      props.setSelected(e.target.value)
      if (props.chargeSilos){
      props.chargeSilos(e.target.value)
      }
    }}>
      <option value=''>{`Seleccionar ${props.selections}:`}</option>
      { array.map((option, key) => {
          return ( <Option 
              key={key}
              nombre_fantasia={option.nombre_fantasia}
              id={option.id}
              cantidad_de_silos={option.cantidad_de_silos}
              />
          )
      })}
        </select>)
}




const Silo = (props) => {

  useEffect(() => {
    let newArr = [...props.silosArray]; 
    newArr[props.index].silo_Id = props.id
    newArr[props.index].tipo_de_producto = ''
    props.setSilosArray(newArr); 
  }, [])


  const CheckChange = (index, state) => e => {
    let newArr = [...props.silosArray]; 
    
    newArr[index].checkbox = !state

  
    props.setSilosArray(newArr); 
  }

  const SubstratCantChanged = index => e => {
    let newArr = [...props.silosArray]; 
    
    newArr[index].cantidad_de_substrato = e.target.value

  
    props.setSilosArray(newArr); 
  }

  const TypeProductChanged = index => e => {
    let newArr = [...props.silosArray]; 

    newArr[index].tipo_de_producto = e.target.value

  
    props.setSilosArray(newArr); 
  }

  const ProductCantChanged = index => e => {
    let newArr = [...props.silosArray]; 

    newArr[index].cantidad_de_producto = e.target.value
  
    props.setSilosArray(newArr); 
  }


  return (
    <div className="siloInfo"> 
        <input type="checkbox" onChange={ CheckChange(props.index, props.silosArray[props.index].checkbox) }/>
        <br />
        <span> Silo Número: {props.nombre_de_silo}</span>
        <br />
        <span>Tipo de Silo: {props.tipo_de_silo}</span>
        <br />
        <span>Capacidad: {props.capacidad}  {props.medida}</span>
        <br />
        <span>Cantidad de substrato (toneladas):</span>
        <input type="number" value={`${props.silosArray[props.index].cantidad_de_substrato}`} onChange={ SubstratCantChanged(props.index)}/>
        <br />
        <span>Tipo de Producto:</span>
        <input type="text" value={`${props.silosArray[props.index].tipo_de_producto}`} onChange={ TypeProductChanged(props.index)}/>
        <br />
        <span>Candidad de Producto:</span>
        <input type="number" value={`${props.silosArray[props.index].cantidad_de_producto}`} onChange={ ProductCantChanged(props.index)}/>
      </div>
  )
}

const RenderSilos = (props) => {
  const silos = props.silosArray


  if (silos) {
    return(
      <div id="silos">
        { silos.map(((silo, index) => {
          return ( <Silo
            key={index}
            index={index}
            id={silo.id}
            nombre_de_silo={silo.nombre_de_silo}
            tipo_de_silo={silo.tipo_de_silo}
            capacidad={silo.capacidad}
            medida={silo.medida}
            silosArray={props.silosArray} 
            setSilosArray={props.setSilosArray} 
            />)
      }))}
      </div>
    )
  } else { return[] }
}


const SilosPopup = (props) => {

  return (
    <div className="silosInfo"> 
          <button onClick={() => props.setPopUpInstalaciones(false)}>X</button>
          <RenderSilos 
            silosArray={props.silosArray} 
            setSilosArray={props.setSilosArray} 
            chargeSilos={props.chargeSilos}
            />
          <input type="submit" value="Agregar Info" onClick={() => {
            props.setPopUpInstalaciones(false)
          } }/>
    </div>

  )
}
export default NewJob;
