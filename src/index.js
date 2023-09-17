import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
// import ScrollTop from './components/scroll/ScrollTop';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <ScrollTop /> */}
      <App />
    </Provider>
  </BrowserRouter>
);
