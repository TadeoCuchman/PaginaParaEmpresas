import React from 'react';
import { useState } from 'react'

import { useParams } from 'react-router-dom'


const Spent = (props) => {
    return (
        <div className="newSpend">

        </div>
    )
}

const ListOfExpences = (props) => {
    const spents = props.spents
    const [selected, setSelected] = useState(-1)
    if (spents){
    return (
        <div id='feed'> 
            { spents.map((spent) => {
                    return ( <Spent
                        tipo={spent.tipo}
                        insumo={spent.insumo}
                        costo={spent.costo}
                        cantidad={spent.cantidad}
                        no_factura={spent.no_factura}
                        rut={spent.rut}
                        proveedor={spent.proveedor}
                        no_de_receta={spent.no_de_receta}
                        descripción={spent.descripción}
                        noches={spent.noches}
                        fecha_entrada={spent.fecha_entrada}
                        selected={spent.id === selected}
                        setSelected={setSelected}
                        />
                    )
                }) }
        </div>
    )} else { return [] }
}

export default ListOfExpences;
