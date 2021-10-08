import api from './api';
import { updateObject } from './utils';
const types = {
  GET_CUSTOMERS_START: 'GET_CUSTOMERS_START',
  GET_CUSTOMERS_SUCCESS: 'GET_CUSTOMERS_SUCCESS',
  GET_CUSTOMERS_FAIL: 'GET_CUSTOMERS_FAIL',
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
};

const initialState = {
  loading: false,
  error: null,
  customers: null,
};
const dispatchStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const dispatchFaild = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CUSTOMERS_START:
      return dispatchStart(state, action);
    case types.GET_CUSTOMERS_SUCCESS:
      return updateObject(state, { customers: action.customers });
    case types.GET_CUSTOMERS_FAIL:
      return dispatchFaild(state, action);
    default:
      return state;
  }
};
