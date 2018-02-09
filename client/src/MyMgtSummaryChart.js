import React, { Component } from 'react';
import './App.css';
import Grid from 'material-ui/Grid';
import {PieChart, Pie, Tooltip, Cell, Radar,
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
      activeIndex: 0
    }
    this.change = this.change.bind(this);
    this.randomColor = this.randomColor.bind(this);
    this.changeActiveIndex = this.changeActiveIndex.bind(this);
    this.changeDollar = this.changeDollar.bind(this);
    this.renderActiveShape = this.renderActiveShape.bind(this);
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
    // console.log('formattedAmount: ', formattedAmount);
    return (
      <span>{formattedAmount}</span>
    )
  }

  renderActiveShape = (props) => {
    // console.log('props: ', props);
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, percent, value, stage, color } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    // const sx = cx + (outerRadius + 10) * cos;
    // const sy = cy + (outerRadius + 10) * sin;
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
        <text style={{fontWeight: 'bold'}} x={175} y={20} textAnchor={100} fill={color}>{`${stage}`}</text>
        <text x={175} y={20} dy={18} textAnchor={100} fill={color}>{nf.format(value)}</text>
        <text x={175} y={20} dy={36} textAnchor={100} fill={color}>
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  componentWillReceiveProps() {
    // console.log('4----------this.props in SUMMARY CHART: ', this.props)
    if (this.props) {
      let data = this.props
      // console.log('data: ', data);
      let numberPerCateg = []; //number of companies per category: [{name: <SaleType}, ]
      let nameInCateg = []; //list of companies per category: [{name: <Name>, amount: <Amount>}]
      let amountPerCateg = [];
      let companyData = data.companyData;
      console.log('companyData: ', companyData);
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
      //nameInCateg.stageAlt (1-V) === amountPerCateg.name (9-A) === numberPerCateg.name (9-A) === companyData.currentStageAlt (1-V)
      // for (var xxx in companyData) {
      //   if (amountPerCateg[i].name === CompanyData[i].currentStageAlt) {
      //     amountPerCateg.stage = copmanyData[i].currentStageAlt)
      //   }
      // }
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
        // let tempAmountInfo = {};
        // if (tempNumberPerCateg > 0) {
        //   tempAmountInfo.name = _categories[i];
        //   tempAmountInfo.amount = tempAmount;
        //   tempAmountInfo.numberPerCateg = tempNumberPerCateg;
        //   tempAmountInfo.stage = currentStageInfo[i];
        // }
        for (var o in companyData) {
          if (_categories[i] === companyData[o].CurrentStageAlt) {
            numberPerCategInfo.name = companyData[o].CurrentStage;
            amountPerCategInfo.stage = companyData[o].CurrentStage;
          }
        }
        numberPerCategInfo.stage = _categories[i];
        numberPerCategInfo.amount = tempNumberPerCateg;
        // numberPerCategInfo.stage = currentStageInfo[i];
        numberPerCateg.push(numberPerCategInfo);
        amountPerCategInfo.name = _categories[i];
        amountPerCategInfo.amount = tempAmount;
        amountPerCategInfo.numberPerCateg = tempNumberPerCateg;
        // for (var o in companyData) {
        //   if (_categories[i] === companyData[o].CurrentStageAlt) {
        //     amountPerCategInfo.stage = companyData[o].CurrentStageAlt;
        //   }
        // }
        amountPerCateg.push(amountPerCategInfo);
        // console.log('tempAmountInfo: ', tempAmountInfo);
        tempAmount = 0;
      }
      console.log('numberPerCateg', numberPerCateg);
      console.log('amountPerCateg', amountPerCateg);
      console.log('nameInCateg', nameInCateg);
      // console.log('5----------about to set state in CHART THING')
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
        let colors = ['rgb(173, 25, 52)','rgb(173, 72, 25)', 'rgb(173, 146, 25)', 'rgb(106, 173, 25)', 'rgb(65, 133, 129)', 'rgb(25, 52, 173)', 'rgb(72, 25, 173)', 'rgb(146, 25, 173)', 'rgb(103, 95, 96)'];
        return(
          <div className='summaryChart' onClick={this.change}>
            <ResponsiveContainer width='100%' height='100%'>
              <Grid className='summaryChart' container spacing={16}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <RadarChart className='radar' cx={295} cy={200} outerRadius={100} width={600} height={350} data={this.state.numberPerCateg}>
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="stage" stroke='rgb(103, 95, 96)'/>
                    <PolarRadiusAxis/>
                    <Radar name="stage" dataKey='amount' stroke="rgb(173, 25, 52)" fill="rgb(103, 95, 96)" fillOpacity={0.6}/>
                    <Tooltip/>
                  </RadarChart>
                </Grid>
                <Grid className='pie' item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <PieChart className='pie' width={400} height={350}>
                      <Pie
                      data={this.state.amountPerCateg}
                      cx={250} cy={200}
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
                        cx={250} cy={200}
                        dataKey='amount'
                        key='amount'
                        nameKey='stageAlt'
                        innerRadius={110} outerRadius={120}
                        fill="#82ca9d"
                      >
                      >
                        {
                          this.state.nameInCateg.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={this.randomColor(index, entry)}/>
                          ))
                        }
                      </Pie>
                    </PieChart>
                  </Grid>
                </Grid>
            </ResponsiveContainer>
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
