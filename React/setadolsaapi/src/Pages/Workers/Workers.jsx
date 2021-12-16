import React from 'react';
import { useState, useEffect } from 'react'
import Spiner from '../../Components/Spiner'
import Searcher from '../../Components/Searcher'

const Workers = () => {
    const [allWorkers, setAllWorkers] = useState([])
    const [editWorkerPopup, setEditWorkerPopUp] = useState(false)
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        chargeWorkers()
    }, [])

   
    const chargeWorkers = async () => {
        try{
            await fetch('http://localhost:3333/workers/allWorkers', {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "auth-token" : localStorage.getItem("jwt")
                },
                }).then(response => response.json())
                .then(data => setAllWorkers(data.array))
        }catch (err) {
            alert('No conexión con Servidor')
        }
    }

   

    

    return (
        <main>
            <br />
            <h1>Lista de Operarios:</h1>
            <br />
            <Searcher array={allWorkers} />
            <br />
            {allWorkers.length > 0 ?
            <ListOfWorkers workers={allWorkers} selected={selected} setSelected={setSelected} setEditWorkerPopUp={setEditWorkerPopUp}/>
            : <Spiner/>}
            {editWorkerPopup && <EditPopUp allWorkers={allWorkers} selected={selected} setEditWorkerPopUp={setEditWorkerPopUp} chargeWorkers={chargeWorkers}/>}

        </main>
    )
}


const ListOfWorkers = (props) => {
    const workers = props.workers

    if (workers){
        return(
            <div id='contacts'>
                { workers.map(((worker, key) => {
                    return (
                        <Worker
                            key={key}
                            id={worker.id}
                            name={worker.nombre_apellido}
                            ci={worker.ci}
                            bornDate={worker.fecha_de_nacimiento}
                            adress={worker.direccion}
                            cel={worker.celular}
                            tel={worker.telefono}
                            mail={worker.mail}
                            altaBps={worker.alta_bps}
                            bajaBps={worker.baja_bps}
                            carnetS={worker.carnet_de_salud}
                            emergencyTel={worker.telefono_emergencia}
                            selected={worker.id === props.selected}
                            setSelected={props.setSelected}
                            setEditWorkerPopUp={props.setEditWorkerPopUp}

                        />)
                }))}

            </div>
        )
    }
}

const Worker = (props) => {
    return (
        <li className={props.selected ? "contact2" : "contact"} onClick={() => props.setSelected(props.id)}>
            <img src="" alt="" />
            <h2>Nombre y Apellido: {props.name} </h2>
            <br />
            <span>Dirección: {props.adress}</span>
            <br />
            <span>Celular: {props.cel}</span>
            <br />
            <span>Teléfono: {props.tel}</span>
            <br />
            <span>Mail: {props.mail}</span>
            <br />
            <span>Teléfono de Emergencia: {props.emergencyTel}</span>
            <br />
            {props.selected &&
            <>
            <span>Alta BPS: {props.altaBps}</span>
            <br />
            <span>CI: {props.ci}</span>
            <br />
            <span>Fecha de Nacimiento: {props.bornDate}</span>
            <br />
            <span>Baja BPS: {props.bajaBps}</span>
            <br />
            <span>Carnet de Salud (vencimiento): {props.carnetS}</span>
            <br />
            <button onClick={() => props.setEditWorkerPopUp(true)}>Editar</button>
            </>
            }
        </li>
    )
}

const EditPopUp = (props) => {
    const WorkerId = props.selected

    const result = props.allWorkers.find(worker => worker.id === WorkerId)

    const [name, setName] = useState('' || result.nombre_apellido)
    const [ci, setCi] = useState('' || result.ci)
    const [bornDate, setBornDate] = useState('' || result.fecha_de_nacimiento)
    const [adress, setAdress] = useState('' || result.direccion)
    const [cel, setCel] = useState('' || result.celular)
    const [tel, setTel] = useState('' || result.telefono)
    const [mail, setMail] = useState('' || result.mail)
    const [altaBps, setAltaBps] = useState('' || result.alta_bps)
    const [bajaBps, setBajaBps] = useState('' || result.baja_bps)
    const [carnetS, setCarnetS] = useState('' || result.carnet_de_salud)
    const [emergencyTel, setEmergencyTel] = useState('' || result.telefono_emergencia)

    const handleSubmit = (event) => {
        event.preventDefault();
      };


    const modifyWorker = async (a) => {
        const modifyBody = {
            name,
            ci: parseInt(ci),
            bornDate,
            adress,
            cel,
            tel,
            mail,
            altaBps,
            bajaBps,
            carnetS,
            emergencyTel
        }
        try {
        await fetch(`http://localhost:3333/workers/${a}`, {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json",
                    "auth-token" : localStorage.getItem("jwt")
                },body: JSON.stringify(modifyBody)
            }).then((respuesta) => {
                return respuesta.json()
            }).then(function (res) {
                if (!res.succes) {
                    alert (res.message);
                }
            }).then(() => { 
                props.chargeWorkers()
                props.setEditWorkerPopUp(false)
            })
        } catch (err) {
            alert('Falló el Servidor' + err)
        }
    }
    
    return (
        <div id="editWorkerPopUpDiv">
            <button onClick={() => props.setEditWorkerPopUp(false)}>X</button>
            <br />
            <form action="PUT" onSubmit={handleSubmit}>
                <span>Nombre y Appellido*:</span>
                <input type="text" value={name} placeholder="Nombre y Appellido" onChange={(e) => setName(e.target.value) }/>
                <br />
                <span>CI*:</span>
                <input type="text" value={ci} placeholder="CI" onChange={(e) => setCi(e.target.value) }/>
                <br />
                <span>Fecha de Nacimiento*:</span>
                <input type="date" value={bornDate} onChange={(e) => setBornDate(e.target.value) }/>
                <br />
                <span>Dirección*:</span>
                <input type="text" value={adress} placeholder="Dirección" onChange={(e) => setAdress(e.target.value) }/>
                <br />
                <span>Celular*:</span>
                <input type="text" value={cel} placeholder="Celular" onChange={(e) => setCel(e.target.value) }/>
                <br />
                <span>Teléfono:</span>
                <input type="text" value={tel} placeholder="Teléfono" onChange={(e) => setTel(e.target.value) }/>
                <br />
                <span>Mail*:</span>
                <input type="email" value={mail} placeholder="Mail" onChange={(e) => setMail(e.target.value) }/>  
                <br />
                <span>Alta BPS*:</span>
                <input type="date" value={altaBps} onChange={(e) => setAltaBps(e.target.value) }/>
                <br />
                <span>Baja BPS:</span>
                <input type="date" value={bajaBps} onChange={(e) => setBajaBps(e.target.value) }/>
                <br />
                <span>Carnet de Salud (vence)*: </span>
                <input type="date" value={carnetS} onChange={(e) => setCarnetS(e.target.value) }/>
                <br />
                <span>Capacitaciones:</span>
                <input type="file" multiple/>
                <br />
                <span>Foto:</span>
                <input type="file" />
                <br />
                <span>Telefono de emergencia:</span>
                <input type="text" value={emergencyTel} placeholder="Telefono de emergencia" onChange={(e) => setEmergencyTel(e.target.value) }/>
                <br />
                <br />
                <br />
                <input type="submit" id="submit" onClick = {() =>  modifyWorker(WorkerId)} /> 
            </form>
        </div>
    )
}



export default Workers;