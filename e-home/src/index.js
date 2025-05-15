import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/auth';
import { CartProvider } from './Context/cartHandler';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
   
            <App />
    
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>

);

// Performance monitoring
reportWebVitals();
