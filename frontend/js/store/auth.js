import { fabClasses } from '@mui/material';
import api from './api';
import { updateObject } from './utils';

const types = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
};

export const creators = {
    getLogin: () => {
      return async (email,password) => {
        dispatch({ type: types.LOGIN_START });
        try {
          const res = await api.post('/api/users/');
          const use_info = res.data;
          dispatch({ type: types.LOGIN_SUCCESS, use_info });
        } catch (error) {
          dispatch({ type: types.LOGIN_FAIL});
        }
      };
    }
};

const initialState = {
    email:'',
    password:'',
    submitted: false,
    loading: false,
    error: null,
};

const dispatchStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
  };
  const dispatchFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
  };

  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.LOGIN_START:
        return dispatchStart(state, action);
      case types.LOGIN_SUCCESS:
        return updateObject(state, {  user_info: action.user_info});
      case types.LOGIN_FAIL:
        return dispatchFail(state, action);
     
  
      default:
        return state;
    }
  };

