import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

import GateKeeper from './components/gatekeeper/GateKeeper'

import Navbar from './components/nav/Navbar'
import Login from './components/users/Login'
import Register from './components/users/Register'
import Calendar from './components/calendar/Calendar'
import Dashboard from './components/users/Dashboard'
import AddCharacter from './components/users/AddCharacter'
import CreateEvent from './components/calendar/CreateEvent'

import {UserContext} from './context/UserContext'

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if(!user){
      const token = GateKeeper()
      if(token){
        setUser({
          token: localStorage.getItem('token'),
          id: token.id,
          username: token.username,
          approved: token.approved,
          createEvent: token.createEvent
        })
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <main>
          <Navbar />
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/addCharacter" component={AddCharacter} />
          <Route exact path="/createEvent" component={CreateEvent} />
        </main>
      </Router>
    </UserContext.Provider>
  );
}

export default App;