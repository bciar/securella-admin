import React, { Component } from 'react';
import $ from 'jquery';
import ApiURL from '../apiClient';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from "react-router-dom";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper: {
      width: '80%',
      margin: 20,
      padding: 40,
      textAlign: 'center',
      display: 'inline-block',
  }
};

export class Dashboard extends Component {

  constructor(props) {
      super(props);

      this.state = {
          messageData: []
      };
  }

  componentWillMount() {
    if (!this.props.admin.loggedIn) {
      this.props.history.push('/login');
    }

    return $.ajax ({
      url: ApiURL('admin/messages'),
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function(data) { this.setState({messageData: data}); }.bind(this)
    });
  }

  render() {
    var rows = [];

    this.state.messageData.forEach(function(message) {
      rows.push(
        <TableRow key={message.id}>
          <TableRowColumn>{message.message}</TableRowColumn>
          <TableRowColumn><Link to={{ pathname: "/company/" + message.id }}>show</Link></TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div>
        <h3>SEON System Messages</h3>
        <Paper style={styles.paper}>
        <RaisedButton href="/companies/new" label="Add company" />
        </Paper>
        <Paper style={styles.paper}>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Alarm</TableHeaderColumn>
              <TableHeaderColumn>Company</TableHeaderColumn>
              <TableHeaderColumn>Guard of guards</TableHeaderColumn>
              <TableHeaderColumn>User</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {rows}
          </TableBody>
        </Table>
        </Paper>
      </div>
    );
  }
}
