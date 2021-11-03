import React from 'react';
import { Link } from "react-router-dom";

const NewWorker = () => {
    return (
        <main>
            <br />
            <h1>Nuevo Operario:</h1>
            <br />
            <form method = 'POST' id='form-NewFumi' action="javascript:void(0);">
                <span>Nombre y Appellido:</span>
                <input type="text" placeholder="Nombre y Appellido"/>
                <span>CI:</span>
                <input type="text" placeholder="CI"/>
                <span>Fecha de Nacimiento:</span>
                <input type="date" />
                <span>Dirección:</span>
                <input type="text" placeholder="Dirección"/>
                <span>Celular:</span>
                <input type="text" placeholder="Celular"/>
                <span>Mail:</span>
                <input type="email" placeholder="Mail"/>  
                <span>Alta BPS:</span>
                <input type="date" placeholder="Alta BPS"/>
                <span>Baja BPS:</span>
                <input type="date" />
                <span>Carnet de Salud (vence): </span>
                <input type="date" />
                <span>Capacitaciones:</span>
                <input type="file" />
                <span>Foto:</span>
                <input type="file" />
                <span>Telefono de emergencia:</span>
                <input type="text" placeholder="Telefono de emergencia"/>
                <br />
                <br />
                <input type="submit" value="Ingresar" />
            </form>
        </main>
    )
}

export default NewWorker;