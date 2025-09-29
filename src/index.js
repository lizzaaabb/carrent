import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './Header';
import Landing from './Landing';
import Cars from './Cars';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Landing />
    <Cars />
  </React.StrictMode>
);

