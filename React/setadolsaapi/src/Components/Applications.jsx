import React from 'react';
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Applications = (props) => {
  
  const Application = (props) => {
    return (
      <Link to={`${props.to}`} className={`${props.done}`} onClick={() => {
        props.setApplications(false)
    }} > <div> {props.name} </div></Link>
    )
  }
  
  return (
      <div id="applications-popup">
          <CSSTransition in={true} appear={true} timeout={300} classNames="menu-applications">
            <div id="applications">
              <Application to={'/NewUser'} done='done' name={'Registrar Nuevo Usuario'} setApplications={props.setApplications} />
              <Application to={'/Users'} done='done' name={'Usuarios'} setApplications={props.setApplications} />
              <Application to={'/NewContact'} done='done' name={'Nuevo Contacto'} setApplications={props.setApplications} />
              <Application to={'/Contacts'} name={'Contactos'} setApplications={props.setApplications} />
              <Application to={'/NewClient'} name={'Nuevo Cliente'} setApplications={props.setApplications}/>
              <Application to={'/NewPlace'} name={'Nueva Planta'} setApplications={props.setApplications} />
              <Application to={'/NewWorker'} name={'Nuevo Operario'} setApplications={props.setApplications} />
              <Application to={'/NewFumi'} name={' Nueva Fumigación'} setApplications={props.setApplications} />
              <Application to={'/ChooseFumi'} name={'Agregar a Fumigación'} setApplications={props.setApplications} />
              <Application to={'/CloseJob'} name={'Cerrar Trabajo'} setApplications={props.setApplications} />
            </div>
          </CSSTransition>
      </div>
    )


 
}
export default Applications;
