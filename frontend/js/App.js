import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import Layout from './pages/Layout';

import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});
const App = () => (
  <SentryBoundary>
    <Provider store={store}>
      <Layout />
    </Provider>
  </SentryBoundary>
);

export default hot(App);
