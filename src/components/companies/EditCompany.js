import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import $ from 'jquery';
import ApiURL from '../../apiClient';
import Paper from 'material-ui/Paper'

const styles = {
  root: {
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

export class EditCompany extends React.Component {

    constructor(props) {
        super(props);
        const id = this.props.match.params.id.valueOf();
        this.state = {
            companyId: id ,
            formData: {
              name: '',
              email: '',
              password: '',
              repeatPassword: '',
            },
            submitted: false,
            errors: '0',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    componentWillMount(){
      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.formData.password) {
              return false;
          }
          return true;
      });

      const companyId = this.state.companyId;
      return $.ajax ({
        url: ApiURL("admin/company/" + companyId),
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function(data){ this.setState({formData: data });}.bind(this)})}


    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit(history) {
      const companyId = this.state.companyId;
      $.ajax ({
        url: ApiURL('admin/company/' + companyId),
        type: "PUT",
        data: JSON.stringify({
          "company": {
          "name": document.getElementById('name').value,
          "email": document.getElementById('email').value}
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
                    floatingLabelText="company Name"
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

                <RaisedButton
                    type="submit"
                    label={
                        (submitted && 'company is being created!')
                        || (!submitted && 'update company')
                    }
                    disabled={submitted}
                />
            </ValidatorForm>
          </Paper>
        );

    }
}
