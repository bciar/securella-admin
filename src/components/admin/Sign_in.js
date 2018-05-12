import React from 'react';
import Auth from 'j-toker';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import { Link, Redirect } from 'react-router-dom';
import store from '../../store.js';
import {setLoginState} from '../../actions/adminActions.js'



export class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                email: '',
                password: ''
            },
            submitted: false,
            errors: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        document.getElementById("errorLabel").className = 'hidden';
        this.setState({ formData });
    }

    handleSubmit(history) {
        this.setState({ submitted: true }, () => {
          Auth.emailSignIn({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
          })
          .then(function(admin) {
            //eslint-disable-next-line
            history.push('/dashboard');
            store.dispatch(setLoginState(true));
          })
          .fail(res => {
            document.getElementById("errorLabel").className = '';
            this.setState({ submitted: false });
          })
        });
    }

    render() {
        const { formData, submitted } = this.state;
        if (this.props.admin.loggedIn) { return <Redirect to='/dashboard' />; }
        else {
          return (
              <ValidatorForm
                  ref="form"
                  onSubmit={ () => this.handleSubmit(this.props.history) } >
                  <h2>Securella Login</h2>
                  <h3 id="errorLabel" className="hidden"> Email or password wrong</h3>
                  <TextValidator
                      floatingLabelText="Email"
                      onChange={this.handleChange}
                      name="email"
                      id="email"
                      value={formData.email}
                      validators={['required']}
                      errorMessages={['this field is required']}
                  />
                  <br />
                  <TextValidator
                      floatingLabelText="Password"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      id="password"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      value={formData.password}
                  />
                  <br />
                  <RaisedButton
                      type="submit"
                      label={
                          (submitted && 'Processing...')
                          || (!submitted && 'Login')
                      }
                      disabled={submitted}
                  />
                  <p><Link to='/request_password_reset'>forget your password ?!</Link></p>
              </ValidatorForm>

          );
        }
    }
}
