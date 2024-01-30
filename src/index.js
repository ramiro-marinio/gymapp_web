import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Provider from './firebase/context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);