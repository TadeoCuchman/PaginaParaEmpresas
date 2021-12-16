import React from 'react';
import { useState } from 'react'




const ListOfExpences = (props) => {
    const spends = props.spends
    const [selected, setSelected] = useState(-1)

    console.log(selected)


    if (spends){
    return (
        <ul id='feed'> 
            { spends.map((spend, key) => {
                    return ( <Spend
                        key={key}
                        id={spend.id}
                        tipo_gasto={spend.tipo_gasto}
                        insumo={spend.insumo}
                        id_trabajo={spend.id_trabajo}
                        costo={spend.costo}
                        moneda={spend.moneda}
                        cantidad={spend.cantidad}
                        no_factura={spend.no_factura}
                        rut={spend.rut}
                        proveedor={spend.proveedor}
                        no_de_receta={spend.no_de_receta}
                        descripción={spend.descripción}
                        noches={spend.noches}
                        fecha_entrada={spend.fecha_entrada}
                        fecha_gasto={spend.fecha_gasto}
                        selected={spend.id === selected}
                        setSelected={setSelected}
                        />
                    )
                }) }
        </ul>
    )} else { return [] }
}

const SpendInfo = (props) => {
    const d = new Date(props.fecha_entrada);
    return (
        <div className="spendInfo">
            <button onClick={() => props.setSelected(-1)}>X</button>
            <span>Proveedor: {props.proveedor}</span>
            <br />
            <span>Cantidad: {props.cantidad}</span>
            <br />
            <span>Numero de Factura: {props.no_factura}</span>
            <br />
            <span>RUT: {props.rut}</span>
            <br />
            {props.no_de_receta && 
            <>
            <span>Número de Receta: {props.no_de_receta}</span> 
            <br />
            </>}
            {props.noches && 
            <>
            <span>Número de Receta: {props.noches}</span> 
            <br />
            </>}
            {props.fecha_entrada && 
            <>
            <span>Número de Receta: {d.toUTCString()}</span> 
            <br />
            </>}
            <span>Descripción: {props.descripción}</span>
            <br />
         
        </div>
    )
}

const Spend = (props) => {
    const d = new Date(props.fecha_gasto);

    return (
        <>
            <li className="newSpend" onClick={() => props.setSelected(props.id)} >
                <br />
                <span>{' Ø ' + props.tipo_gasto + ' * ' + props.costo + ' * ' + props.moneda + ' * ' + d.toUTCString()}</span>
            </li>
            {props.selected && <SpendInfo  
                cantidad={props.cantidad}
                no_factura= {props.no_factura}
                rut={props.rut}
                proveedor= {props.proveedor}
                no_de_receta= {props.no_de_receta}
                noches= {props.noches}
                fecha_entrada= {props.fecha_entrada}
                descripción= {props.descripción}
                setSelected= {props.setSelected}
            />}
        </>
    )
}

export default ListOfExpences;
