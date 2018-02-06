import React, { Component } from 'react';
import './App.css';
// import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import Dashboard from './Dashboard';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
require('dotenv').config();

class CtsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      userData: {},
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
      Dead: [],
      modal: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  change(e) {
    console.log("this.state in CtsMain.js parent: ", this.state);
  }

  handleClose() {
    this.setState({
      modal: false
    })
  }

  handleStateChange(result) {
    if (!result.destination) {
      return;
    } else {
      //To allow pickup and drop...
        // ensure that they can move an item form where it was picked up...
      let canChange = this.state.userData.CanChange;
      let dropSource = result.source.droppableId;
      let dropDest = result.destination.droppableId;
      if (canChange.includes(dropSource) === true && canChange.includes(dropDest)) {
        let userData = this.state.userData;
        let _source = result.source.droppableId;
        let _destination = result.destination.droppableId;
        let sourceState = this.state[_source];
        let destinationState = this.state[_destination];
        let indexSource = result.source.index;
        let indexDestination = result.destination.index;
        let itemToMove = sourceState[indexSource];
        sourceState.splice(indexSource, 1);
        destinationState.splice(indexDestination, 0, itemToMove);
        this.setState({
          [_source]: sourceState,
          [_destination]: destinationState,
          userData: userData
        })
      } else {
        //MODAL TO EXPLAIN THAT YOU CANNOT DO THAT here
        console.log('YOU SHALL NOT PASS, nor make that change');
        this.setState({
          modal: true
        })
      }
    }
  }

  componentDidMount() {
    axios.get('cts', {
    }).then(function(response) {
    }).catch(function(err) {
      console.log("err: ", err);
    })
    if (this.state.user) {
      axios.post('cts/user', {
        data: this.props.user
      }).then(response => {
        this.setState({
          userData: response.data
        })
      }).then(response => {
      })
    } else {
      // console.log('state not updated yet');
    }
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
    //TODO: change to switch statement for better readability
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
    function getModalStyle() {
      const top = 50;
      const left = 50;
      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
      };
    }
    const styles = theme => ({
      paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
      },
    });
    return (
      <div onClick={this.change} className='CtsMain'>
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modal}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className='modal'>
            <Typography variant="title" id="modal-title">
              Sorry, you do not have permissions to do that
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Contact the help desk for more information or if this is an error.
            </Typography>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CtsMain;
