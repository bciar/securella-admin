import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import store from "./store.js"
import $ from 'jquery'
import { Provider } from 'react-redux'

var Auth = require('j-toker');

let backendHost;
const hostname = window && window.location && window.location.hostname;

if(hostname === 'admin.securella.com') {
  backendHost = 'http://api.securella.com';
} else if(hostname === 'admin.staging.securella.com') {
  backendHost = 'http://api.staging.securella.com';
} else {
  backendHost = 'http://127.0.0.1:3000';
}

const apiVersion = 'v1';
const API_ROOT = `${backendHost}/api/${apiVersion}`;

Auth.configure({
  apiUrl:                 API_ROOT,
  signOutPath:           '/admin/sign_out',
  emailSignInPath:       '/admin/sign_in',
  emailRegistrationPath: '/admin',
  accountUpdatePath:     '/admin',
  accountDeletePath:     '/admin',
  passwordResetPath:     '/admin/password',
  passwordUpdatePath:    '/admin/password',
  tokenValidationPath:   '/admin/validate_token',
  confirmationSuccessUrl:  function() {
  return `${process.env.REACT_APP_URL}/confirm`;
  }
});

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    Auth.appendAuthHeaders(xhr, settings);
  }
});

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App store={store}/>
  </BrowserRouter>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
