import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Welcome extends Component {

  constructor(props) {
      super(props);

      this.state = {
        username: ''
      };
  }


  render() {
    return (
      <div>
        <h1>Welcome to the secret admin area</h1>
        <p>
          <Link to='/login'>Login</Link> here</p>
      </div>
    );
  }
}
