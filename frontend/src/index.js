import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.css'; // Import global styles

// Get the root element from the HTML file
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React app inside the root element
root.render(
  // Enable client-side routing with BrowserRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
