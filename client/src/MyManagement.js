import React, { Component } from 'react';
import './App.css';
import MyMgtSummaryChart from './MyMgtSummaryChart';
import MyMgtCompare from './MyMgtCompare';
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

class MyManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      companyData: [],
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
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  change() {
    console.log('state in myManagement.js: ', this.state);
  }
  //USED FOR MyMgtSummarChart.js
  handleData(request) {
    // console.log('request: ', request);
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
    axios.post(request, {
      data: this.props.user
    }).then(response => {
      responseData = response.data;
      for (var i in responseData) {
        if (responseData[i].CurrentStage === 'Closing') {
          responseData[i].stageAlt = 'Closing';
          closingsales.push(responseData[i]);
        } else if (responseData[i].CurrentStage === 'Closed') {
          responseData[i].stageAlt = 'Closed';
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
    }).then(response => {
      responseData = [];
    })
  }
  //Used to see which type of user is accessing the page - EE's get only their data, Mgrs/Owners get all data
  componentWillReceiveProps() {
    if (this.props.roles.RoleType === 'Employee') {
      let request = 'userCompanies/user';
      this.handleData(request);
    } else if (this.props.roles.RoleType === 'Manager' || this.props.roles.RoleType === 'Owner') {
      let request = 'cts/allcompanies';
      this.handleData(request);
    }
  }

  componentDidMount() {
  }

  render() {
      // console.log('===== state in myMgt: ', this.state);
      return (
        <div>
          <h1 className='pageHeader' onClick={this.change}>Management Dashboard</h1>
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
              <MyMgtCompare
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
            <Grid className='mgteff' item xl={4} lg={4} md={4} sm={6} xs={12}>
            </Grid>
            <Grid className='mgtlist' item xl={4} lg={4} md={4} sm={12} xs={12}>
            </Grid>
            <Grid className='mgtother' item xl={12} lg={12} md={12} sm={12} xs={12}>
            </Grid>
          </Grid>
        </div>
      )
  }
}

export default MyManagement;
