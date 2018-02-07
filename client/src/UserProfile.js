import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
import Dashboard from './Dashboard';
import MyManagement from './MyManagement';

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      menu: false,
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.userLink = this.userLink.bind(this);
  }

  handleClick = event => {
    if (this.state.anchorEl === null) {
      this.setState({ anchorEl: event.currentTarget });
    } else {
      this.setState({ anchorEl: null });
    }
  };

  userLink(userId) {
    // return `/${userId}`
    return `/mycompanies`
  }

  render() {
    let name = this.props.name;
    let user = this.props.user;
    let Id = this.props.user.id
    // console.log('name: ', name);
    console.log('user in userProfile: ', user.id);
    const AppBarStyle = {
      background: '#ae1936'
      }
    const { anchorEl } = this.state;
    let hamburger = 'http://houstoncreativesmiles.com/wp-content/themes/ss3/assets/css/hamburger.png';
    let menu = this.state.menu;
    return (
      <div className='container AppBar'>
        <AppBar className='AppBar' style={AppBarStyle} position="fixed">
          <Toolbar>
            <IconButton
              onClick={this.handleClick}
              className='hamburgerHolder'
              color="inherit"
              aria-haspopup="true"
              aria-owns={anchorEl ? 'menu' : null}
            >
              <img className='hamburger' src={hamburger} alt='menu'></img>
            </IconButton>
            <div>
              <Menu
                className='menu'
                anchorEl={this.state.anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClick}
                style={{position: 'absolute', top: '49px'}}
              >
                <MenuItem className='App'>
                  <a href="/"> Dashboard </a>
                </MenuItem>
                <MenuItem className='App'>
                  <li><Link to={this.userLink(Id)} params={{Id}} title='My Companies'>My Cos</Link></li>
                </MenuItem>
                <MenuItem className='App'>
                  <a href={this.userLink(user.id)}>My Companies</a>
                </MenuItem>
                <MenuItem className='menuItem' onClick={this.handleClick}>
                  Other
                </MenuItem>
              </Menu>
            </div>
            <span className='UserName'>
              <p className='UserName' color='inherit'><span className='WelcomeMessage'>Welcome</span>, {name.firstName} {name.lastName}</p>
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
