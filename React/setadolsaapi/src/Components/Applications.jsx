import React from 'react';
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Applications = (props) => {
  const nodeRef = React.useRef(null)

  const Application = (props) => {
    return (
      <Link to={`${props.to}`} className={`${props.done}`} onClick={() => {
        props.setApplications(false)
    }} > <div> {props.name} </div></Link>
    )
  }
  
  return (
      <div id="applications-popup" onClick={() => {props.setApplications(false)}}>
          <CSSTransition nodeRef={nodeRef} in={true} appear={true} timeout={300} classNames="menu-applications">
            <div ref={nodeRef} id="applications">
              <Application to={'/NewUser'} done='done' name={'Registrar Nuevo Usuario'} setApplications={props.setApplications} />
              <Application to={'/Users'} done='done' name={'Usuarios'} setApplications={props.setApplications} />
              <Application to={'/NewContact'} done='done' name={'Nuevo Contacto'} setApplications={props.setApplications} />
              <Application to={'/NewClient'} done='done' name={'Nuevo Cliente'} setApplications={props.setApplications}/>
              <Application to={'/NewPlace'} done='done' name={'Nueva Planta'} setApplications={props.setApplications} />
              <Application to={'/NewWorker'} done='done' name={'Nuevo Operario'} setApplications={props.setApplications} />
              <Application to={'/NewJob'} done='done' name={' Nuevo Trabajo'} setApplications={props.setApplications} />
              <Application to={'/ChooseJob'} name={'Agregar a Trabajo'} setApplications={props.setApplications} />
              <Application to={'/CloseJob'} name={'Cerrar Trabajo'} setApplications={props.setApplications} />
            </div>
          </CSSTransition>
      </div>
    )


 
}
export default Applications;
