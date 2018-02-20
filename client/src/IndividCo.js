import React, { Component } from 'react';
import './App.css';
import IndividCoData from './IndividCoData';
import IndividCoMap from './IndividCoMap';
import IndividCoNotes from './IndividCoNotes';
import IndividCoStageHistory from './IndividCoStageHistory';
import Grid from 'material-ui/Grid';
import axios from 'axios';
import { MuiThemeProvider, theme } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';

class IndividCo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      individData: {}
    }
    this.change = this.change.bind(this);
  }

  change() {
    console.log('state in IndividCo.js: ', this.state);
  }

  componentWillReceiveProps() {
    // console.log('props in IndividCo.js CompWillRcvProps: ', this.props);
  }

  componentDidMount() {
    let url = window.location.pathname
    var id = url.substring(url.lastIndexOf('/') + 1);
    axios.get('/userCompanies/individCo/'+id, {
    })
    .then(response => {
      this.setState({
        individData: response.data
      })
    }).catch(err => {
      console.log('err: ', err);
    })
  }

  render() {
      if (typeof this.state.individData === 'object' && Object.keys(this.state.individData).length !== 0) {
        const individData = this.state.individData;
        const Coorid = this.state.individData[0].Address.Coorid;
        const notes = this.state.individData[0].Notes;
        return (
          <div onClick={this.change}>
            <MuiThemeProvider theme={theme}>
              <Grid container spacing={8}>
                <Grid className='individCoLeftWrapper' item xl={3} lg={4} md={4} sm={12} xs={12}>
                  <Grid className='individCoLeft' container spacing={8}>
                    <Grid className='individCoData' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <IndividCoData
                        individData={this.state.individData}
                      />
                    </Grid>
                    <Grid className='individCoMap' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <IndividCoMap
                        Coorid={Coorid}
                      />
                    </Grid>
                    <Grid className='individCoNotes' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <IndividCoNotes
                        notes={notes}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className='individCoRightWrapper' item xl={9} lg={8} md={8} sm={12} xs={12}>
                  <Grid className='individCoRight' container spacing={8}>
                    <Grid className='individCoStageHistory' item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <IndividCoStageHistory
                        currentStage={this.state.individData[0].CurrentStage}
                        currentStageAlt={this.state.individData[0].CurrentStageAlt}
                        stageHistory={this.state.individData[0].StageHistory}
                      />
                    </Grid>
                    <Grid className='individCoContactInfo' item xl={12} lg={12} md={12} sm={12} xs={12}>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </div>
        )
      } else {
        return (
          <p>Loading...</p>
        )
      }
  }
}

export default IndividCo;
