import React from 'react';

const Settings = () => {
    
    //falta implementar todos los settings que estan abajo (cambio de foto, resetear Email, Nueva constraseña, nuevo alias)

    return (
           <main id='mainSettings'>
                <br />
                <h1>Configuraciones:</h1>
                <br />
                
                <div id='newMail'>
                    <br/>
                    <span>Nuevo Mail</span>
                    <br />
                    <br/>
                    <span>Nuevo mail:</span>
                    <input type="email" />
                    <br/>
                    <span>Contraseña:</span>
                    <input type="password"/>
                    <br/>
                    <button>Cambiar</button>
                    <br/>
                </div>
               
           
                <div id='newPhoto'>
                    <br/>
                    <span>Nueva Foto de Perfil</span>
                    <br />
                    <br/>
                    <input type="image" src="submit.gif" alt="Submit" width="48" height="48" />
                    <br/>
                    <button>Cambiar</button>
                    <br/>
                </div>
             
  
                <div id='newPassWord'>
                    <br/>
                    <span>Nueva Contraseña</span>
                    <br />
                    <br/>
                    <span> Contraseña Actual:</span>
                    <br />
                    <input type="password" />
                    <br />
                    <span> Nueva Contraseña:</span>
                    <br />
                    <input type="password" />
                    <br />
                    <span> Repita Nueva Contraseña:</span>
                    <br />
                    <input type="password" />
                    <br/>
                    <button>Cambiar</button>
                    <br/>
                </div>
     
                <div id='newAlias'>
                    <br/>
                    <span>Nuevo Alias</span>
                    <br/>
                    <input type='text' />
                    <br/>
                    <button>Cambiar</button>
                    <br/>
                </div>
                <br />
                    

           </main>
        );
}

export default Settings;