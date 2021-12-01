import React from 'react';
import { useState } from 'react'




const ListOfExpences = (props) => {
    const spends = props.spends
    const [selected, setSelected] = useState(-1)




    if (spends){
    return (
        <ul id='feed'> 
            { spends.map((spend) => {
                    return ( <Spend
                        tipo={spend.tipo}
                        insumo={spend.insumo}
                        trabajo={spend.id_trabajo}
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
                        selected={spend.id === selected}
                        setSelected={setSelected}
                        />
                    )
                }) }
        </ul>
    )} else { return [] }
}

const Spend = (props) => {
    return (
        <li className="newSpend">
            <span>{props.id_trabajo + '-' + props.tipo + '-' + props.costo + '-' + props.moneda}</span>
        </li>
    )
}

export default ListOfExpences;
