import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Clients = () => {
    const [allClients, setAllClients] = useState([])
    
    
  const chargeClients = () => {
    fetch('http://localhost:3333/clients', {
      method: "GET",
      headers: {
          "Content-Type" : "application/json",
          "auth-token" : localStorage.getItem("jwt")
      },
      }).then(response => response.json())
      .then(data => setAllClients(data.array))
    }
    
    return (
        <main>
            
        </main>
    )

    const ListaOfClients = () => {
        
    }
}

export default Clients;