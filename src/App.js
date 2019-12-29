import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import '~/config/ReactotronConfig';

import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import history from '~/services/history';
import Routes from '~/routes';

import { store, persistor } from '~/store';

import GlobalStyle from '~/styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={2000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
