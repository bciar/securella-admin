import React, { Component } from 'react';
import $ from 'jquery';
import ApiURL from '../../apiClient';
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

export class Companies extends Component {

  constructor(props) {
      super(props);

      this.state = {
          companyData: []
      };
  }

  componentWillMount() {
    if (!this.props.admin.loggedIn) {
      this.props.history.push('/login');
    }

    return $.ajax ({
      url: ApiURL('admin/companies'),
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function(data) { this.setState({companyData: data}); }.bind(this)
    });
  }

  render() {
    var rows = [];

    this.state.companyData.forEach(function(company) {

      rows.push(
        <TableRow key={company.id}>
          <TableRowColumn>{company.name}</TableRowColumn>
          <TableRowColumn>{company.email}</TableRowColumn>
          <TableRowColumn>{company.guardians.length}</TableRowColumn>
          <TableRowColumn><Link to={{ pathname: "/company/" + company.id }}>show</Link></TableRowColumn>
          <TableRowColumn><Link to={{ pathname: "/company/" + company.id + "/edit"}}>edit</Link></TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div>
        <h3>Manage our security partners!</h3>
        <Paper style={styles.paper}>
        <Table>
          <TableHeader  displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Company</TableHeaderColumn>
              <TableHeaderColumn>Contact</TableHeaderColumn>
              <TableHeaderColumn>Number of guards</TableHeaderColumn>
              <TableHeaderColumn>Edit</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {rows}
          </TableBody>
        </Table>
        </Paper>
        <Paper style={styles.paper}>
        <RaisedButton href="/companies/new" label="Add company" />
        </Paper>
      </div>
    );
  }
}
