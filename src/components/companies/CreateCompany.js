import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import $ from 'jquery';
import ApiURL from '../../apiClient';

import Paper from 'material-ui/Paper'

const styles = {
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper: {
      width: '60%',
      margin: 20,
      padding: 40,
      textAlign: 'center',
      display: 'inline-block',
  }
};

export class CreateCompany extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
              name: 'Test CO',
              email: 'test@example.com',
              password: '111222333',
              repeatPassword: '111222333',
              // name: '',
              // email: '',
              // password: '',
              // repeatPassword: '',
            },
            submitted: false,
            errors: '0',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.formData.password) {
                return false;
            }
            return true;
        });
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit(history) {
      $.ajax ({
        url: ApiURL('/admin/create_company'),
        type: "POST",
        data: JSON.stringify({
          "company": {
          "name": document.getElementById('name').value,
          "email": document.getElementById('email').value,
          "password": document.getElementById('password').value,
          "password_confirmation": document.getElementById('password_confirmation').value}
        }),
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
          //eslint-disable-next-line
          this.props.history.push('/companies');
        }.bind(this),
        error: function(){
          document.getElementById("errorLabel").className = '';
          this.setState({ submitted: false });
       }.bind(this)
      });
        // this.setState({ submitted: true }, () => {
        //   Auth.emailSignUp({
        //     email: document.getElementById('email').value,
        //     password: document.getElementById('password').value,
        //     password_confirmation: document.getElementById('password_confirmation').value
        //   })
        //   .then(function() {
        //     //eslint-disable-next-line
        //     history.push('/verify');
        //   })
        //   .fail(res => {
        //     document.getElementById("errorLabel").className = '';
        //     this.setState({ submitted: false });
        //   })
        // });
    }

    render() {
        const { formData, submitted } = this.state;
        return (
          <Paper style={styles.paper}>
            <ValidatorForm
                ref="form"
                onSubmit={ () => this.handleSubmit(this.props.history) } >
                <h2>Register a new company</h2>
                <h3 id="errorLabel" className="hidden"> Email vergeben oder Password zu kurz (min. 8 Zeichen)</h3>
                <TextValidator
                    floatingLabelText="Company Name"
                    onChange={this.handleChange}
                    name="name"
                    id="name"
                    value={formData.name}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <TextValidator
                    floatingLabelText="Email"
                    onChange={this.handleChange}
                    name="email"
                    id="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
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
                <TextValidator
                    floatingLabelText="Repeat password"
                    onChange={this.handleChange}
                    name="repeatPassword"
                    type="password"
                    id="password_confirmation"
                    validators={['isPasswordMatch', 'required']}
                    errorMessages={['password mismatch', 'this field is required']}
                    value={formData.repeatPassword}
                />
                <br />
                <p>
                <RaisedButton
                    type="submit"
                    label={
                        (submitted && 'Company is being created!')
                        || (!submitted && 'Create company')
                    }
                    disabled={submitted}
                /></p>
            </ValidatorForm>
          </Paper>
        );

    }
}
