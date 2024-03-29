import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { customersReducer as customers } from './customers';
import { ordersReducer as orders } from './orders';
import { statementsReducer as statements } from './statements';
import { authReducer as auth } from './auth';

export const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    customers,
    orders,
    statements,
    auth,
  });
};
