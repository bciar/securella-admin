import React from 'react';
import Auth from 'j-toker';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';


export class ResetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                password: '',
                repeatPassword: '',
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
        document.getElementById("errorLabel").className = 'hidden';
        this.setState({ formData });
    }

    handleSubmit(history) {
        this.setState({ submitted: true }, () => {
          Auth.updatePassword({
            password: document.getElementById('password').value,
            password_confirmation: document.getElementById('password_confirmation').value
          })
          .then(function() {
            //eslint-disable-next-line
            history.push('/reset_password_success');
          })
          .fail(res => {
            document.getElementById("errorLabel").className = '';
            this.setState({ submitted: false });
          })
        });
    }

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={ () => this.handleSubmit(this.props.history) } >
                <h2>Passwort updaten</h2>
                <h3 id="errorLabel" className="hidden"> Password zu kurz (min. 8 Zeichen)</h3>
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
                <RaisedButton
                    type="submit"
                    label={
                        (submitted && 'Updating your password!')
                        || (!submitted && 'Passwort updaten')
                    }
                    disabled={submitted}
                />
            </ValidatorForm>

        );

    }
}
