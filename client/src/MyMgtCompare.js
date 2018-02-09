import React, { Component } from 'react';
import './App.css';
// import Grid from 'material-ui/Grid';
import {LineChart, Line, AreaChart, Legend, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

class MyMgtCompare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      companyData: []
    }
    this.change = this.change.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  change() {
    console.log('state in MyMgtSummaryChart.js: ', this.state);
  }

  renderChart() {
    this.props.companyData.map(s => (
      <Line dataKey="value" data={s.StageHistory} name={s.Name} key={s.Name} />
    ))
  }

  componentWillReceiveProps() {
    console.log('this.props: ', this.props);
    // this.setState({
    //   companyData: this.props.companyData
    // })

  }

  componentDidMount() {

  }

// CompanyData = [
//   {
//     Name: 'xxx',
//       StageHistory: [
//         {
//           StageName: 'xxx',
//           DateEntered: 'xxx'
//         },
//         {
//           StageName: 'xxx',
//           DateEntered: 'xxx'
//         },
//     ]
//   },
//   {
//     name: 'xxx',
//       StageHistory: [
//         {DateEntered: 'xxx'}
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
    console.log('this.props.companyData', this.props.companyData, ' this.state.companyData: ', this.state.companyData);
    if (this.props.companyData.length > 0) {
      //NEED TO CONVERT DATES TO INTEGERS BEFORE MOVING FORWARD
      // var dates = dates_as_int.map(function(dateStr) {
      //   return new Date(dateStr).getTime();
      // });
      return (
        <div>
            <h3>Dataset 1</h3>
            <LineChart width={600} height={300}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="StageName" type="StageName" allowDuplicatedCategory={false} />
              <YAxis dataKey="DateEntered"/>
              <Tooltip/>
              <Legend />
              {this.renderChart}
            </LineChart>
          <p>MyMgtCompare</p>
          <div>
            <p>line chart for past 12 months showing number of companies at each stage in any given month</p>
            <p>red = sales closed, green = ops received</p>
            <p>January: red = 2, green = 3</p>
            <p>February: red = 3, green = 2</p>
            <p></p>
          </div>
          <div>
            <p>Line chart showing each company -as a line- and at what dates they were in any given stage</p>
            <p>red = Co1, green = Co 2</p>
            <p>January: Co1 = closed</p>
            <p>February: Co1 = Ops Rcvd</p>
            <p></p>
          </div>
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
