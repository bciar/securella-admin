import React, { Component } from 'react';
import $ from 'jquery';
import ApiURL from '../../apiClient';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper'

const styles = {
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper: {
      width: '80%',
      margin: 10,
      padding: 20,
      textAlign: 'center',
      display: 'inline-block',
  },
  button: {
      margin: 2,
      padding: 10,
  }
};

export class Company extends Component {

  constructor(props) {
      super(props);

      const id = props.match.params.id.valueOf();

      this.state = {
          companyId: id,
          companyData: {}
      };
  }

  componentWillMount() {
    const companyId = this.state.companyId;

    if (!this.props.admin.loggedIn) {
      this.props.history.push('/login');
    }

    return $.ajax ({
      url: ApiURL("admin/company/" + companyId),
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function(data) { this.setState({companyData: data}); }.bind(this)
    });
  }

  render() {
    return (
      <div>
      <Paper style={styles.paper} zDepth={2}>
        <div style={styles.root}>
          <GridList cellHeight={30} style={styles.gridList} >
            <GridTile style={styles.gridTileLabel}> Name: </GridTile>
            <GridTile style={styles.gridTileValue}> {this.state.companyData.name} </GridTile>
            <GridTile style={styles.gridTileLabel}> Email: </GridTile>
            <GridTile style={styles.gridTileValue}> {this.state.companyData.email} </GridTile>
          </GridList>
        </div>
      </Paper>
      </div>
    );
  }
}
