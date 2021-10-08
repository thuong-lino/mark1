import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import Layout from './pages/Layout';
import BaseRouter from './routes/index';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';
import SentryBoundary from './utils/SentryBoundary';
import '../css/global.css';

const store = configureStore({});
class App extends React.Component {
  render() {
    return (
      <SentryBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <BaseRouter>
              <Layout {...this.props}></Layout>
            </BaseRouter>
          </ConnectedRouter>
        </Provider>
      </SentryBoundary>
    );
  }
}

export default hot(App);
