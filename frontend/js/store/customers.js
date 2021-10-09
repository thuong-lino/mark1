import api from './api';
import { updateObject } from './utils';
const types = {
  GET_CUSTOMERS_START: 'GET_CUSTOMERS_START',
  GET_CUSTOMERS_SUCCESS: 'GET_CUSTOMERS_SUCCESS',
  GET_CUSTOMERS_FAIL: 'GET_CUSTOMERS_FAIL',

  GET_TRANSACTIONS_START: 'GET_TRANSACTIONS_START',
  GET_TRANSACTIONS_SUCCESS: 'GET_TRANSACTIONS_SUCCESS',
  GET_TRANSACTIONS_FAIL: 'GET_TRANSACTIONS_FAIL',
};

export const creators = {
  getCustomers: () => {
    return async (dispatch) => {
      dispatch({ type: types.GET_CUSTOMERS_START });
      try {
        const res = await api.get('/api/customers/');
        const customers = res.data;
        dispatch({ type: types.GET_CUSTOMERS_SUCCESS, customers });
      } catch (error) {
        dispatch({ type: types.GET_CUSTOMERS_FAIL });
      }
    };
  },
  getTransactions: () => {
    return async (dispatch) => {
      dispatch({ type: types.GET_TRANSACTIONS_START });
      try {
        const res = await api.get('/api/customers/history/');
        dispatch({ type: types.GET_TRANSACTIONS_SUCCESS, transactions: res.data });
      } catch (error) {
        dispatch({ type: types.GET_TRANSACTIONS_FAIL });
      }
    };
  },
};

const initialState = {
  customers: null,
  transactions: null,
  loading: false,
  error: null,
};
const dispatchStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const dispatchFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CUSTOMERS_START:
      return dispatchStart(state, action);
    case types.GET_CUSTOMERS_SUCCESS:
      return updateObject(state, { customers: action.customers });
    case types.GET_CUSTOMERS_FAIL:
      return dispatchFail(state, action);
    case types.GET_CUSTOMERS_START:
      return dispatchStart(state, action);
    case types.GET_TRANSACTIONS_SUCCESS:
      return updateObject(state, { transactions: action.transactions });
    case types.GET_CUSTOMERS_FAIL:
      return dispatchFail(state, action);
    default:
      return state;
  }
};
