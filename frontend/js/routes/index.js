import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hoc from '../Hoc';
import Login from '../pages/Authentication/login-form';
import DailyTransaction from '../pages/DailyTransaction';

const BaseRouter = () => (
  <Hoc>
    <Switch>
      <Route path="/daily" component={DailyTransaction} />
      <Route path="/login" component={Login} />
    </Switch>
  </Hoc>
);

export default BaseRouter;
