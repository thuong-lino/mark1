import api from './api';
import { updateObject } from './utils';

const types = {
  GET_STATEMENTS_START: 'GET_STATEMENTS_START',
  GET_STATEMENTS_SUCCESS: 'GET_STATEMENTS_SUCCESS',
  GET_STATEMENTS_FAIL: 'GET_STATEMENTS_FAIL',
};

export const creators = {
  getStatements: (period) => {
    return async (dispatch) => {
      dispatch({ type: types.GET_STATEMENTS_START });
      try {
        const params = period ? '?period=' + period : '';
        const res = await api.get(`/api/statements/${params}`);
        dispatch({ type: types.GET_STATEMENTS_SUCCESS, statements: res.data });
      } catch (error) {
        dispatch({ type: types.GET_STATEMENTS_FAIL });
      }
    };
  },
};

const initialState = {
  statements: null,
  error: null,
  loading: false,
};
const dispatchStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const dispatchFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};
export const statementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATEMENTS_START:
      return dispatchStart(state, action);
    case types.GET_STATEMENTS_SUCCESS:
      return updateObject(state, { statements: action.statements });
    case types.GET_STATEMENTS_FAIL:
      return dispatchFail(state, action);
    default:
      return state;
  }
};
