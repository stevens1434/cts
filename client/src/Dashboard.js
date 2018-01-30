import React, { Component } from 'react';
import './App.css';
// import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
// var unirest = require('unirest');
// var jQuery = require('jquery');
require('dotenv').config();

class CtsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      data: {},
      userData: {},
      companyData: {}
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
  }

  change(e) {
    console.log("this.state in Rescutetime.js parent: ", this.state);
  }

  componentDidMount() {
    const a = this;
    if (this.props.user) {
      axios.post('cts/allCompanies', {
      }).then(response => {
        // console.log('response in dashboard.......: ', response.data);
        this.setState({
          companyData: response.data
        })
      }).then(response => {
        // console.log('this.state in dashboard:......: ', this.state);
      })
    } else {
      console.log('state not updated yet');
    }
    // let user = this.props.user;
    // console.log('user: ', user);
  }

  render() {
    // let user = this.props.user;
    if (this.props.user && this.state.companyData) {

      // console.log('user: ', user);
      // console.log('state: ', this.state);
      return (
          <div onClick={this.change} className='Dashboard row'>
              <div className="column">
                  Sales<br/>
                <div className='subLeft'>
                  Closing
                </div>
                <div className='subRight'>
                  Closed
                </div>
              </div>
                <div className="column">
                  Sales Coordinator<br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <div className='subRight'>
                    Completed
                  </div>
              </div>
              <div className="column operations">
                  Operations<br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <div className='middle'>
                    Ongoing
                  </div>
                  <div className='subRight'>
                    Completed
                  </div>
              </div>
              <div className="column">
                  Accounting <br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <div className='subRight'>
                    Completed
                  </div>
              </div>
          </div>
      )
    } else {
      return (
        <div className='Dashboard'>
          <p>Loading...</p>
        </div>
      )
    }
  }
}

export default CtsMain;
