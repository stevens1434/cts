import React, { Component } from 'react';
import './App.css';
// import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import Dashboard from './Dashboard';
// var unirest = require('unirest');
// var jQuery = require('jquery');
require('dotenv').config();

class CtsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      data: {}
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
  }

  change(e) {
    console.log("this.state in Rescutetime.js parent: ", this.state);
  }

  componentDidMount() {
    // let user = this.props.user;
    // console.log('user: ', user);
    axios.get('cts', {
    }).then(function(response) {
      // console.log('response from backend in ctsMain.js get route /: ', response.data);
    }).catch(function(err) {
      console.log("err: ", err);
    })

    if (this.state.user) {
      axios.post('cts/user', {
        data: this.props.user
      }).then(response => {
        // console.log('response.......: ', response.data);
        this.setState({
          userData: response.data
        })
      }).then(response => {
        // console.log('this.state in CTSMAIN:......: ', this.state);
      })
    } else {
      console.log('state not updated yet');
    }
  }

  render() {
    // let user = this.props.user;
    // console.log('data in ctsmain.js render(): ', userData);
    // console.log('user: ', user);
    // console.log('state: ', this.state);
    return (
      <div className='CtsMain'>
        <h1>CTS Home Page</h1>
        <Dashboard user={this.props.user}/>
      </div>
    )
  }
}

export default CtsMain;
