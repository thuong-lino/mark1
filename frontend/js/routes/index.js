import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hoc from '../Hoc';
import DailyTransaction from '../pages/DailyTransaction';
import OrderStatus from '../pages/OrderStatus';
import Statements from '../pages/Statements';

const BaseRouter = () => (
  <Hoc>
    <Route path="/daily" component={DailyTransaction} />
    <Route path="/statements" component={Statements} />
    <Route path="/orders" component={OrderStatus} />
  </Hoc>
);

export default BaseRouter;
