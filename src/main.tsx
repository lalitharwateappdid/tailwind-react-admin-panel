import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import Tailwind from 'primereact/passthrough/tailwind';
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
      <PrimeReactProvider value={{ unstyled:true, pt:Tailwind }}>
    <Router>
      <App />
    </Router>
    </PrimeReactProvider>
  </React.StrictMode>,
);
