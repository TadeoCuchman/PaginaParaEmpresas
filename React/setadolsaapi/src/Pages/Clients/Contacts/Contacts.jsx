import React from 'react';
import { useState, useEffect} from 'react'
import { Link } from "react-router-dom";

const Contacts = () => {
    const [allContacts, setAllContacts] = useState([])
    const [allContactsClients, setAllContactsClients] = useState([])
    const [allContactsPlaces, setAllContactsPlaces] = useState([])
    const [editContactPopup, setEditContactPopUp] = useState(false)
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        chargeContacts()
    }, [])
    
    const chargeContacts = () => {
        fetch('http://localhost:3333/contacts/allContacts', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            }).then(response => response.json())
            .then(data => {
                setAllContacts(data.arraycontactsNP)
                setAllContactsClients(data.arraycontactsClientes)
                setAllContactsPlaces(data.arraycontactsPlantas)
            })
        }

    const Contact = (props) => {
        return (
            <li className="contact" onClick={() => props.setSelected(props.id)}>
                <h4>Nombre: {props.name}</h4>
                <br />
                <span>Mail: {props.mail}</span>
                <br />
                <span>Tel: {props.tel}</span>
                <br />
                <span>Cel: {props.cel}</span>
                <br />
                <span>Lugar de Trabajo: {props.rolPlace}</span>
                <br />
                <span>Rol: {props.rol}</span>
                <br />
                {props.selected && 
                <button onClick={() => setEditContactPopUp(true)}>Editar</button>}
            </li>
        )
    }

    

    const ListOfContacts = (props) => {
        const contacts =  props.contacts
        
        if (contacts){
            return(
                <div id='contacts'>
                    { contacts.map((contact => {
                        return ( <Contact
                            id={contact.id}
                            name={contact.name}
                            mail={contact.mail}
                            rolPlace={contact.nombre_fantasia}
                            rol={contact.rol}
                            tel={contact.tel}
                            cel={contact.cel}
                            selected={contact.id === selected}
                            setSelected={setSelected}
                            />)
                    }))}
                </div>
            )
        } else { return[] }
    }
    
    return (
        <main>
            <br />
            <h1>Lista de Contactos:</h1>
            <ListOfContacts contacts={allContactsClients} />
            <ListOfContacts contacts={allContactsPlaces} />
            <ListOfContacts contacts={allContacts} />
            
                        
        </main>
    )


}

export default Contacts;