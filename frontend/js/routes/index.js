import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hoc from '../Hoc';
import DailyTransaction from '../pages/DailyTransaction';
import OrderDetail from '../pages/OrderDetail';
import OrderStatus from '../pages/OrderStatus';
import Statements from '../pages/Statements';

const BaseRouter = () => (
  <Hoc>
    <Route path="/daily" component={DailyTransaction} />
    <Route path="/statements" component={Statements} />
    <Switch>
      <Route exact path="/orders" component={OrderStatus} />
      <Route path="/orders/:id" component={OrderDetail} />
    </Switch>
  </Hoc>
);

export default BaseRouter;
