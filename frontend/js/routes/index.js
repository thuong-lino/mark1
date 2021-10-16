import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hoc from '../Hoc';
import Customers from '../pages/Customers';
import CustomersDetails from '../pages/CustomersDetails';
import DailyTransaction from '../pages/DailyTransaction';
import OrderDetail from '../pages/OrderDetail';
import SearchOrder from '../pages/SearchOrder';
import Statements from '../pages/Statements';

const BaseRouter = () => (
  <Hoc>
    <Route component={Customers} path="/customers" />
    <Route component={CustomersDetails} path="/customers/:id" />
    <Route component={DailyTransaction} path="/daily" />
    <Route component={Statements} path="/statements" />
    <Switch>
      <Route component={SearchOrder} exact path="/orders" />
      <Route component={OrderDetail} path="/orders/:id" />
    </Switch>
    <Switch>
      <Route exact path="/customers" component={Customers} />
      <Route path="/customers/:id" component={CustomersDetails} />
    </Switch>
  </Hoc>
);

export default BaseRouter;
