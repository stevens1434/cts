import React, { Component } from 'react';
import './App.css';
// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
// import Tooltip from 'material-ui/Tooltip';
// import TableHeaderColumn from 'material-ui/Table';
// import ExpansionPanel, {
//   ExpansionPanelSummary,
//   ExpansionPanelDetails,
// } from 'material-ui/ExpansionPanel';
// import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import Divider from 'material-ui/Divider';
// import axios from 'axios';
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});
const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'Operations Received', 'Operations Ongoing', 'Operations Completed', 'Accounting Received', 'Accounting Completed'];

class MetaData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      companyData: [],
      metaData: [],
      closing: [],
      closed: [],
      SCReceived: [],
      SCCompleted: [],
      OpsReceived: [],
      OpsOngoing: [],
      OpsCompleted: [],
      AccReceived: [],
      AccCompleted: []
    }
    this.change = this.change.bind(this);
  }

  change() {
    console.log('state in MetaData.js: ', this.state);
  }

  componentWillReceiveProps() {
    let companyData = this.props.companyData;
    let salesTotal = 0;
    let scTotal = 0;
    let opsTotal = 0;
    let accTotal = 0;

    for (var i in companyData) {
      switch(companyData[i].CurrentStageAlt) {
        case 'salesClosing':
          const number = companyData[i].Amount;
          salesTotal += number;
          break;
        case 'salesClosed':
          const number0 = companyData[i].Amount;
          salesTotal += number0;
          break;
        case 'SCReceived':
          const number1 = companyData[i].Amount;
          scTotal += number1;
          break;
        case 'SCCompleted':
          const number2 = companyData[i].Amount;
          scTotal += number2;
          break;
        case 'OpsReceived':
          const number3 = companyData[i].Amount;
          opsTotal += number3;
          break;
        case 'OpsOngoing':
          const number4 = companyData[i].Amount;
          opsTotal += number4;
          break;
        case 'OpsCompleted':
          const number5 = companyData[i].Amount;
          opsTotal += number5;
          break;
        case 'AccReceived':
          const number6 = companyData[i].Amount;
          accTotal += number6;
          break;
        case 'AccCompleted':
          const number7 = companyData[i].Amount;
          accTotal += number7;
          break;
        default:
          console.log('nothing to change');
      }
      console.log('')
    }
    this.setState({
      sales: salesTotal,
      sc: scTotal,
      ops: opsTotal,
      acc: accTotal
    })
  }

  render() {
    if (this.state.metaData) {
      const metaData = this.state.metaData;
      console.log('sales amount: ', this.state.sales)
        return (
          <div className='metaHolder' style={{margin: '0 auto'}} onClick={this.change}>
            <Grid className='meta-container container' style={{margin: '0 auto'}} container spacing={24}>
              <Grid className='meta-row row' style={{margin: '0 auto'}} item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className='metaCard' style={{borderRadius: '5px', margin: '0 auto', backgroundColor: 'rgb(174, 25, 54)', padding: '8px'}}>
                  <Grid className='meta-container container' container spacing={0}>
                    <Grid style={{height: '60px'}} className='meta-sub-row row' item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <img style={{border: '10px solid rgb(174, 25, 54)'}} className='iconImage' src='http://res.cloudinary.com/stevens1434/image/upload/v1518564977/66-256_dc37nf.png' alt='Sales Icon'></img>
                    </Grid>
                    <Grid style={{height: '60px'}} className='meta-sub-row row' item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <p className='metaTitle'>Sales</p>
                    </Grid>
                    <Grid style={{marginTop: '5px'}} className='meta-sub-row row' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Divider style={{zIndex: '5'}}/>
                    </Grid>
                    <Grid className='meta-sub-row row' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <div className='metaAmount'>{nf.format(this.state.sales)}</div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid className='meta-row row' style={{margin: '0 auto'}} item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className='metaCard' style={{borderRadius: '5px', margin: '0 auto', backgroundColor: 'rgb(174, 25, 54)', padding: '8px'}}>
                  <Grid className='meta-container container' container spacing={0}>
                    <Grid style={{height: '60px'}} className='meta-sub-row row' item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <img style={{border: '10px solid rgb(174, 25, 54)'}} className='iconImage' src='http://res.cloudinary.com/stevens1434/image/upload/v1518564933/list-256_kop5y8.png' alt='SC Icon'></img>
                    </Grid>
                    <Grid style={{height: '60px'}} className='meta-sub-row row' item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <p className='metaTitle'>Sales Coord.</p>
                    </Grid>
                    <Grid style={{marginTop: '5px'}} className='meta-sub-row row' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Divider style={{zIndex: '5'}}/>
                    </Grid>
                    <Grid className='meta-sub-row row' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <div className='metaAmount'>{nf.format(this.state.sc)}</div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid className='meta-row row' style={{margin: '0 auto'}} item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className='metaCard' style={{borderRadius: '5px', margin: '0 auto', backgroundColor: 'rgb(174, 25, 54)', padding: '8px'}}>
                  <Grid className='meta-container container' container spacing={0}>
                    <Grid style={{height: '60px'}} className='meta-sub-row row' item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <img style={{border: '10px solid rgb(174, 25, 54)'}} className='iconImage' src='http://res.cloudinary.com/stevens1434/image/upload/v1518565001/tools-256_vlzen5.png' alt='Ops Icon'></img>
                    </Grid>
                    <Grid style={{height: '60px'}} className='meta-sub-row row' item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <p className='metaTitle'>Operations</p>
                    </Grid>
                    <Grid style={{marginTop: '5px'}} className='meta-sub-row row' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Divider style={{zIndex: '5'}}/>
                    </Grid>
                    <Grid className='meta-sub-row row' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <div className='metaAmount'>{nf.format(this.state.ops)}</div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid className='meta-row row' style={{margin: '0 auto'}} item xl={3} lg={3} md={3} sm={6} xs={6}>
                <Card className='metaCard' style={{borderRadius: '5px', margin: '0 auto', backgroundColor: 'rgb(174, 25, 54)', padding: '8px'}}>
                  <Grid className='meta-container container' container spacing={0}>
                    <Grid style={{height: '60px'}} className='meta-sub-row row' item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <img style={{border: '10px solid rgb(174, 25, 54)'}} className='iconImage' src='http://res.cloudinary.com/stevens1434/image/upload/v1518565004/dollar-bills-256_paddjo.png' alt='Acc Icon'></img>
                    </Grid>
                    <Grid style={{height: '60px'}} className='meta-sub-row row' item xl={6} lg={6} md={6} sm={6} xs={6}>
                      <p className='metaTitle'>Accounting</p>
                    </Grid>
                    <Grid style={{marginTop: '5px'}} className='meta-sub-row row' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Divider style={{zIndex: '5'}}/>
                    </Grid>
                    <Grid className='meta-sub-row row' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <div className='metaAmount'>{nf.format(this.state.acc)}</div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </div>
        )
    } else {
      return (
        <p onClick={this.change}>Loading...</p>
      )
    }
  }
}

export default MetaData;
