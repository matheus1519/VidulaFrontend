import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';
import { MyThemeProvider } from './hooks/Theme';

import './config/ReactotronConfig';
import { store, persistor } from './store';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <MyThemeProvider>
            <Routes />
            <GlobalStyle />
            <ToastContainer position="bottom-right" transition={Zoom} />
          </MyThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
