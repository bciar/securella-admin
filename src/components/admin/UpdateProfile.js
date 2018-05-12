import React from 'react';
import Auth from 'j-toker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { ValidatorForm } from 'react-form-validator-core';

export class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            admin: Auth.user,
            formData: {
              name:   Auth.user.name
            },
            submitted: false,
            errors: '0',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      const { formData } = this.state;
      setTimeout(() => {
        formData.name    = Auth.user.name;
        this.setState({ formData });
      }, 600);
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit(history) {
        this.setState({ submitted: true }, () => {
          Auth.updateAccount({
            name:    document.getElementById('name').value,
          })
          .then(function() {
            //eslint-disable-next-line
            history.push('/account');
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
                <h2>Update your account</h2>
                <h3 id="errorLabel" className="hidden">Please fix the shown errors</h3>
                <TextField
                  floatingLabelText="Name"
                  onChange={this.handleChange}
                  name="name"
                  id="name"
                  value={formData.name}
                />
                <br />
                <RaisedButton
                    type="submit"
                    label={
                        (submitted && 'Your account is being updated!')
                        || (!submitted && 'Account updaten')
                    }
                    disabled={submitted}
                />
            </ValidatorForm>

        );

    }
}
