import React, { Component } from 'react';
import './App.css';
import MyMgtSummaryChart from './MyMgtSummaryChart';
import Grid from 'material-ui/Grid';
import axios from 'axios';
// import Card from 'material-ui/Card';
// import ExpansionPanel, {
//   ExpansionPanelSummary,
//   ExpansionPanelDetails,
// } from 'material-ui/ExpansionPanel';
// import Typography from 'material-ui/Typography';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
require('dotenv').config();
// const nf = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
//   minimumFractionDigits: 0,
//   maximumFractionDigits: 2
// });


class SalesDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
  }

  change() {
    console.log('state in myManagement.js: ', this.state);
  }

  componentDidMount() {
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
    axios.post('userCompanies/user', {
      data: this.props.user
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
    }).catch(function (error) {
      console.log('error: ', error);
    });

  }

  render() {
    // let userId;
    // // if (this.props.companyData) {
    //   console.log('this.props: ', this.props);
    //   let user = this.props.user;
    //   let companyData = this.state.companyData;
    //   let salesClosing = this.state.salesClosing;
    //   let salesClosed = this.state.salesClosed;
    //   let SCReceived = this.state.SCReceived;
    //   let SCCompleted = this.state.SCCompleted;
    //   let OpsReceived = this.state.OpsReceived;
    //   let OpsOngoing = this.state.OpsOngoing;
    //   let OpsCompleted = this.state.OpsCompleted;
    //   let AccReceived = this.state.AccReceived;
    //   let AccCompleted = this.state.AccCompleted;
    //   let Completed = this.state.Completed;
    //   let Cold = this.state.Cold;
    //   let Dead = this.state.Dead;
      // let handleStateChange = this.handleStateChange;
      return (
        <div>
          <p onClick={this.change}>MyManagement</p>
          <Grid container spacing={16}>
            <Grid className='mgtchart' item xl={12} lg={12} md={12} sm={12} xs={12}>
              <MyMgtSummaryChart
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
                Cold={this.state.Completed}
                Dead={this.state.Completed}
              />
            </Grid>
            <Grid className='mgtcompare' item xl={4} lg={4} md={4} sm={6} xs={12}>
            </Grid>
            <Grid className='mgteff' item xl={4} lg={4} md={4} sm={6} xs={12}>
            </Grid>
            <Grid className='mgtlist' item xl={4} lg={4} md={4} sm={12} xs={12}>
            </Grid>
            <Grid className='mgtother' item xl={12} lg={12} md={12} sm={12} xs={12}>
            </Grid>
          </Grid>
        </div>
      )
    // } else {
    //   return (
    //     <p>Loading...</p>
    //   )
    // }
  }
}

export default SalesDash;
