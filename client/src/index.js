import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Authcontext} from './context/Auth'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authcontext> 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Authcontext>
);
