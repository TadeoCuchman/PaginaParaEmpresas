import React from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'
import unknown from '../photos/unknown.jpg'


const Aside = (props) => {
  const nodeRef = React.useRef(null)


    return (
      <CSSTransition nodeRef={nodeRef} in={true} appear={true} timeout={200} unmountOnExit classNames="asideStyle">
        <aside>
            <div className="navSpace"></div>
            
            <div className="profilAside">
                <Link to='/MyProfile'><span id='profilname'>{localStorage.alias}</span></Link>
                <img id='profilphoto' src={unknown} alt="default profile photo" />
            </div>
            
            <div className='midAside'>
              <AsideLinks rol={props.rol}/>
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
            {props.rol == 'admin' &&
            <AsideLink to='Operarios' goto='/Workers' />}
            <AsideLink to='Stock' goto='/Stock' />
            {props.rol == 'admin' &&
            <AsideLink to='Info' goto='/Info'></AsideLink>}
            {props.rol == 'admin' &&
            <AsideLink to='Gastos' goto='/Spences'></AsideLink>}
            <AsideLi to='Trabajos'>
              <AsideLink to='Trabajos en proceso' goto='/JobsInProcess'/>
              {props.rol == 'admin' &&
              <AsideLink to='Trabajos terminados' goto='/ClosedJobs'/>}
              {props.rol == 'admin' &&
              <AsideLink to='Trabajos facturados' goto='/FinishedJobs'/>}
            </AsideLi>
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
            }}>{open ? ' vv ' : ' ∞ '}{props.to}</li>
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