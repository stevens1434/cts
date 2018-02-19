import React, { Component } from 'react';
import './App.css';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import TableHeaderColumn from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

class MyMgtCompare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      nameAndStageData: [],
      chartData: [],
      companyData: []
    }
    this.change = this.change.bind(this);
    this.stageHistory = this.stageHistory.bind(this);
    this.getDifference = this.getDifference.bind(this);
    this.formatAmount = this.formatAmount.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  change() {
    console.log('state in MyMgtSummaryChart.js: ', this.state);
  }

  getDifference(date1, date2, stage) {
    // console.log('get dates: ', date1, '--', date2, '--', stage);
    if (date2 === null) {
      let d1 = new Date(date1).getTime();
      let d2 = new Date().getTime();
      // console.log('d2: ', new Date().getTime(), "---", d2);
      let diff = d1 - d2;
      // console.log('diff: ', diff);
      var timeDiff = Math.abs(diff);
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return (
        <span className='getDifference'>{diffDays} Days in current stage (<span className='bold'>{stage}</span>)</span>
      )
    } else {
      let d1 = new Date(date1).getTime();
      let d2 = new Date(date2).getTime()
      let diff = d1 - d2;
      var timeDiff = Math.abs(diff);
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return (
        <span className='getDifference'>{diffDays} Days in <span className='bold'>{stage}</span></span>
      )
    }
  }

  formatAmount(amount) {
    if (amount) {
      let formattedAmount = nf.format(amount);
      return (
        <span>{formattedAmount}</span>
      )
    } else {
      return (
        <span>No Amount</span>
      )
    }
  }

  stageHistory(stageHistory) {
    // console.log('________________________________________');
    let length = stageHistory.length;
    // console.log('stagehistorysssss: ', stageHistory[length -1])
    return (
      stageHistory.map((records, index) => (
          <ExpansionPanelDetails key={index}>
                    <TableRow className='tableRowStage'>
                      <TableCell className='tableCellStage' key={index}>{this.getDifference(records.DateEntered, records.DateCompleted, records.StageName)}</TableCell>
                      <TableCell className='tableCellStage' key={index}>{records.DateEntered}</TableCell>
                    </TableRow>

          </ExpansionPanelDetails>
      ))
    )
  }

  handleView(e) {
    let i = e.target.getAttribute('value');
    console.log('i in eventtarget : ', e.target.getAttribute('value'));
    // console.log('id: ', id);
    return (`/mycompanies/`+i)
  }

// <Link className="linkto" to={"/mycompanies/" + records._id} params={records._id} data-key={index} value={records._id} onClick={this.handleView}>
// <div data-key={index}><h3>{records.name}</h3></div></Link> <hr />



  componentWillReceiveProps() {
    if (this.props.companyData.length > 0) {
      let companyData = this.props.companyData;
      // console.log('companyData: ', companyData);
      let nameAndStageData = [];
      let chartData = [];
      for (var i in companyData) {
        let nameAndStageDataInfo = {}
        nameAndStageDataInfo.name = companyData[i].Name;
        let data = []
        for (var j in companyData[i].StageHistory) {
          // console.log('companyData[i].StageHistory: ', companyData[i].StageHistory[j].DateEntered);
          let dataInfo = [];
          let dateData;
          let dates = function() {
            let dateStr = companyData[i].StageHistory[j].DateEntered
            // console.log('dateData: ', dateData);
            dateData = new Date(dateStr).getTime();
            // console.log('dateStr: ', dateStr);
          }
          dates();
          dataInfo.push(dateData);
          dataInfo.push(companyData[i].StageHistory[j].StageName);
          dataInfo.push(companyData[i].Name);
          data.push(dataInfo);
          chartData.push(dataInfo);
        }
        nameAndStageDataInfo.columns = ['date', 'stage', 'name'];
        nameAndStageDataInfo.points = data;
        // console.log('data: ', data);
        nameAndStageData.push(nameAndStageDataInfo);
      }
      this.setState({
        nameAndStageData: nameAndStageData,
        chartData: chartData,
        companyData: companyData
      })
    }
  }

  componentDidMount() {
  }

  render() {
    if (this.state.nameAndStageData.length > 0) {
      // console.log("this.state in render(): ", this.state);
      let nameAndStageData = this.state.nameAndStageData;
      let chartData = this.state.chartData;
      let companyData = this.state.companyData;
      console.log('companyData: ', companyData);
      return (
        <div>
            <Paper>
              <Table>
                <TableHead>
                  <div className="tableTitle">Company Data</div>
                  <TableRow>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)'}}>Company</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)'}}>Owner</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)'}}>Current Stage</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)'}} numeric>Amount</TableCell>
                    <TableCell style={{color: 'rgba(174, 25, 54, .67)'}}>Stage History</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companyData.map((records, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell style={{padding: '0px 0px 0px 15px'}}>
                          <Link to={'/mycompanies/' + records._id} params={records._id} data-key={index} value={records._id} onClick={this.handleView}>
                            {records.Name}
                          </Link>
                        </TableCell>
                        <TableCell>{records.Name}</TableCell>
                        <TableCell>{records.Owner}</TableCell>
                        <TableCell>{records.CurrentStage}</TableCell>
                        <TableCell numeric>{this.formatAmount(records.Amount)}</TableCell>
                        <TableCell>
                          <ExpansionPanel>
                            <ExpansionPanelSummary>
                              <Typography>StageHistory</Typography>
                            </ExpansionPanelSummary>
                            {this.stageHistory(records.StageHistory)}
                          </ExpansionPanel>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
}

export default MyMgtCompare;
