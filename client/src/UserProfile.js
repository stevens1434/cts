import React, { Component } from 'react';
import './App.css';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';
// import MenuIcon from 'material-ui-icons/Menu';
// import Logout from './Logout';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    };
  }

  render() {
    let user = this.props.user;
    console.log('user in userProfile: ', user);
    const AppBarStyle = {
      background: '#ae1936'
      }
    return (
      <div className='container AppBar'>
        <AppBar className='AppBar' style={AppBarStyle} position="fixed">
          <Toolbar>
            <span className='UserName'>
              <p className='UserName' color='inherit'><span className='WelcomeMessage'>Welcome</span>, {user.name}</p>
            </span>
            <Typography type="title" color="inherit" className='MenuTitle'>
              RescueTime
            </Typography>
            <span className='LogoutButton'>
              <Button onClick={this.props.logout} color="inherit">Logout</Button>
            </span>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default UserProfile;
