import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import Layout from './pages/Layout';
import BaseRouter from './routes/index';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './store';
import SentryBoundary from './utils/SentryBoundary';
import Login from './pages/Authentication/login-form';
import { SnackbarProvider } from 'notistack';
import { Route } from 'react-router';

const store = configureStore({});
class App extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {
      authenticated: false,
    };
=======
>>>>>>> 8a71aa30228ad2d2aa67d1f8ac8c6b855dc0150d
  }
  render() {
    return (
      <SentryBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Route path="/login/" component={Login} />
            <SnackbarProvider>
              <Layout {...this.props}>
                <BaseRouter />
              </Layout>
            </SnackbarProvider>
          </ConnectedRouter>
        </Provider>
      </SentryBoundary>
    );
  }
}
export default hot(App);
