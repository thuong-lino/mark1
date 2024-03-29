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
import { Route, Switch } from 'react-router';

const store = configureStore({});
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SentryBoundary>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/login/" component={Login} />
              <Route>
                {' '}
                <SnackbarProvider>
                  <Layout {...this.props}>
                    <BaseRouter />
                  </Layout>
                </SnackbarProvider>
              </Route>
            </Switch>
          </ConnectedRouter>
        </Provider>
      </SentryBoundary>
    );
  }
}
export default hot(App);
