import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated, loadConfig } =
    authContext;

  const getConfigData = () => {
    fetch("config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        loadConfig(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getConfigData();

    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credential') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslist-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const { email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary"> Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-black"
        />
      </form>
    </div>
  );
};

export default Login;
