import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.min.css'   //引入antd.css

import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from  'mobx-react'
import store from './store/index'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider {...store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
