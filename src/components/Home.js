import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import {Welcome} from './Welcome.js';
import {Dashboard} from './Dashboard.js';

import {Company} from './companies/Company.js'
import {EditCompany} from './companies/EditCompany.js'
import {Companies} from './companies/Companies.js';
import {CreateCompany} from './companies/CreateCompany.js';

import {SignIn} from './admin/Sign_in.js';
import {SignOut} from './admin/Sign_out.js';

import {RequestPasswordReset}   from './admin/RequestPasswordReset.js';
import {RequestPasswordSuccess} from './admin/RequestPasswordSuccess.js';
import {ResetPassword}          from './admin/ResetPassword.js';
import {ResetPasswordSuccess}   from './admin/ResetPasswordSuccess.js';
import {Account}       from './admin/Account.js';
import {UpdateProfile} from './admin/UpdateProfile.js';

export class Home extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/'               render={(props) => ( <Welcome   {...props} admin={this.props.admin}  app={this.props.app} /> )} />
          <Route exact path='/dashboard'      render={(props) => ( <Dashboard {...props} admin={this.props.admin}  app={this.props.app} /> )} />
          <Route exact path='/companies'      render={(props) => ( <Companies     {...props} admin={this.props.admin}  app={this.props.app} /> )} />
          <Route exact path='/companies/new'  render={(props) => ( <CreateCompany {...props} admin={this.props.admin}  app={this.props.app} /> )} />

          <Route exact path={"/company/:id"}      render={(props) => ( <Company     {...props} admin={this.props.admin} app={this.props.app} /> )} />
          <Route exact path={"/company/:id/edit"} render={(props) => ( <EditCompany {...props} admin={this.props.admin} app={this.props.app} /> )} />

          <Route exact path='/login'          render={(props) => ( <SignIn  {...props} admin={this.props.admin}  app={this.props.app} /> )} />
          <Route exact path='/logout'         render={(props) => ( <SignOut {...props} admin={this.props.admin}  app={this.props.app} /> )} />

          <Route exact path='/request_password_reset'   render={(props) => ( <RequestPasswordReset   {...props} admin={this.props.admin}  app={this.props.app} /> )} />
          <Route exact path='/request_password_success' render={(props) => ( <RequestPasswordSuccess {...props} admin={this.props.admin}  app={this.props.app} /> )} />
          <Route exact path='/reset_password'           render={(props) => ( <ResetPassword          {...props} admin={this.props.admin}  app={this.props.app} /> )} />
          <Route exact path='/reset_password_success'   render={(props) => ( <ResetPasswordSuccess   {...props} admin={this.props.admin}  app={this.props.app} /> )} />

          <Route exact path='/account'        render={(props) => ( <Account        {...props} admin={this.props.admin}  app={this.props.app} /> )} />
          <Route exact path='/update_profile' render={(props) => ( <UpdateProfile  {...props} admin={this.props.admin}  app={this.props.app} /> )} />
        </Switch>
      </div>
    );
  }
}
