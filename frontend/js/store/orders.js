import api from './api';
import { updateObject } from './utils';

const types = {
  GET_ORDERS_START: 'GET_ORDERS_START',
  GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS',
  GET_ORDERS_FAIL: 'GET_ORDERS_FAIL',

  ADD_ORDER_START: 'ADD_ORDER_START',
  ADD_ORDER_SUCCESS: 'ADD_ORDER_SUCCESS',
  ADD_ORDER_FAIL: 'ADD_ORDER_FAIL',
};

export const creators = {
  getOrders: (period = null) => {
    return async (dispatch) => {
      dispatch({ type: types.GET_ORDERS_START });
      try {
        const res = await api.get(`/api/orders/?period=${period}`);
        dispatch({ type: types.GET_ORDERS_SUCCESS, orders: res.data });
      } catch (error) {
        dispatch({ type: types.GET_ORDERS_FAIL, error: error.response.data });
      }
    };
  },
  addOrder: (order) => {
    return async (dispatch) => {
      dispatch({ type: types.ADD_ORDER_START });
      try {
        const res = await api.post(`/api/orders/`, order);

        dispatch({ type: types.ADD_ORDER_SUCCESS, orders: res.data });
      } catch (error) {
        dispatch({ type: types.ADD_ORDER_FAIL, error: error.response.data });
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
    case types.ADD_ORDER_START:
      return dispatchStart(state, action);
    case types.ADD_ORDER_SUCCESS:
      return updateObject(state, { orders: action.orders });
    case types.ADD_ORDER_FAIL:
      return dispatchFail(state, action);

    default:
      return state;
  }
};
