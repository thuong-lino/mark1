import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import Layout from './pages/Layout';
import BaseRouter from './routes/index';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';
import SentryBoundary from './utils/SentryBoundary';
import Login from './pages/Authentication/login-form';

const store = configureStore({});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
    };
  }
  render() {
    const { authenticated } = this.state;
    return (
      <SentryBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {authenticated ? (
              <Layout {...this.props}>
                <BaseRouter />
              </Layout>
            ) : (
              <Login />
            )}
          </ConnectedRouter>
        </Provider>
      </SentryBoundary>
    );
  }
}
export default hot(App);
