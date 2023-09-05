import React, { Fragment } from 'react';
import './App.css';
import Navar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './util/setAuthToken'

if(localStorage.token)
  setAuthToken(localStorage.token);

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router basename="/contact-keeper">
            <div className="App">
              <Navar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                  <Route exact path="/about" component={About}></Route>
                  <Route exact path="/register" component={Register}></Route>
                  <Route exact path="/login" component={Login}></Route>
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
