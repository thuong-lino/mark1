import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hoc from '../Hoc';
import Login from '../pages/Authentication/login-form';
import DailyTransaction from '../pages/DailyTransaction';
import Orders from '../pages/Orders';
import Statements from '../pages/Statements';

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/daily" component={DailyTransaction} />
    <Route path="/statements" component={Statements} />
    <Route path="/orders" component={Orders} />
  </Hoc>
);

export default BaseRouter;
