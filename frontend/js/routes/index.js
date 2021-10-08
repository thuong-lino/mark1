import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hoc from '../Hoc';
import Login from '../pages/Authentication/login-form';
import Layout from '../pages/Layout';

const BaseRouter = () => (
  <Hoc>
    <Switch>
      <Route exact path="/" component={Layout} />
      <Route path="/login/" component={Login} />
    </Switch>
  </Hoc>
);

export default BaseRouter;
