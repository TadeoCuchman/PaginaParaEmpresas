import React from 'react';
import { useState, useEffect } from 'react'

const Workers = () => {
    const [allWorkers, setAllWorkers] = useState([])
    const [editUserPopup, setEditUserPopUp] = useState(false)
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        chargeWorkers()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
      };

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

    const Worker = (props) => {
        return (
            <li className="worker" onClick={() => setSelected(props.id)}>
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
                <button>Edit</button>
                </>
                }
            </li>
        )
    }

    const EditPopUp = () => {
        const [name, setName] = useState('')
        const [ci, setCi] = useState('')
        const [bornDate, setBornDate] = useState('')
        const [adress, setAdress] = useState('')
        const [cel, setCel] = useState('')
        const [tel, setTel] = useState('')
        const [mail, setMail] = useState('')
        const [altaBps, setAltaBps] = useState('')
        const [bajaBps, setBajaBps] = useState(null)
        const [carnetS, setCarnetS] = useState('')
        const [emergencyTel, setEmergencyTel] = useState('')

        const modifyWorker = async (a) => {
            const modifyBody = {
                name,
                ci,
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
            await fetch(`http://localhost:3333/users/${a}`, {
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
                    chargeWorkers()
                    setEditUserPopUp(false)
                })
            } catch (err) {
                alert('Falló el Servidor')
            }
        }
        
        return (
            <div id="editUserPopUpDiv">
                <button onClick={() => setEditUserPopUp(false)}>X</button>
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
                    <input type="submit" id="submit" onClick = { () =>  modifyWorker(selected)} /> 
                </form>
            </div>
        )
    }

    const ListOfWorkers = (props) => {
        const workers = props.workers

        if (workers){
            return(
                <div id='workers'>
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
                                selected={worker.id === selected}

                            />)
                    }))}

                </div>
            )
        }
    }

    return (
        <main>
            <br />
            <h1>Lista de Operarios:</h1>
            <br />
            <ListOfWorkers workers={allWorkers}/>

        </main>
    )
}

export default Workers;