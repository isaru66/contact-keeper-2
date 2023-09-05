import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import axios from 'axios';
import setAuthToken from '../../util/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CONFIG_LOADED,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
    config: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load Config
  const loadConfig = async() => {
    if (!state.config)
    {
      const res = await axios.get("./config.json");
      dispatch({ type: CONFIG_LOADED, payload: res.data });
    }
  };

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get( state.config.BACKENDURL + 'api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ tyep: AUTH_ERROR });
    } 
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post( state.config.BACKENDURL + "api/users",
        formData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post( state.config.BACKENDURL + "api/auth",
        formData,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout User
  const logout = () => dispatch({type: LOGOUT});

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        config: state.config,
        loadConfig,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
