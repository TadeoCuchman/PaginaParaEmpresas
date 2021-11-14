import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import './App.css';
import './Components/Nav.css'
import './Components/Aside.css'
import './Components/Footer.css'
import './Components/Main.css'
import './Components/Aplications.css'
import './Pages/Jobs/Fumi/Fumi.css'
import './Pages/Clients/NewClient/NewClient.css'
import './Pages/Places/NewPLace/NewPLace.css'
import './Pages/Clients/Clients.css'
import './Pages/Workers/NewWorker/NewWorker.css'
import './Pages/Users/Users.css'
import './Pages/Clients/Contacts/Contacts.css'
import './Pages/Places/Places.css'

import Nav from './Components/Nav'
import Aside from './Components/Aside'
import Footer from './Components/Footer'
import Main from './Components/Main'
import Applications from './Components/Applications';
import NewClient from './Pages/Clients/NewClient/NewClient';
import NewPlace from './Pages/Places/NewPLace/NewPLace'
import NewJob from './Pages/Jobs/NewJob'
import ChooseFumi from './Pages/Jobs/Fumi/ChooseFumi'
import Fumi from './Pages/Jobs/Fumi/Fumi'
import CloseJob from './Pages/Jobs/CloseJob'
import Clients from './Pages/Clients/Clients'
import Places from './Pages/Places/Places'
import JobsDone from './Pages/Jobs/JobsDone'
import JobsInProcess from './Pages/Jobs/JobsInProcess'
import Stock from './Pages/Stock/Stock'
import Workers from './Pages/Workers/Workers';
import NewWorker from './Pages/Workers/NewWorker/NewWorker'
import MyProfile from './Pages/Users/MyProfile'
import NewUser from './Pages/Users/NewUser'
import Users from './Pages/Users/Users'
import NewContact from './Pages/Clients/Contacts/NewContact'
import Contacts from './Pages/Clients/Contacts/Contacts'
import Spences from './Pages/Jobs/Spences'

function App() {
  const [openAside, setAside] = useState(false);
  const [openApplications, setApplications] = useState(false)
  const [token, setToken] = useState(localStorage.jwt)

  return (
    <div className="App">
      <Router>
        {token &&
        <Nav openAside={openAside} setAside={setAside} openApplications={openApplications} setApplications={setApplications} setToken={setToken} />}
        { openAside && <Aside/> }
        { openApplications && <Applications setApplications={setApplications}/>}
        <Switch>

          {//inicio
          }
          <Route exact path='/'>
            <Main token={token} setToken={setToken}/>
          </Route>

          {//registro y experiencia dentro de la app
          }
          <Route path='/MyProfile'>
            <MyProfile />
          </Route>
          <Route path='/NewUser'>
            <NewUser />
          </Route>
          <Route path='/Users' >
            <Users />
          </Route>

         
          {//agregar a base de datos informacion externa para uno interno
          }
          <Route path='/NewContact'>
            <NewContact />
          </Route>
          <Route path='/Contacts'>
            <Contacts />
          </Route>
          <Route path='/Clients'>
            <Clients />
          </Route>
          <Route path='/NewClient'>
            <NewClient />
          </Route>
          <Route path='/Places'>
            <Places />
          </Route>
          <Route path='/NewPlace'>
            <NewPlace/>
          </Route>
          <Route path='/NewWorker'>
            <NewWorker />
          </Route>
          <Route path='/Workers'>
            <Workers />
          </Route>
         
          {//agregar a base de datos informacion para pedidos en tiempo real
          }
          <Route path='/NewJob'>
            <NewJob />
          </Route>
          <Route path='/CloseJob'>
            <CloseJob />
          </Route>
          <Route path='/JobsDone'>
            <JobsDone />
          </Route>
          <Route path='/JobsInProcess'>
            <JobsInProcess />
          </Route>
          

          {//base de datos al stock y a los gastos totales para informacion en tiempo real y registro
          }
          <Route path='/Spences'>
            <Spences />
          </Route>
          <Route path='/Stock'>
            <Stock />
          </Route>


          {//gestios para fumigaciones
          }

          <Route path='/ChooseFumi'>
            <ChooseFumi/>
          </Route>
          <Route exact path='/Fumi/:id'>
            <Fumi/>
          </Route>


        </Switch>
      
        <Footer /> 
      </Router>
    </div>
  );
}

export default App;
