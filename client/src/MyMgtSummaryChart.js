import React, { Component } from 'react';
import './App.css';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import {PieChart, Pie, Tooltip, Cell, Radar, Label,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Sector} from 'recharts';
const nf = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2});
const _categories = ['salesClosing', 'salesClosed', 'SCReceived', 'SCCompleted', 'OpsReceived', 'OpsOngoing', 'OpsCompleted', 'AccReceived', 'AccCompleted'];


class MyMgtSummaryChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      numberPerCateg: [],
      amountPerCateg: [],
      nameInCateg: [],
      activeIndex: 1,
      value: 0
    }
    this.change = this.change.bind(this);
    this.randomColor = this.randomColor.bind(this);
    this.changeActiveIndex = this.changeActiveIndex.bind(this);
    this.changeDollar = this.changeDollar.bind(this);
    this.renderActiveShape = this.renderActiveShape.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  change() {
    console.log('state in MyMgtSummaryChart.js: ', this.state);
  }

  randomColor(index, entry) {
    for (var m in _categories) {
      if (entry.stageAlt === this.state.amountPerCateg[m].name) {
        return this.state.amountPerCateg[m].color;
      }
    }
  }

  changeActiveIndex(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  changeDollar(value) {
    let formattedAmount = nf.format(value);
    return (
      <span style={{fontWeight: 'bold'}}>{formattedAmount}</span>
    )
  }

  renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, percent, value, stage, color } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
        <text style={{fontWeight: 'bold', fontSize: '18px'}} x={20} y={30} textAnchor={100} fill={color}>{`${stage}`}:</text>
        <text x={20} y={30} dy={22} textAnchor={100} fill={color}>
          The total value found in this stage is {nf.format(value)}.</text>
        <text x={20} y={30} dy={40} textAnchor={100} fill={color}>
          {(percent * 100).toFixed(2)}% of your companies are currently in this stage.
        </text>
      </g>
    );
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillReceiveProps() {
    if (this.props) {
      let data = this.props
      let numberPerCateg = []; //number of companies per category: [{name: <SaleType}, ]
      let nameInCateg = []; //list of companies per category: [{name: <Name>, amount: <Amount>}]
      let amountPerCateg = [];
      let companyData = data.companyData;
      let colorsScheme = ['rgb(173, 25, 52)','rgb(173, 72, 25)', 'rgb(173, 146, 25)', 'rgb(106, 173, 25)', 'rgb(65, 133, 129)', 'rgb(25, 52, 173)', 'rgb(72, 25, 173)', 'rgb(146, 25, 173)', 'rgb(103, 95, 96)'];
      let currentStageInfo = [];
      for (var k in companyData) {
        let nameInCategInfo = {};
        nameInCategInfo.name = companyData[k].Name;
        nameInCategInfo.amount = companyData[k].Amount;
        nameInCategInfo.stageAlt = companyData[k].CurrentStageAlt;
        nameInCategInfo.stage = companyData[k].CurrentStage
        nameInCateg.push(nameInCategInfo);
        if (currentStageInfo.includes(companyData[k].CurrentStage) === false) {
          currentStageInfo.push(companyData[k].CurrentStage);
        }
      }
      for (var i in _categories) {
        let numberPerCategInfo = {};
        let amountPerCategInfo = {};
        let categInfo = data[_categories[i]];
        let tempNumberPerCateg;
        let tempAmount = 0;
        amountPerCategInfo.color = colorsScheme[i];
        if (categInfo) {
          tempNumberPerCateg = categInfo.length;
        }
        for (var j in categInfo) {
          tempAmount += categInfo[j].Amount;
        }
        for (var o in companyData) {
          if (_categories[i] === companyData[o].CurrentStageAlt) {
            numberPerCategInfo.name = companyData[o].CurrentStage;
            amountPerCategInfo.stage = companyData[o].CurrentStage;
          }
        }
        numberPerCategInfo.stage = _categories[i];
        numberPerCategInfo.amount = tempNumberPerCateg;
        numberPerCateg.push(numberPerCategInfo);
        amountPerCategInfo.name = _categories[i];
        amountPerCategInfo.amount = tempAmount;
        amountPerCategInfo.numberPerCateg = tempNumberPerCateg;
        amountPerCateg.push(amountPerCategInfo);
        tempAmount = 0;
      }
      // console.log('numberPerCateg', numberPerCateg);
      // console.log('amountPerCateg', amountPerCateg);
      // console.log('nameInCateg', nameInCateg);
      this.setState({
        numberPerCateg: numberPerCateg,
        amountPerCateg: amountPerCateg,
        nameInCateg: nameInCateg
      })
    }
  }

  render() {
    // console.log('============================== STATE AT END CHART: ', this.state);
      if (this.state.numberPerCateg && this.state.nameInCateg) {
        const {value} = this.state;
        let colors = ['rgb(173, 25, 52)','rgb(173, 72, 25)', 'rgb(173, 146, 25)', 'rgb(106, 173, 25)', 'rgb(65, 133, 129)', 'rgb(25, 52, 173)', 'rgb(72, 25, 173)', 'rgb(146, 25, 173)', 'rgb(103, 95, 96)'];
        return(
          <div className='summaryChart' onClick={this.change}>
            <div className='tabContainer'>
              <AppBar position="static" color='default'>
                <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="rgba(174, 25, 54, .67)" fullWidth centered>
                  <Tab className='tabLabel' label="Companies Per Stage (%)" />
                  <Tab className='tabLabel' label="Value Per Stage ($)"  href="#basic-tabs" />
                </Tabs>
              </AppBar>
              {value === 0 &&
                <ResponsiveContainer width='100%' height='100%'>
                  <Grid className='summaryChart' container spacing={8}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <RadarChart className='radar' cx={225} cy={200} outerRadius={100} width={450} height={437} data={this.state.numberPerCateg}>
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="stage" stroke='rgb(103, 95, 96)'/>
                        <PolarRadiusAxis/>
                        <Radar name="stage" dataKey='amount' stroke="rgb(173, 25, 52)" fill="rgb(103, 95, 96)" fillOpacity={0.6}/>
                        <Tooltip/>
                      </RadarChart>
                    </Grid>
                  </Grid>
                </ResponsiveContainer>
              }
              {value === 1 &&
                <ResponsiveContainer width='100%' height='100%'>
                  <Grid className='summaryChart' container spacing={16}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <PieChart className='pie' width={450} height={437}>
                        <Pie
                        data={this.state.amountPerCateg}
                        cx={225} cy={200}
                        dataKey='amount' nameKey='stage'
                        outerRadius={100}
                        fill="#8884d8"
                        activeIndex={this.state.activeIndex} activeShape={this.renderActiveShape} onMouseEnter={this.changeActiveIndex}
                      >
                          {
                            this.state.amountPerCateg.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={colors[index]}/>
                            ))
                          }
                        </Pie>
                        <Pie
                          data={this.state.nameInCateg}
                          cx={225} cy={200}
                          dataKey='amount'
                          key='amount'
                          nameKey='stageAlt'
                          innerRadius={110} outerRadius={120}
                          fill="#82ca9d"
                        >
                          {
                            this.state.nameInCateg.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={this.randomColor(index, entry)}>
                                <Tooltip />
                              </Cell>
                            ))
                          }
                        </Pie>
                      </PieChart>
                    </Grid>
                  </Grid>
                </ResponsiveContainer>
              }
            </div>
          </div>
        )
      } else {
        return (
          <div onClick={this.change}>
            <p>Summary Chart</p>
          </div>
        )
      }
  }
}

export default MyMgtSummaryChart;
