import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Home} from './components/Home.js';
import {Head} from './components/Header.js';
import {connect } from "react-redux";
import { withRouter } from 'react-router'
import Auth from 'j-toker';
import {setLoginState} from './actions/adminActions.js';
import {setLoadState} from './actions/appActions.js';
import './App.css';

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {status: REQUEST}
  }

  componentWillMount() {
    Auth.validateToken()
      .then(function(admin) {
        this.props.setLoginState(true);
        this.props.setLoadState(true);
      }.bind(this))
      .fail(function(partner) {
        this.props.setLoadState(true);
      }
      .bind(this))
    this.setState({status: SUCCESS});
  }

  renderSpinner() {
    return ('Loading...')
  }

  renderApp() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <Head admin={this.props.admin} app={this.props.app} />
        <Home admin={this.props.admin} app={this.props.app} />
      </div>
      </MuiThemeProvider>
    );
  }

  render() {
    return this.state.status === REQUEST ? this.renderSpinner() : this.renderApp()
  }
};

const mapStateToProps = (state) => {
  return {
      admin: state.admin,
      app:   state.app
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLoginState: (loggedInState) => {
            dispatch(setLoginState(loggedInState));
        },
        setLoadState: (loadState) => {
          dispatch(setLoadState(loadState));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
