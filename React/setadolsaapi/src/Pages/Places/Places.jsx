import React from 'react';
import { useState, useEffect} from 'react'
import Spinner from '../../Components/Spiner'
import Searcher from '../../Components/Searcher'

const Places = () => {
    const [allPlaces, setAllPlaces] = useState([])
    const [editPlacePopup, setEditPlacePopUp] = useState(false)
    const [silosPopup, setSilosPopup] = useState(false)
    const [selected, setSelected] = useState(-1)    
 

    useEffect(() => {
        chargePlaces()  
    }, [])


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
            alert('No conexión con Servidor')
        }
    }  

    return (
        <main>
            <br />
            <h1>Lista de Plantas:</h1>
            <br />
            <Searcher array={allPlaces}/>
            <br />
            {allPlaces.length > 0 ?
            <ListOfPlaces places={allPlaces} setEditPlacePopUp={setEditPlacePopUp} selected={selected} setSelected={setSelected} setSilosPopup={setSilosPopup}/>
            : <Spinner/>}
            {editPlacePopup && 
                <EditPopUpPlace selected={selected} allPlaces={allPlaces} chargePlaces={chargePlaces} setEditPlacePopUp={setEditPlacePopUp}/>}
        </main>
    )
}





const Place = (props) => {
    return (
        <li className={props.selected ? "contact2" : "contact"} onClick={() => props.setSelected(props.id) }>
            <h2>Nombre Fantasia: {props.nombre_fantasia}</h2>
            <br />
            <span>Localidad: {props.localidad} </span>
            <br />
            <span>Coordenadas: {props.lat} - {props.lng}</span>
            <br />
            <span>Padrón: {props.padron}</span>
            <br />
            <span> Plano:</span>
            <br />
            <span>Cantidad de Silos: {props.cantidad_de_silos}</span>
            <br />
            {props.selected && 
            <>
                <button>Ver Planos</button>
                <button onClick={() => props.setEditPlacePopUp(true)}>Editar</button>
            </>}

        </li>
    )
}

const ListOfPlaces = (props) => {
    const places =  props.places
    
    if (places){
        return(
            <ul id='contacts'>
                { places.map(((place, key)=> {
                    return ( <Place
                        id={place.id}
                        key={key}
                        nombre_fantasia={place.nombre_fantasia}
                        localidad={place.localidad}
                        lng={place.lng}
                        lat={place.lat}
                        padron={place.padron}
                        cantidad_de_silos={place.cantidad_de_silos}
                        selected={place.id === props.selected}
                        setSelected={props.setSelected}
                        setEditPlacePopUp={props.setEditPlacePopUp}
                        setSilosPopup= {props.setSilosPopup}
                        />)
                }))}
            </ul>
        )
    } else { return[] }
}



const Silo = (props) => {

    const NameChanged = index => e => {
        let newArr = [...props.silos]; 
    
        newArr[index].nombre_de_silo = e.target.value
      
        props.setSilos(newArr); 
    }

    const TypeChanged = index => e => {
        let newArr = [...props.silos]; 
    
        newArr[index].tipo_de_silo = e.target.value
      
        props.setSilos(newArr);  
    }

    const CapacityChanged = index => e => {
        let newArr = [...props.silos]; 
    
        newArr[index].toneladas = parseInt(e.target.value)
      
        props.setSilos(newArr);  
    }

    const MeditionChanged = index => e => {
        let newArr = [...props.silos]; 
    
        newArr[index].medida = e.target.value
      
        props.setSilos(newArr);  
    }

    return (
        <div className="siloInfo" > 
            <span>Nombre de Silo:</span>
            <input type="text" value={`${props.silos[props.index].nombre_de_silo}`} className="nombreDeSilo" onChange={ NameChanged(props.index)}/>
            <span>Tipo de Silo:</span>
            <select className="tipoDeSilo" value={props.silos[props.index].tipo_de_silo} onChange={ TypeChanged(props.index)} >
                <option value=''>Tipo de Silo</option>
                <option value="Silo Bolsa">Silo Bolsa</option>
                <option value="Silo">Silo</option>
                <option value="Celda">Celdas</option>
            </select>
            <br />
            <span>Capacidad:</span>
            <input type="number" value={props.silos[props.index].capacidad} className="toneladasDeSilo" onChange={ CapacityChanged(props.index)}/>
            <br />
            <select value={props.silos[props.index].medida} onChange={ MeditionChanged(props.index)}>
                <option value="toneladas">Toneladas</option>
                <option value="litros">Litros</option>
            </select>
        </div>
    )
}

const RenderSilos = (props) => {
    const silos = props.silos
    
    if (props.cantidadDeSilos > silos.length) {
        const newNumber = props.cantidadDeSilos - silos.length

        for (let i = 0; i < newNumber; i++) {
            silos.push({ planta_id: props.placeId, nombre_de_silo:'', tipo_de_silo: '', capacidad: 0, medida: ''})
        }
    

    }
        return (
            silos.map((silo, i) => {
                return ( <Silo
                    key= {i}
                    index= {i}
                    silos={silos}
                    setSilos={props.setSilos}
                    />   
                ) 
            })
        )
}

const SilosPopup = (props) => {

    return (
        <div className="silosInfo"> 
            <button  onClick={() => props.setPopupSilosInfo(false)}>X</button>
            <RenderSilos
                silos={props.silos}
                setSilos={props.setSilos}
                cantidadDeSilos={props.cantidadDeSilos}
                placeId={props.placeId}
            />
            <input type="submit" value="Agregar Info" onClick={() => {
                props.setPopupSilosInfo(false)
            }}/>   
        </div>
)}

const EditPopUpPlace = (props) => {
    const placeId = props.selected
    
    const [openPopupSilosInfo, setPopupSilosInfo] = useState(false)

    const result = props.allPlaces.find(place => place.id === props.selected)

    const [nombre_fantasia, setNombre_Fantasia] = useState('' || result.nombre_fantasia)
    const [localidad, setLocalidad] = useState('' || result.localidad)
    const [lng, setLng] = useState('' || result.lng)
    const [lat, setLat] = useState('' || result.lat)
    const [padron, setPadron] = useState('' || result.padron)
    const [cantidadDeSilos, setCantidadDeSilos] = useState('' || result.cantidad_de_silos)
    const [plano, setPlano] = useState('')
    const [silos, setSilos] = useState([])
    

    useEffect(() => {
        chargeSilosFromPLace(placeId)
    }, [])

   
    const handleSubmit = (event) => {
        event.preventDefault();
      };

    const chargeSilosFromPLace = async (id) => {
        try {
            await fetch(`http://localhost:3333/places/allSilos/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "auth-token" : localStorage.getItem("jwt")
                },
                }).then(response => response.json())
                .then(data => setSilos(data.array))
                
        } catch (err) {
            alert('No conexión con Servidor.')
        }

    }

    const modifyPlace = async (a) => {
        const modifyBody = {
            nombre_fantasia,
            localidad,
            lng,
            lat,
            padron,
            cantidadDeSilos,
            silos
        }

        try {
            await fetch(`http://localhost:3333/places/${a}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type" : "application/json",
                        "auth-token" : localStorage.getItem("jwt")
                    },body: JSON.stringify(modifyBody)
                }).then((respuesta) => {
                    return respuesta.json()
                }).then(function (res) { alert (res.message);
                }).then(() => { 
                    props.chargePlaces()
                    props.setEditPlacePopUp(false)
                })  
        } catch (err) {
            alert('Falló el Servidor')
        }
    }
    
    return (
        <div id="editPlacePopUpDiv">
            <button className="cerrarPopUp" onClick={() => props.setEditPlacePopUp(false)}>X</button>
            <br />
            <form method = 'POST' id='form-NewClient' onSubmit={handleSubmit}>
                <span>Nombre Fantasia:</span>
                <input type="text" placeholder="Empresa" value={nombre_fantasia} onChange={(e) => setNombre_Fantasia(e.target.value)}/>
                <span>Localidad:</span>
                <input type="text" placeholder="Localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)}/>
                <span>Coordenadas:</span>
                <input type="text" placeholder="Latitud" value={lat} onChange={(e) => setLat(e.target.value)}/>
                <input type="text" placeholder="Longitud" value={lng} onChange={(e) => setLng(e.target.value)}/>
                <span>Padrón:</span>
                <input type="text" placeholder="Padrón" value={padron} onChange={(e) => setPadron(e.target.value)}/>
                <span> Plano:</span>
                <input type="file" accept=".pdf" placeholder="Plano" onChange={(e) => setPlano(e.target.files[0])}/>
                <span>Cantidad de Silos:</span>
                <input type="number" placeholder="Cantidad de Silos"  value={cantidadDeSilos} onChange={(e) => setCantidadDeSilos(e.target.value)}/> 
                <button onClick={() => {setPopupSilosInfo(true)}}>Editar Silos</button>
                { openPopupSilosInfo && 
                <div className="siloInfo_div">
                    <SilosPopup 
                        cantidadDeSilos = {cantidadDeSilos}
                        setCantidadDeSilos ={setCantidadDeSilos}
                        silos={silos}
                        setSilos={setSilos}
                        setPopupSilosInfo={setPopupSilosInfo}
                        placeId={placeId}
                    />
                </div>
                }
                <br/>
                <br />
                <input type="submit" value="Ingresar" onClick={() => modifyPlace(placeId)}/>
            </form>
        </div>
    )
}







export default Places;