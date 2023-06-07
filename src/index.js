import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
// import ScrollTop from './components/scroll/ScrollTop';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    {/* <ScrollTop /> */}
    <App />
  </BrowserRouter>
);
