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
      data: {},
      salesClosing: [],
      salesClosed: [],
      SCReceived: [],
      SCCompleted: [],
      OpsReceived: [],
      OpsOngoing: [],
      OpsCompleted: [],
      AccReceived: [],
      AccCompleted: [],
      Completed: [],
      Cold: [],
      Dead: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  change(e) {
    console.log("this.state in Rescutetime.js parent: ", this.state);
  }

  handleStateChange(result) {
    if (!result.destination) {
      return;
    } else {
      let _source = result.source.droppableId;
      let _destination = result.destination.droppableId;
      let sourceState = this.state[_source];
      let destinationState = this.state[_destination];
      // console.log('sourceState: ', sourceState);
      // console.log('desintationState: ', destinationState);
      let indexSource = result.source.index;
      let indexDestination = result.destination.index;
      let itemToMove = sourceState[indexSource];
      // console.log('itemToMove: ', itemToMove);
      sourceState.splice(indexSource, 1);
      destinationState.splice(indexDestination, 0, itemToMove);
      // console.log('new DestinationState: ', destinationState);
      // console.log('new sourceState: ', sourceState);
      // this.props.handleStateChange(_source, _destination, indexSource, indexDestination)
      this.setState({
        [_source]: sourceState,
        [_destination]: destinationState
      })
    }
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

    // const a = this;
    let closingsales = [];
    let closedsales = [];
    let receivedsc = [];
    let completedsc = [];
    let receivedopps = [];
    let ongoingopps = [];
    let completedopps = [];
    let receivedacc = [];
    let completedacc = [];
    let completed = [];
    let cold = [];
    let dead = [];
    let responseData;
    //TODO: change to switch statement or something more efficient
    if (this.props.user) {
      axios.post('cts/allCompanies', {
      }).then(response => {
        responseData = response.data;
        for (var i in responseData) {
          if(responseData[i].CurrentStage === 'Closing') {
            closingsales.push(responseData[i]);
          } else if (responseData[i].CurrentStage === 'Closed') {
            closedsales.push(responseData[i]);
          } else if (responseData[i].CurrentStage === 'Sales Coordinator Received') {
            receivedsc.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Sales Coordinator Completed') {
            completedsc.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Operations Received') {
            receivedopps.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Operations Ongoing') {
            ongoingopps.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Operations Completed') {
            completedopps.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Accounting Received') {
            receivedacc.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Accounting Completed') {
            completedacc.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Cold'){
            cold.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Dead') {
            dead.push(responseData[i]);
          }
        }
      }).then(response => {
        this.setState({
          companyData: responseData,
          salesClosing: closingsales,
          salesClosed: closedsales,
          SCReceived: receivedsc,
          SCCompleted: completedsc,
          OpsReceived: receivedopps,
          OpsOngoing: ongoingopps,
          OpsCompleted: completedopps,
          AccReceived: receivedacc,
          AccCompleted: completedacc,
          Completed: completed,
          Cold: cold,
          Dead: dead
        })
      })
    } else {
      console.log('state not updated yet');
    }
  }

  render() {
    return (
      <div className='CtsMain'>
        <h1>CTS Home Page</h1>
        <Dashboard
          user={this.props.user}
          companyData={this.state.companyData}
          salesClosing={this.state.salesClosing}
          salesClosed={this.state.salesClosed}
          SCReceived={this.state.SCReceived}
          SCCompleted={this.state.SCCompleted}
          OpsReceived={this.state.OpsReceived}
          OpsOngoing={this.state.OpsOngoing}
          OpsCompleted={this.state.OpsCompleted}
          AccReceived={this.state.AccReceived}
          AccCompleted={this.state.AccCompleted}
          Completed={this.state.Completed}
          handleStateChange={this.handleStateChange}
        />
      </div>
    )
  }
}

export default CtsMain;
