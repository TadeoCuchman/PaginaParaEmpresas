import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import './App.css';
import './Components/Nav.css'
import './Components/Aside.css'
import './Components/Footer.css'
import './Components/Aplications.css'
import './Pages/Main.css'
import './Pages/Jobs/Job.css'
import './Pages/Clients/NewClient/NewClient.css'
import './Pages/Places/NewPLace/NewPLace.css'
import './Pages/Clients/Clients.css'
import './Pages/Workers/NewWorker/NewWorker.css'
import './Pages/Users/Users.css'
import './Pages/Clients/Contacts/Contacts.css'
import './Pages/Places/Places.css'
import './Pages/Workers/Workers.css'
import './Components/Spiner.css'
import './Components/Settings.css'

import Nav from './Components/Nav'
import Aside from './Components/Aside'
import Footer from './Components/Footer'
import Main from './Pages/Main'
import Applications from './Components/Applications';
import NewClient from './Pages/Clients/NewClient/NewClient';
import NewPlace from './Pages/Places/NewPLace/NewPLace'
import NewJob from './Pages/Jobs/NewJob'
import ChooseJob from './Pages/Jobs//ChooseJob'
import Job from './Pages/Jobs/Job'
import CloseJob from './Pages/Jobs/CloseJob'
import Clients from './Pages/Clients/Clients'
import Places from './Pages/Places/Places'
import ClosedJobs from './Pages/Jobs/Views/ClosedJobs'
import FinishedJobs from './Pages/Jobs/Views/FinishedJobs'
import JobsInProcess from './Pages/Jobs/Views/JobsInProcess'
import FinishJob from './Pages/Jobs/FinishJob'
import Stock from './Pages/Stock/Stock'
import Workers from './Pages/Workers/Workers';
import NewWorker from './Pages/Workers/NewWorker/NewWorker'
import MyProfile from './Pages/Users/MyProfile'
import NewUser from './Pages/Users/NewUser'
import Users from './Pages/Users/Users'
import NewContact from './Pages/Clients/Contacts/NewContact'
import Contacts from './Pages/Clients/Contacts/Contacts'
import Spences from './Pages/Info/Spences'
import Info from './Pages/Info/Info'
import Settings from './Components/Settings'

if (typeof window.ethereum.autoRefreshOnNetworkChange !== "undefined") {
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function App() {
  const [openAside, setAside] = useState(false);
  const [openApplications, setApplications] = useState(false)
  const [token, setToken] = useState('')
  const [rol, setRol] = useState('')

  return (
    <div className="App">
      <Router>
        
        <Nav openAside={openAside} setAside={setAside} openApplications={openApplications} setApplications={setApplications} setToken={setToken} token={token} rol={rol}/>
        { openAside && <Aside rol={rol}/> }
        { openApplications && <Applications rol={rol} setApplications={setApplications}/>}
        <Switch>

          {//inicio
          }
          <Route exact path='/'>
            <Main token={token} rol={rol} setToken={setToken} setRol={setRol}/>
          </Route>

          {//registro y experiencia dentro de la app
          }
          <Route path='/MyProfile'>
            <MyProfile />
          </Route>
          {rol == 'admin' &&
          <Route path='/NewUser'>
            <NewUser />
          </Route>}
          {rol == 'admin' &&
          <Route path='/Users' >
            <Users />
          </Route>}
          <Route path='/Settings' >
            <Settings />
          </Route>

         
          {//agregar a base de datos informacion externa para uno interno
          }
          {rol == 'admin' &&
          <Route path='/NewContact'>
            <NewContact />
          </Route>}
          <Route path='/Contacts'>
            <Contacts />
          </Route>
          <Route path='/Clients'>
            <Clients />
          </Route>
          {rol == 'admin' &&
          <Route path='/NewClient'>
            <NewClient />
          </Route>}
          {rol == 'admin' &&
          <Route path='/NewPlace'>
            <NewPlace/>
          </Route>}
          {rol == 'admin' &&
          <Route path='/NewWorker'>
            <NewWorker />
          </Route>}
          <Route path='/Places'>
            <Places />
          </Route>
          {rol == 'admin' &&
          <Route path='/Workers'>
            <Workers />
          </Route>}
         
          {//agregar a base de datos informacion para pedidos en tiempo real
          }
          {rol == 'admin' &&
          <Route path='/NewJob'>
            <NewJob />
          </Route>}
          <Route path='/ChooseJob'>
            <ChooseJob />
          </Route>
          <Route exact path='/Job/:id'>
            <Job />
          </Route>
          <Route path='/JobsInProcess'>
            <JobsInProcess />
          </Route>
          {rol == 'admin' &&
          <Route path='/CloseJob'>
            <CloseJob />
          </Route>}
          {rol == 'admin' &&
          <Route path='/ClosedJobs'>
            <ClosedJobs />
          </Route>}
          {rol == 'admin' &&
          <Route path='/FinishJob'>
            <FinishJob />
          </Route>}
          {rol == 'admin' &&
          <Route path='/FinishedJobs'>
            <FinishedJobs />
          </Route>}
          

          {//base de datos al stock y a los gastos totales para informacion en tiempo real y registro
          }
          {rol == 'admin' &&
          <Route path='/Spences'>
            <Spences />
          </Route>}
          <Route path='/Stock'>
            <Stock />
          </Route>

          {//Consumo, c??lculo y visualizaci??n de datos
          }
          {rol == 'admin' &&
          <Route path='/Info'>
            <Info />
          </Route>}

        </Switch>
      
        <Footer /> 
      </Router>
    </div>
  );
}

export default App;
