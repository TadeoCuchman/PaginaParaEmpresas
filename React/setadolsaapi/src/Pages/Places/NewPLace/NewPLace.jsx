import React from 'react';
import { useState, useEffect} from 'react';

const NewPlace = () => {
  const [openPopupSilosInfo, setPopupSilosInfo] = useState(false)

  const [cliente_id, setCliente_id] = useState(null)
  const [nombre_fantasia, setNombre_Fantasia] = useState('')
  const [localidad, setLocalidad] = useState('')
  const [latitud, setLatitud] = useState('')
  const [longitud, setLongitud] = useState('')
  const [padron, setPadron] = useState('')
  const [plano, setPlano] = useState('')
  const [cantidadDeSilos, setCantidadDeSilos] = useState(0)
  const [silos, setSilos] = useState([])
  
  const [workPlace, setWorkPlace] = useState('')
  const [allClients, setAllClients] = useState([])



  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    chargeClients()
  }, [])

  
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

  const postNewPlace = async (props) => {
    try{
      const newPlace = {
        cliente_id,
        nombre_fantasia,
        localidad,
        latitud,
        longitud,
        padron,
        cantidadDeSilos,
        silos
      }

      await fetch('http://localhost:3333/places/newPlace',{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem("jwt")
        },
        body: JSON.stringify(newPlace)
      }).then(function(respuesta) {
          return respuesta.json()
      }).then(function (res) {
          if (res.success === false) {
              alert (res.message);
          } else {
              alert (res.message);               
          }
      })

    }catch(err) {
      alert(err);
    }
    
  }

  const inicializarSilos = (a) => {
    const silos1 = []
    if ( a <= 40 ) {
      for (let i = 1; i <= a; i++) {
        silos1.push({ nombre:'' , tipo: '' ,toneladas: 0})
      }
    } 
    setSilos(silos1)
  }
  
  

 


  return (
    <main>
      <br />
      <br />
      <h1>Nueva Planta</h1>
      <br />
      <br />
      <form method = 'POST' id='form-NewClient' onSubmit={handleSubmit}>
        <select onChange={(e) => setWorkPlace(e.target.value) }>
            <option value="" >Lugar:</option>
            <option value="Planta">Nueva Planta</option>
            <option value="Cliente">Cliente</option>
        </select>
        <br />
        { (workPlace === "Cliente") &&
          <RenderClients 
              array={allClients } 
              setCliente_id={setCliente_id}
              workPlace={workPlace}
              setNombre_Fantasia={setNombre_Fantasia}
        />}
        <br />
        { (workPlace === "Planta") && 
          <>
            <span>Nombre Fantasia:</span>
            <input type="text" placeholder="Empresa" value={nombre_fantasia} onChange={(e) => setNombre_Fantasia(e.target.value)}/>
          </>
        }
        <span>Localidad:</span>
        <input type="text" placeholder="Localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)}/>
        <span>Coordenadas (Decimales):</span>
        <input type="text" placeholder="Latitud" value={latitud} onChange={(e) => setLatitud(e.target.value)}/>
        <input type="text" placeholder="Longitud" value={longitud} onChange={(e) => setLongitud(e.target.value)}/>
        <span>Padrón:</span>
        <input type="text" placeholder="Padrón" value={padron} onChange={(e) => setPadron(e.target.value)}/>
        <span> Plano:</span>
        <input type="file" accept=".pdf" placeholder="Plano" onChange={(e) => setPlano(e.target.files[0])}/>
        <span>Cantidad de Silos:</span>
        <input type="number" placeholder="Cantidad de Silos"  value={cantidadDeSilos} onChange={(e) => setCantidadDeSilos(e.target.value)}/> 
        <button onClick={() => {
          inicializarSilos(cantidadDeSilos)
          setPopupSilosInfo(true)
        }}>Agregar info</button>
        { openPopupSilosInfo && 
          <div className="siloInfo_div">
            <SilosPopup 
              silos={silos}
              setSilos={setSilos}
              setPopupSilosInfo={setPopupSilosInfo}
              cantidadDeSilos={cantidadDeSilos}
            />
          </div>
        }
        <br/>
        <br />
        <input type="submit" value="Ingresar" onClick={() => postNewPlace()}/>
      </form>
    </main>
  )

  
}

function selectClientName (array, id) {
  const result = array.find(((name) => name.id === id))
  return (result.nombre_fantasia)
}

const Option = (props) => {
  return (
      <option value={props.id} name={props.nombre_fantasia}> {props.nombre_fantasia} </option>
  )
}

const RenderClients = (props) => {
  const array = props.array
  

  return( 
    <select onChange={(e) => {
        props.setCliente_id(`${e.target.value}`)
        props.setNombre_Fantasia(selectClientName(array, e.target.value))
    }}>
      <option  value=''>{`Seleccionar ${props.workPlace}:`}</option>
      { array.map((option, key) => {
          return ( <Option 
            key={key}
            nombre_fantasia={option.nombre_fantasia}
            id={option.id}
            setNombre_Fantasia={props.setNombre_Fantasia}
            />
          )
      })
      }
      </select>)
}




const SelectTypeSilos = (props) => {
  return (     
    <select className="tipoDeSilo" value={`${props.silos[props.index].tipo}`} onChange={ props.TypeChanged(props.index)} >
        <option value=''>Tipo de Silo</option>
        <option value="Silo Bolsa">Silo Bolsa</option>
        <option value="Silo">Silo</option>
        <option value="Celda">Celdas</option>
      </select>)
}

const Silo = (props) => {

  const NameChanged = index => e => {
    let newArr = [...props.silos]; 
    
    newArr[index].nombre = e.target.value

  
    props.setSilos(newArr); 
  }

  const TypeChanged = index => e => {
    let newArr = [...props.silos]; 

    newArr[index].tipo = e.target.value

  
    props.setSilos(newArr); 
  }

  const TonsChanged = index => e => {
    let newArr = [...props.silos]; 

    newArr[index].toneladas = parseInt(e.target.value)
  
    props.setSilos(newArr); 
  }

  return(
    <div className="siloInfo"> 
      <span>Nombre de Silo:</span>
      <input type="text" className="nombreDeSilo" value={ props.silos[props.index].nombre } onChange={ NameChanged(props.index)}/>
      <span>Tipo de Silo:</span>
      <SelectTypeSilos TypeChanged={TypeChanged} index={props.index} silos={props.silos} />
      <br />
      <span>Toneladas:</span>
      <input type="number" className="toneladasDeSilo" value={ props.silos[props.index].toneladas } onChange={ TonsChanged(props.index)}/>
    </div>
  ) 
}

const RenderSilos = (props) => {
  
  if (props.silos.length === 0) {
    return (
      <div>
          {'No es posible Agregar más de 40 Instalaciones para una Planta.'}
      </div>
    )
  }
  return (
    props.silos.map((s, index) => (<Silo  
      key={index}
      index={index} 
      silos={props.silos} 
      setSilos={props.setSilos} 
    />))
  )
}

const SilosPopup = (props) => {
return (
  <div className="silosInfo"> 
    <button onClick={() => props.setPopupSilosInfo(false)}>X</button>
    <RenderSilos silos={props.silos} setSilos={props.setSilos}/>
    <input type="submit" value="Agregar Info" onClick={() => {
        props.setPopupSilosInfo(false)
    }}/>   
  </div>
  )
}

export default NewPlace;