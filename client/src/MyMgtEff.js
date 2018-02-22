import React, { Component } from 'react';
import './App.css';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import TableHeaderColumn from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import axios from 'axios';
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});
const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'Operations Received', 'Operations Ongoing', 'Operations Completed', 'Accounting Received', 'Accounting Completed'];

class MyMgtEff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      allData: [],
      stageData: [],
      hoveredTooltip: false
    }
    this.change = this.change.bind(this);
    this.getAverage = this.getAverage.bind(this);
    this.manageHover = this.manageHover.bind(this);
  }

  change() {
    console.log('state in MyMgtEff.js: ', this.state);
  }

  getAverage(data, stage, _stage) {
    if (data) {
      // console.log('data: ', data);
      let tempObj = {};
      const stage = data.stage;
      const dateEntered = data.data.dateEntered;
      const dateCompleted = data.data.dateCompleted;
      let index = 0;
      let compCurIn = 0;
      let days = 0;
      let daysCurIn = 0;
      let daysBoth = 0;
      for (var i in dateEntered) {
        index += 1;
        if (dateCompleted[i] === null) {
          const d1 = new Date(dateEntered[i]).getTime();
          const d2 = new Date().getTime()
          const diff = d1 - d2;
          const timeDiff = Math.abs(diff);
          const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          days += diffDays;
          daysCurIn += diffDays;
          compCurIn += 1;
        } else {
          const d1 = new Date(dateEntered[i]).getTime();
          const d2 = new Date(dateCompleted[i]).getTime()
          const diff = d1 - d2;
          const timeDiff = Math.abs(diff);
          const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          days += diffDays;
          daysBoth += diffDays;
        }
      }
      const avg = (days/index).toFixed(2);
      const avgInt = parseInt((days/index).toFixed(2));
      tempObj.average = avg;
      tempObj.averageAsInteger = avgInt;
      tempObj.items = index;
      tempObj.stage = stage;
      tempObj.days = days;
      tempObj.daysBoth = daysBoth;
      tempObj.daysCurIn = daysCurIn;
      tempObj.compCurIn = compCurIn;
      _stage.push(tempObj);
      return ( _stage )
    }
  }

  manageHover() {
    if (this.state.hoveredTooltip === true) {
      this.setState({hoveredTooltip: false})
    } else {
      this.setState({hoveredTooltip: true})
    }
  }

  componentWillReceiveProps() {
    let _stage = [];
    if (this.props.allData) {
      let allData = this.props.allData;
      // console.log('allData: ', allData);
      for (var i in stages) {
        this.getAverage(allData[stages[i]], stages[i], _stage);
      }
      this.setState({
        stageData: _stage
      })
    }
  }

  render() {
    if (this.state.stageData) {
      let stageData = this.state.stageData;
      // console.log('stageData: ', stageData);
      return (
        <div className='effChartHolder' onClick={this.change}>
          <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)', padding: '0px 0px 0px 15px'}}>Stage</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)', padding: '0px 0px 0px 0px'}}>Current Total</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)', padding: '0px 0px 0px 0px'}}>Total Days</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)', padding: '0px 0px 0px 0px'}}>Current Avg.</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)', padding: '0px 0px 0px 0px'}}>Historical Total</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)', padding: '0px 0px 0px 0px'}}>Historical Days</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)', padding: '0px 0px 0px 0px'}}>Avg. Days</TableCell>
                  </TableRow>
                </TableHead>
                {this.state.stageData.map((records, index) => {
                  return (
                    <TableBody>
                      <TableRow key={index} hover>
                        <TableCell style={{padding: '0px 0px 0px 15px'}}>{records.stage}</TableCell>
                        <TableCell style={{padding: '0px'}}>{records.compCurIn === 1 ? `${records.compCurIn} Co` : `${records.compCurIn}` }</TableCell>
                        <TableCell style={{padding: '0px'}}>{records.daysCurIn}</TableCell>
                        <TableCell style={{padding: '0px'}}>{records.compCurIn !== 0 ? `${records.daysCurIn / records.compCurIn}` : '0'}</TableCell>
                        <TableCell style={{padding: '0px'}}>{records.items}</TableCell>
                        <TableCell style={{padding: '0px'}}>{records.days}</TableCell>
                        <TableCell style={{padding: '0px'}}>{records.average}</TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
              </Table>
          </Paper>
        </div>
      )
    } else {
      return (
        <p onClick={this.change}>Loading...</p>
      )
    }
  }
}

export default MyMgtEff;
