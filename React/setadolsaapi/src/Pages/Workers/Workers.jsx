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
            <li className="worker" onClick={() => props.setSelected(props.id)}>
                <img src="" alt="" />
                <h1>Nombre y Apellido: {props.name} </h1>
                <br />
                <span>CI: {props.ci}</span>
                <span>Fecha de Nacimiento: {props.bornDate}</span>
                <span>Dirección: {props.adress}</span>
                <span>Celular: {props.cel}</span>
                <span>Teléfono: {props.tel}</span>
                <span>Mail: {props.mail}</span>
                <span>Alta BPS: {props.altaBps}</span>
                <span>Baja BPS: {props.bajaBps}</span>
                <span>Carnet de Salud (vencimiento): {props.carnetS}</span>
                <span>Teléfono de Emergencia: {props.emergencyTel}</span>
                <button></button>
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

        const modifyUser = async (a) => {
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
                    <input type="submit" id="submit" onClick = { () =>  modifyUser(selected)} /> 
                </form>
            </div>
        )
    }

    const ListOfWorkers = (props) => {
        const workers = props.workers

        if (workers){
            return(
                <div id='workers'>
                    { workers.map((worker => {
                        return (
                            <Worker
                                name={worker.nombre_apellido}
                                ci={worker.ci}
                                bornDate={worker.fecha_de_nacimiento}
                                adress
                                cel
                                tel
                                mail
                                altaBps
                                bajaBps
                                carnetS
                                emergencyTel
                            />)
                    }))}

                </div>
            )
        }
    }

    return (
        <main>
            <canvas></canvas>
        </main>
    )
}

export default Workers;