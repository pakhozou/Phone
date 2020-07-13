import React from 'react';

import Login from './containers/Login'
import {Redirect,Route} from 'react-router-dom'
import Home from './containers/Home'
// import Err404 from './containers/Err404'
import './App.css';


function App() {
  return (
    <div className="App">
      <Route path='/' exact render={()=><Redirect to='/login'/>}/>
      {/*<Route exact from='/' to='/login'/>*/}
      <Route path='/login'  component={Login}/>
      <Route path='/index'  component={Home}/>
    </div>
  );
}

export default App;
