import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './app/store';
// import ScrollTop from './components/scroll/ScrollTop';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ScrollTop /> */}
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
