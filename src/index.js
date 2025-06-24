import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './landing-page.tsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);
