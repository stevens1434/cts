import React, { Component } from 'react';
import './App.css';
import MyMgtSummaryChart from './MyMgtSummaryChart';
import MyMgtCompare from './MyMgtCompare';
import MyMgtEff from './MyMgtEff';
import MetaData from './MetaData';
import Grid from 'material-ui/Grid';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
// import ExpansionPanel, {
//   ExpansionPanelSummary,
//   ExpansionPanelDetails,
// } from 'material-ui/ExpansionPanel';
// import Typography from 'material-ui/Typography';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
require('dotenv').config();
const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'Operations Received', 'Operations Ongoing', 'Operations Completed', 'Accounting Received', 'Accounting Completed'];

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
    this.handleMetaData = this.handleMetaData.bind(this);
  }

  change() {
    console.log('state in myManagement.js parent: ', this.state);
  }

  handleMetaData(request) {
    let metaData = {};
    let subData = {};
    axios.post(request, {
      data: this.props.user
    }).then(response => {
      let responseData = response.data
      console.log('responseData for MetaData.js: ', responseData)
      for (var i in responseData) {
        let amount = [];
        let stage = [];
        let _currStage = responseData[i].stageName;
        stages.forEach((_currStage, j) => {
          console.log('same stage? : ', stages[j], '_currStage: ', _currStage);
          if (stages[j] === _currStage) {
            amount.push(responseData[i].amount);
            console.log('stage: ', _currStage, '- amount: ', amount);
          }
        })
      }
      // stages.forEach((_currStage, index) => {
      //   let amount = [];
      //   let stage = [];
      //   for (var i in responseData) {
      //     stage = _currStage;
      //     if (responseData[i].stageName === _currStage) {
      //       amount.push(responseData[i].amount);
      //       // console.log('stage: ', stage, '.. amount: ', amount);
      //       metaData[responseData[i].stageName] = {
      //         stage: stage,
      //         amount: amount
      //       }
      //     }
      //   }
      // })
    }).then(records => {
      // console.log('metaData: ', metaData);
      // this.setState({
      //   metaData: metaData
      // })
    }).catch(err => {
      console.log('err: ', err);
    })
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
      console.log('responseData: ', responseData);
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
    // if (this.props.roles.RoleType === 'Employee') {
    //   let request = 'userCompanies/userAmount';
    //   this.handleMetaData(request);
    // } else if (this.props.roles.RoleType === 'Manager' || this.props.roles.RoleType === 'Owner') {
    //   let request = 'userCompanies/amount';
    //   this.handleMetaData(request);
    // }
  }

  render() {
      console.log('===== state in myMgt: ', this.state);
      return (
        <div onClick={this.change}>
          <Grid container spacing={16}>
            <Grid className='mgtTitle' item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Card style={{margin: '0px 10px -5px 10px', padding: '8px'}}>
                <h1 className='pageHeader' onClick={this.change}>Management Dashboard</h1>
              </Card>
            </Grid>
            <Grid className='mgteff' item xl={8} lg={8} md={12} sm={12} xs={12}>
              <Card style={{backgroundColor: 'rgba(163, 163, 163, .4)', margin: '0px 0px 0px 10px', paddingRight: '0px'}}>
                <MyMgtEff
                  allData={this.props.allData}
                  user={this.props.user}
                />
              </Card>
            </Grid>
            <Grid className='mgtchart' item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Paper style={{ margin: '0px 10px 10px 0px' , padding: '0px'}}>
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
              </Paper>
            </Grid>
            <Grid className='mgtother' item xl={6} lg={6} md={6} sm={6} xs={12}>
            </Grid>
            <Grid className='mgtlist' item xl={6} lg={6} md={12} sm={6} xs={12}>
              <MetaData
                style={{ margin: '0px 10px'}}
                user={this.props.user}
                metaData={this.state.metaData}
                companyData={this.state.companyData}
              />
            </Grid>
            <Grid className='mgtcompare' item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Card style={{backgroundColor: 'rgba(163, 163, 163, .4)', margin: '0px 10px'}}>
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
              </Card>
            </Grid>
          </Grid>
        </div>
      )
  }
}

export default MyManagement;
