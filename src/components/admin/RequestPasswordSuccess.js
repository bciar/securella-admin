import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

export class RequestPasswordSuccess extends Component {

  render() {

    const style = {
      height: 100,
      width: 600,
      margin: 20,
      padding: 40,
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div>
        <Paper style={style} zDepth={1}>
          If your Email is registered, you will receive an email with a link to change your password within the next 15 minutes.
          <br/>
          <b>Please check your inbox.</b>
        </Paper>
      </div>
    );
  }
}
