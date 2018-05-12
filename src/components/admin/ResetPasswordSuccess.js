import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

export class ResetPasswordSuccess extends Component {

  render() {

    const style = {
      height: 300,
      width: 600,
      margin: 20,
      padding: 40,
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div>
        <Paper style={style} zDepth={1}>
          <h1>You are updated your password</h1>
          <p>
            <Link to='/login'>Login</Link> here now.
          </p>
        </Paper>
      </div>
    );
  }
}
