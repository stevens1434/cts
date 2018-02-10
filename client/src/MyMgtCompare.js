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
  }

  change() {
    console.log('state in MyMgtSummaryChart.js: ', this.state);
  }

  getDifference(date1, date2, stage) {
    if (date2 === undefined) {
      let d1 = new Date(date1).getTime();
      let d2 = new Date().getTime()
      let diff = d1 - d2;
      var timeDiff = Math.abs(diff);
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return (
        <span>{diffDays} Days in current stage ({stage})</span>
      )
    } else {
      let d1 = new Date(date1).getTime();
      let d2 = new Date(date2).getTime()
      let diff = d1 - d2;
      var timeDiff = Math.abs(diff);
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return (
        <span>{diffDays} Days in {stage}</span>
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
    console.log('stagehistorysssss: ', stageHistory[length -1])
    return (
      stageHistory.map((records, index) => (
          <ExpansionPanelDetails>
                    <TableRow className='tableRowStage'>
                      <TableCell className='tableCellStage bold' key={index}>{records.StageName}</TableCell>
                      <TableCell className='tableCellStage' key={index}>{records.DateEntered}</TableCell>
                      <TableCell className='tableCellStage' key={index}>{this.getDifference(records.DateEntered, records.DateCompleted, records.StageName)}</TableCell>
                    </TableRow>

          </ExpansionPanelDetails>
      ))
    )
  }

  // <TableHead>
  //   <TableRow>
  //     <TableCell>Stage</TableCell>
  //     <TableCell numeric>Date Entered</TableCell>
  //     <TableCell numeric>Time In Stage</TableCell>
  //   </TableRow>
  // </TableHead>

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
//POND.JS
  // nameAndStageData = [
  //   {
  //     name: 'xxx',
  //     columns: ['dateEntered', 'stage'],
  //     points: [
  //       [ stage: 'xxx', dateEntered: 'xxx', name: 'xxx' ],
  //       [ stage: 'xxx', dateEntered: 'xxx', name: 'xxx' ]
  //     ]
  //   },
  //   {
  //     name: 'xxx',
  //     columns: ['dateEntered', 'stage'],
  //     points: [
  //       [ stage: 'xxx', dateEntered: 'xxx', name: 'xxx' ],
  //       [ stage: 'xxx', dateEntered: 'xxx', name: 'xxx' ],
  //       [ stage: 'xxx', dateEntered: 'xxx', name: 'xxx' ]
  //     ]
  //   },
  //     ...
  // ]

//MY INFO
// nameAndStageData = [
//   {
//     name: 'xxx',
//     data: [
//       { stage: 'xxx', dateEntered: 'xxx' },
//       { stage: 'xxx', dateEntered: 'xxx' },
//     ]
//   },
//   {
//     name: 'xxx',
//     data: [
//       { stage: 'xxx', dateEntered: 'xxx' },
//       { stage: 'xxx', dateEntered: 'xxx' },
//     ]
//   },
//     ...
// ]

  // CompanyData = [
  //   {
  //     name: 'xxxx',
  //     StageHistory: [
  //       {
  //         stage: 'xxx',
  //         DateEntered: 'xxx'
  //       },
  //       {
  //         stage: 'xxx',
  //         DateEntered: 'xxx'
  //       },...
  //     ]
  //   },
  //   {
  //     name: 'xxxx',
  //     StageHistory: [
  //       {
  //         stage: 'xxx',
  //         DateEntered: 'xxx'
  //       },
  //       {
  //         stage: 'xxx',
  //         DateEntered: 'xxx'
  //       },...
  //     ]
  //   },...
  // ]

  render() {
    if (this.state.nameAndStageData.length > 0) {
      console.log("this.state in render(): ", this.state);
      let nameAndStageData = this.state.nameAndStageData;
      let chartData = this.state.chartData;
      let companyData = this.state.companyData;
      let map = this.state.companyData.map((records, index) => (
        <div>
          <p className='bold'>{records.Name}</p>
          <p>${records.Owner}</p>
          <p>Current Stage: {records.CurrentStage}</p>
          <p>Amount: ${records.Amount}</p>
          <div className='stageHistory'>StageHistory
            <p>{this.stageHistory(records.StageHistory)}</p>
          </div>
        </div>
      ))
      return (
        <div>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company</TableCell>
                    <TableCell numeric>Owner</TableCell>
                    <TableCell numeric>Current Stage</TableCell>
                    <TableCell numeric>Amount</TableCell>
                    <TableCell numeric>Stage History</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companyData.map((records, index) => {
                    return (
                      <TableRow key={records.index}>
                        <TableCell>{records.Name}</TableCell>
                        <TableCell numeric>{records.Owner}</TableCell>
                        <TableCell numeric>{records.CurrentStage}</TableCell>
                        <TableCell numeric>{this.formatAmount(records.Amount)}</TableCell>
                        <TableCell numeric>
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

// <div>
//
// </div>
// <p>MyMgtCompare</p>
// <div>
// <p>line chart for past 12 months showing number of companies at each stage in any given month</p>
// <p>red = sales closed, green = ops received</p>
// <p>January: red = 2, green = 3</p>
// <p>February: red = 3, green = 2</p>
// <p></p>
// </div>
// <div>
// <p>Line chart showing each company -as a line- and at what dates they were in any given stage</p>
// <p>red = Co1, green = Co 2</p>
// <p>January: Co1 = closed</p>
// <p>February: Co1 = Ops Rcvd</p>
// <p></p>
// </div>
