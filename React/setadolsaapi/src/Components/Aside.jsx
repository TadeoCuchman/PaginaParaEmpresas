import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'


const Aside = () => {
    return (
        <aside>
            <div className="navSpace"></div>
            
            <div className="profilAside">
                <span id='profilname'>Usuario</span>
            </div>
            
            <div className='midAside'>
              <AsideLinks />
            </div>
        
            <div className="navSpace"></div>

        </aside>
    )
}
    const AsideLinks = (props) => {
        return (
          <ul className="linksAside">
            <AsideLink to='Contactos' goto='./Contacts'/>
            <AsideLink to='Clientes' goto='/Clients'/>
            <AsideLink to='Plantas' goto='/Places'/>
            <AsideLink to='Operarios' goto='/Workers' />
            <AsideLink to='Stock' goto='/Stock' />
            <AsideLi to='Trabajos'><AsideLink to='Trabajos en proceso' goto='/JobsInProcess'/><AsideLink to='Trabajos terminados' goto='/JobsDone'/></AsideLi>
          </ul>
        )
      }
    
    const AsideLi = (props) => {
        const [open, cambiarOpen] = useState(false)

        return (
            <>
            <li className="asideLi" onClick = {() => {
                cambiarOpen(!open)
                setTimeout(() => { cambiarOpen(false)}, 30000)
            }}>∞{props.to}</li>
            {open && props.children}
            </>
        )
    }

    const AsideLink = (props) => {
        return (
          <Link className='asideLink' to={props.goto}>
            <li>∞{props.to}</li>
          </Link>)
      }


export default Aside;