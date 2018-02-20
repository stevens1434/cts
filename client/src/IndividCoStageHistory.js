import React, { Component } from 'react';
import './App.css';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
// import { MuiThemeProvider, theme } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
// import Card from 'material-ui/Card';

class IndividCoStageHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      individData: {}
    }
    this.getSteps = this.getSteps.bind(this);
  }

  getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
  }

  componentDidMount() {
  }

  render() {
      if (this.props.stageHistory) {
        let completedStageData = [];
        let currentStageData = [];
        let incompleteStageData = [];
        const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'Operations Received', 'Operations Ongoing', 'Operations Completed', 'Accounting Received', 'Accounting Completed'];
        const stageHistory = this.props.stageHistory;
        const currentStage = this.props.currentStage;
        const currentStageAlt = this.props.currentStageAlt;
        const length = stageHistory.length - 1;
        const currStgHstStgName = stageHistory[length].StageName;
        // console.log('stageHistory: ', stageHistory, '-currentStage: ', currentStage, '-currentStageAlt: ', currentStageAlt, '-currStgHstStgName: ', currStgHstStgName);
        for (var i in stages) {
          if (stageHistory[i] !== undefined) {
            // console.log('stageHistory[i]: ', i, ': ', stageHistory[i]);
            if (stages[i] === stageHistory[i].StageName && stages[i] !== currStgHstStgName) {
              completedStageData.push(stageHistory[i]);
            } else if (stages[i] === currStgHstStgName || stages[i] === currentStage) {
              currentStageData.push(stageHistory[i]);
            }
          } else {
            let tempStageName = {};
            tempStageName.StageName = stages[i];
            incompleteStageData.push(tempStageName);
          }
        }
        console.log('completedStageData: ', completedStageData);
        console.log('currentStageData: ', currentStageData);
        console.log('incompleteStageData: ', incompleteStageData);
        const activeStep = stageHistory[length];
        const steps = stages;
        return (
          <div className='individCoNotesContainer'>
          <Stepper activeStep={activeStep} alternativeLabel>
            {stages.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
            {completedStageData.map((records, index) => (
              <div className='individCompletedStages' key={index}>
                <p className='individCoMainData'>{records.StageName}</p>
                <span className='individCoSubData'>{records.DateEntered}</span>
                <span className='individCoSubData'>{records.DateCompleted}</span>
              </div>
            ))}
            {currentStageData.map((records, index) => (
              <div className='individCurrentStage' key={index}>
                <p className='individCoMainData'>{records.StageName}</p>
                <span className='individCoSubData'>{records.DateEntered}</span>
                <span className='individCoSubData'>{records.DateCompleted}</span>
              </div>
            ))}
            {incompleteStageData.map((records, index) => (
              <div className='individIncompleteStages' key={index}>
                <p className='individCoMainData'>{records.StageName}</p>
              </div>
            ))}
          </div>
        )
      } else {
        return (
          <p>Loading...</p>
        )
      }
  }
}

export default IndividCoStageHistory;
