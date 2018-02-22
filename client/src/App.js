import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import axios from 'axios';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Signup from './Signup';
import Login from './Login';
import UserProfile from './UserProfile';
import CtsMain from './CtsMain';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createMuiTheme } from 'material-ui/styles';

const muiTheme = createMuiTheme({
    palette: {
      type: 'light'
    }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: {},
      name: {},
      roles: {},
      userData: {}
    }
    this.change = this.change.bind(this);
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logout = this.logout.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  change() {
    // console.log('state: ', this.state);
  }

  liftTokenToState(data) {
    // console.log('________DATA_______ IN liftTOkenToState(data): ', data);
    this.setState({token: data.token, roles: data.roles, user: data.user})
  }

  logout() {
    localStorage.removeItem('mernToken')
    this.setState({token: '', user: {}, roles: {}, name: {}, userData: {}})
  }

  componentDidMount() {
    // If there is a token in localStorage
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      //   Validate the token against the server
      // const a = this;
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        // console.log('response for user: ', response);
        localStorage.setItem('mernToken', response.data.token)
        // console.log('response.data in app.js compdidmt: ', response.data);
        // let user = response.data.user;
        this.setState({
          token: response.data.token,
          user: response.data.user,
          name: response.data.name,
          roles: response.data.roles
        })
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
  }

  render() {
    if (typeof this.state.user === 'object' && Object.keys(this.state.user).length !== 0) {
      return (
        <BrowserRouter>
          <MuiThemeProvider theme={muiTheme}>
            <div onClick={this.change} className='App'>
              <UserProfile id='navbar' user={this.state.user} name={this.state.name} logout={this.logout} />
              <CtsMain id='content' user={this.state.user} roles={this.state.roles} logout={this.logout} />
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      );
    } else {
      const AppBarStyle = {
        background: '#ae1936',
        zIndex: 10000000
        }
      return (
        <div onClick={this.change} className='App'>
          <MuiThemeProvider theme={muiTheme}>
            <Grid container spacing={16}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <AppBar style={AppBarStyle} position="fixed">
                  <Toolbar>
                    <span className='UserName'>
                      <Button className='UserName' color='inherit'>CTS Companies</Button>
                    </span>
                    <Typography type="title" color="inherit" className='MenuTitle'>
                      Log In or Sign Up
                    </Typography>
                  </Toolbar>
                </AppBar>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <div className='SignupBox'>
                  <Signup lift={this.liftTokenToState} />
                </div>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <div className='LoginBox'>
                  <Login lift={this.liftTokenToState} />
                </div>
              </Grid>
            </Grid>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

export default App;
