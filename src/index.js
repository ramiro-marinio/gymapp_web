import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import FirebaseProvider from './firebase/context';
import DialogProvider from './components/general/dialog/dialogcontext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DialogProvider>
    <FirebaseProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </FirebaseProvider>
  </DialogProvider>
);