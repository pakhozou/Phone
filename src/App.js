import React from 'react';

import {Route,Redirect} from 'react-router-dom'

import Login from './containers/Login'

import Home from './containers/Home'

import './App.css';


function App() {
  return (
    <div className="App">
      <Route path='/' exact render={()=><Redirect to='/login'/>}/>
      <Route path='/login' component={Login}/>
      <Route path='/index' component={Home}/>
    </div>
  );
}

export default App;
