import React from 'react';
import { useState, useEffect} from 'react'

const Contacts = (props) => {

    const [allContacts, setAllContacts] = useState([])
    const [editContactPopup, setEditContactPopUp] = useState(false)
    const [selected, setSelected] = useState(-1)
    

    
    useEffect(() => {
        chargeContacts()
    }, [])
    
    const chargeContacts = async () => {
        try {
            await fetch('http://localhost:3333/contacts/allContacts', {
                method: "GET",
                headers: {
                    "Content-Type" : "application/json",
                    "auth-token" : localStorage.getItem("jwt")
                },
                }).then(response => response.json())
                .then(data => setAllContacts(data.arraycontactsNP.concat(data.arraycontactsClientes, data.arraycontactsPlantas)))
        } catch(err) {
            alert('No conexión con Servidor')
        }
        }

    

    
  
    
    return (
        <main>
            <br />
            <h1>Lista de Contactos:</h1>
            <ListOfContacts contacts={allContacts} setEditContactPopUp={setEditContactPopUp} setSelected={setSelected} selected={selected}/>
            { editContactPopup && 
                <EditPopUp selected={selected} allContacts={allContacts} chargeContacts={chargeContacts} setEditContactPopUp={setEditContactPopUp} />}
                        
        </main>
    )


}

export const ListOfContacts = (props) => {
    const contacts =  props.contacts
    
    if (contacts){
        return(
            <ul id='contacts'>
                { contacts.map(((contact, key) => {
                    return ( <Contact
                        key={key}
                        nombre={contact.nombre}
                        mail={contact.mail}
                        rolPlace={contact.nombre_fantasia}
                        rol={contact.rol}
                        tel={contact.tel}
                        cel={contact.cel}
                        selected={contact.id === props.selected}
                        setSelected={props.setSelected}
                        setEditContactPopUp={props.setEditContactPopUp}
                        id={contact.id}
                        />)
                }))}
            </ul>
        )
    } else { return[] }
}

const Contact = (props) => {
    return (
        <li className="contact" onClick={() => props.setSelected(props.selected ? -1 : props.id)}>
            <h4>Nombre: {props.nombre}</h4>
            <br />
            <span>Mail: {props.mail}</span>
            <br />
            <span>Tel: {props.tel}</span>
            <br />
            <span>Cel: {props.cel}</span>
            <br />
            <span>Lugar de Trabajo: {props.rolPlace ? props.rolPlace :'NO ESPECIFICADO' }</span>
            <br />
            <span>Rol: {props.rol}</span>
            <br />
            {props.selected  && 
                <button onClick={() => props.setEditContactPopUp(true)}>Editar </button>}
        </li>
    )
}

const EditPopUp = (props) => {
    const result = props.allContacts.find(contacts => contacts.id === props.selected)

    const [name, setName] = useState('' || result.nombre)
    const [mail, setMail] = useState('' || result.mail)
    const [tel, setTel] = useState('' || result.tel)
    const [cel, setCel] = useState('' || result.cel)
    const [rol, setRol] = useState('' || result.rol) 
   
    const [workPlace, setWorkPlace] = useState('')
    const [allClients, setAllClients] = useState([])
    const [allPlaces, setAllPlaces] = useState([])
    const [planta_id, setPlanta_id] = useState()
    const [cliente_id, setCliente_id] = useState()


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

    const modifyUser = async (a) => {
        const modifyBody = {
            name,
            cliente_id,
            planta_id,
            mail,
            tel,
            cel,
            rol
        }
        try {
            await fetch(`http://localhost:3333/contacts/${a}`, {
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
                    props.chargeContacts()
                    props.setEditContactPopUp(false)
                })

        } catch (err) {
            alert('Falló el Servidor')
        }
    }
    
    return (
        <div id="editUserPopUpDiv">
            <button onClick={() => props.setEditContactPopUp(false)}>X</button>
            <br />
            <form action="PUT" onSubmit={handleSubmit}>
                <span>Nombre:</span>
                <br />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <br />
                <span>Mail:</span>
                <br />
                <input type="text" value={mail} onChange={(e) => setMail(e.target.value)}/>
                <br />
                <span>Telefono:</span>
                <br />
                <input type="text" value={tel} onChange={(e) => setTel(e.target.value)}/>
                <br />
                <span>Celular:</span>
                <br />
                <input type="text" value={cel} onChange={(e) => setCel(e.target.value)}/>
                <br />
                <span>Lugar de Trabajo:</span>
                <br />
                <br />
                <select onChange={(e) => setWorkPlace(e.target.value) }>
                    <option value="" >Lugar de Trabajo</option>
                    <option value="">No Especificado</option>
                    <option value="Planta">Planta</option>
                    <option value="Cliente">Cliente</option>
                </select>
                <br />
                    { workPlace &&
                    <RenderPLacesOrClients 
                        array={(workPlace === "Cliente") ? allClients : allPlaces} 
                        setCliente_id={setCliente_id}
                        setPlanta_id={setPlanta_id}
                        workPlace={workPlace}
                    />}
                <br />
                <span>Rol:</span>
                <br />
                <input type="text" value={rol} onChange={(e) => setRol(e.target.value)}/>
                <br />
                <br />
                <input type="submit" id="submit" onClick = { () =>  modifyUser(props.selected)} /> 
            </form>
        </div>
    )
} 


const OptionRender = (props) => {
    return (
        <option value={`${props.id}`}> {props.nombre_fantasia} </option>
    )
}

const RenderPLacesOrClients = (props) => {
const array = props.array

return( 
    <select onChange={(e) => { 
        if (props.workPlace === 'Cliente') {
            props.setPlanta_id()
            props.setCliente_id(`${e.target.value}`)
        } else if (props.workPlace === 'Planta'){ 
            props.setCliente_id()
            props.setPlanta_id(`${e.target.value}`)
        } }}>
        <option  value=''>{`Seleccionar ${props.workPlace}:`}</option>
        { array.map((option, key) => {
            return ( <OptionRender 
                nombre_fantasia={option.nombre_fantasia}
                id={option.id}
                key={key}
                />
            )
        })
        }
    </select>)
}

export default Contacts;