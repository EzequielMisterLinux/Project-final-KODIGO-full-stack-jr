import React from 'react';
import ReactDOM from 'react-dom/client';
import FormLogin from './components/FormLogin';
import '../css/app.css';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <FormLogin /> 
  </React.StrictMode>
);