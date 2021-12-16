import React from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'


const Aside = () => {
  const nodeRef = React.useRef(null)


    return (
      <CSSTransition nodeRef={nodeRef} in={true} appear={true} timeout={2000} classNames="asideStyle">
        <aside>
            <div className="navSpace"></div>
            
            <div className="profilAside">
                <span id='profilname'>{localStorage.alias}</span>
                
            </div>
            
            <div className='midAside'>
              <AsideLinks />
            </div>
        
            <div className="navSpace"></div>

        </aside>
      </CSSTransition >
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
            <AsideLi to='Trabajos'>
              <AsideLink to='Trabajos en proceso' goto='/JobsInProcess'/>
              <AsideLink to='Trabajos terminados' goto='/ClosedJobs'/>
              <AsideLink to='Trabajos facturados' goto='/FinishedJobs'/>
            </AsideLi>
            <AsideLink to='Info' goto='/Info'></AsideLink>
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