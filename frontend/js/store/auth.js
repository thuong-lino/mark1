import api from './api';
import { updateObject } from './utils';
import { push } from 'connected-react-router';

const types = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};
export const creators = {
  getLogin: (email, password) => {
    return async (dispatch) => {
      dispatch({ type: types.LOGIN_START });
      try {
        const res = await api.post('/rest-auth/login/', { email, password });

        const user = {
          key: res.data.key,
          user_id: res.data.user,
          expiry_date: res.data.payload.expiry_date,
          firstname: res.data.payload.firstname,
        };

        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: types.LOGIN_SUCCESS, user });
        dispatch(push('/'));
      } catch (error) {
        dispatch({ type: types.LOGIN_FAIL, error: error });
      }
    };
  },
  doLogout: () => {
    return (dispatch) => {
      localStorage.removeItem('user');
      const res = api.post('/rest-auth/logout/');
      dispatch({ type: types.LOGOUT_SUCCESS });
      dispatch(push('/login/'));
    };
  },
};

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const dispatchStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const dispatchFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
      return dispatchStart(state, action);
    case types.LOGIN_SUCCESS:
      return updateObject(state, { user: action.user, loading: false, error: null });
    case types.LOGIN_FAIL:
      return dispatchFail(state, action);
    case types.LOGOUT_SUCCESS:
      return updateObject(state, action);
    default:
      return state;
  }
};
