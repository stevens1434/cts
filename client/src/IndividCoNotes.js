import React, { Component } from 'react';
import './App.css';
import Grid from 'material-ui/Grid';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
// import { MuiThemeProvider, theme } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
// import Card from 'material-ui/Card';

class IndividCoNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      individData: {}
    }
    this.change = this.change.bind(this);
  }

  change() {
  }

  componentDidMount() {
  }

  render() {
      if (this.props.notes.length !== 0) {
        const notes = this.props.notes;
        // console.log('notes: ', notes);
        return (
            <Grid style={{marginTop: '16px'}} container spacing={8}>
              <Grid className='vertAlignWrapper' container>
                <Grid style={{padding: '0px', marginRight: '-25px', marginLeft: '10px'}} item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <h4 className='IndividCoVerticalAlignNotes'>NOTES</h4>
                </Grid>
                <Grid style={{padding: '0px 24px 0px 3px', marginRight: '10px'}} className='individCoStageHistory' item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <Paper>
                    {notes.map((records, index) => (
                      <div key={index}>
                        <ExpansionPanel>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography><div className='individCoToDoTitle'>{records.Title}</div><div className='individCoToDoDue'>Recorded:  {records.RecordDate}</div></Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails style={{backgroundColor: 'rgb(241, 241, 241)'}}>
                            <Typography>
                              <p className='individCoToDoContent'>{records.Content}</p>
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </div>
                    ))}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
        )
      } else {
        return (
          <p>No Notes to Display</p>
        )
      }
  }
}

export default IndividCoNotes;
