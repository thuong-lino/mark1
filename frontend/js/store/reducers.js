import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { customersReducer as customers } from './customers';

export const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    customers,
  });
};
