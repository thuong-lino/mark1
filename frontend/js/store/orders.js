import api from './api';
import { updateObject } from './utils';

const types = {
  GET_ORDERS_START: 'GET_ORDERS_START',
  GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS',
  GET_ORDERS_FAIL: 'GET_ORDERS_FAIL',
};

export const creators = {
  getOrders: () => {
    return async (dispatch) => {
      dispatch({ type: types.GET_ORDERS_START });
      try {
        const res = await api.get('/api/orders/');
        dispatch({ type: types.GET_ORDERS_SUCCESS, orders: res.data });
      } catch (error) {
        dispatch({ type: types.GET_ORDERS_FAIL });
      }
    };
  },
};

const initialState = {
  orders: null,
  error: null,
  loading: false,
};
const dispatchStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const dispatchFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ORDERS_START:
      return dispatchStart(state, action);
    case types.GET_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orders });
    case types.GET_ORDERS_FAIL:
      return dispatchFail(state, action);
    default:
      return state;
  }
};
