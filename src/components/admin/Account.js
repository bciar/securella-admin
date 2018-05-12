import React from 'react';
import Auth from 'j-toker';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';

export class Account extends React.Component {

  componentWillMount() {
    if (!this.props.admin.loggedIn) {
      this.props.history.push('/login');
    }
  }

  render() {

    const styles = {
      root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      paper: {
          width: '60%',
          margin: 20,
          padding: 40,
          textAlign: 'center',
          display: 'inline-block',
      },
      gridList: {
        width: '75%',
        cols: 3,
        overflowY: 'auto',
      },
      gridTileLabel: {
        cols: 1
      },
      gridTileValue: {
        cols: 2
      },
    };

    return (
      <div>
        <Paper style={styles.paper} zDepth={1}>
          <div style={styles.root}>
            <GridList cellHeight={30} style={styles.gridList} >
              <GridTile style={styles.gridTileLabel}> Name: </GridTile>
              <GridTile style={styles.gridTileValue}> {Auth.user.name} </GridTile>
            </GridList>
          </div>
          <GridList cellHeight={30} style={styles.gridList} >
            <FlatButton href="/update_profile" label="Update profile" />
            <FlatButton href="/reset_password" label="Change password" />
          </GridList>
        </Paper>
      </div>
    );
  }
}
