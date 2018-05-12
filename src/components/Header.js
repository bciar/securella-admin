import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  appbar: {
    background: '#393'
  }
}

const PublicNavLinks = () => (
  <ToolbarGroup>
    <ToolbarTitle />
    <FlatButton label="Login" containerElement={<Link to='/login'>login</Link>}/>
  </ToolbarGroup>
);

const MyNavLinks = () => (
  <ToolbarGroup>
    <ToolbarTitle />
    <FlatButton label="Dashboard" containerElement={<Link to='/dashboard'>Dashboard</Link>}/>
    <FlatButton label="Companies" containerElement={<Link to='/companies'>Companies</Link>}/>
    <FlatButton label="Profile" containerElement={<Link to='/account'>account</Link>}/>
    <FlatButton label="Logout" containerElement={<Link to='/logout'>logout</Link>}/>
  </ToolbarGroup>
);

const EmptyNavLinks = () => (
  <ToolbarGroup>
    <ToolbarTitle />
  </ToolbarGroup>
);

export class Head extends Component {
  render() {
    if (this.props.app.loaded) {
      if (this.props.admin.loggedIn) {
        return ( <AppBar title="SEON" style={styles.appbar} showMenuIconButton={false} iconElementRight={<MyNavLinks />} /> );
      }
      else {
        return ( <AppBar title="SEON" style={styles.appbar} showMenuIconButton={false} iconElementRight={<PublicNavLinks />} /> );
      }
    }
    else {
      return ( <AppBar title="SEON" style={styles.appbar} showMenuIconButton={false} iconElementRight={<EmptyNavLinks />} /> );
    }
  }

}
