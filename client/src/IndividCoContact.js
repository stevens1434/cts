import React, { Component } from 'react';
import './App.css';
import IndividCoNotes from './IndividCoNotes';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

class IndividCoContact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      individData: {}
    }
    this.stepperData = this.stepperData.bind(this);
  }

  stepperData(index) {
    console.log('index: ', index);
  }

  render() {
      if (this.props) {
        const contacts = this.props.contacts;
        const contactHistory = this.props.contactHistory;
        const toDo = this.props.toDo;
        const notes = this.props.notes;
        let contactsMap;
        let contactHistMap;
        let toDoMap;
        if (contacts) {
          contactsMap = contacts.map((records, index) => (
              <div key={index}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p className='individContactName'>
                      <div className='titleName'>{records.Primary.FirstName} {records.Primary.LastName}</div>
                      <div className='individContactTitle'>{records.Primary.Title}</div>
                    </p>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Table className='individContactTable'>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{padding: '4px 0px -10px 24px'}}>Business</TableCell>
                          <TableCell style={{padding: '4px 0px -10px 0px'}}>Direct</TableCell>
                          <TableCell style={{padding: '4px 0px -10px 0px'}}>Mobile</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{borderBottomColor: 'transparent', padding: '-20px 0px 4px 24px', color: 'lightgrey'}}>{records.Primary.Phone.Business.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</TableCell>
                          <TableCell style={{borderBottomColor: 'transparent', padding: '-20px 0px 4px 0px', color: 'lightgrey'}}>{records.Primary.Phone.Direct.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</TableCell>
                          <TableCell style={{borderBottomColor: 'transparent', padding: '-20px 0px 4px 0px', color: 'lightgrey'}}>{records.Primary.Phone.Mobile.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p className='individContactName'>
                      <div className='titleName'>{records.Secondary.FirstName} {records.Secondary.LastName}</div>
                      <div className='individContactTitle'>{records.Secondary.Title}</div>
                    </p>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Table style={{color: 'green'}}>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{padding: '4px 0px -10px 24px'}}>Business</TableCell>
                          <TableCell style={{padding: '4px 0px -10px 0px'}}>Direct</TableCell>
                          <TableCell style={{padding: '4px 0px -10px 0px'}}>Mobile</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{borderBottomColor: 'transparent', padding: '-20px 0px 4px 24px', color: 'lightgrey'}}>{records.Secondary.Phone.Business.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</TableCell>
                          <TableCell style={{borderBottomColor: 'transparent', padding: '-20px 0px 4px 0px', color: 'lightgrey'}}>{records.Secondary.Phone.Direct.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</TableCell>
                          <TableCell style={{borderBottomColor: 'transparent', padding: '-20px 0px 4px 0px', color: 'lightgrey'}}>{records.Secondary.Phone.Mobile.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
          ));
        }
        if (contactHistory) {
          contactHistMap = contactHistory.map((records, index) => (
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
          ));
        }
        if (toDo) {
          toDoMap = toDo.map((records, index) => (
              <div clasName='IndividContactToDo' key={index}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      <div className='individCoToDoTitle'>{records.Title}</div>
                      <div className='individCoToDoDue'>
                        <span style={{fontWeight: 'bold'}}>Due: {records.DueDate}</span><span>, Recorded: {records.RecordDate}</span>
                      </div>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{backgroundColor: 'rgb(241, 241, 241)'}}>
                    <Typography>
                      <p className='individCoToDoContent'>{records.Content}</p>
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
          ));
        }
        return (
          <div className='individCoStageData'>
            <Grid container spacing={8}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

              <Grid className='vertAlignWrapper' container>
                <Grid style={{padding: '0px', marginRight: '-25px', marginLeft: '0px'}} item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <h4 className='IndividCoVerticalAlignContacts'>CONTACTS</h4>
                </Grid>
                <Grid style={{marginRight: '10px'}} className='individCoStageHistoryContact' item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <Paper>{contactsMap}</Paper>
                </Grid>
              </Grid>

              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

              <Grid style={{marginTop: '16px'}} container>
                <Grid style={{padding: '0px', marginRight: '-25px', marginLeft: '0px', width: '100px'}} className='vertAlignWrapper' item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <h4 className='IndividCoVerticalAlignToDo'>TO-DO</h4>
                </Grid>
                <Grid style={{marginRight: '10px'}} className='individCoStageHistoryToDo' item xl={5} lg={5} md={5} sm={5} xs={5}>
                  <Paper>{toDoMap}</Paper>
                </Grid>

                <Grid style={{padding: '0px', marginRight: '-25px', marginLeft: '15px'}} className='vertAlignWrapper' item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <h4 className='IndividCoVerticalAlignHistory'>HISTORY</h4>
                </Grid>
                <Grid style={{marginRight: '10px'}} className='individCoStageHistoryContHist' item xl={5} lg={5} md={5} sm={5} xs={5}>
                  <Card>{contactHistMap}</Card>
                </Grid>
              </Grid>

              </Grid>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

              <Grid style={{marginTop: '16px'}} container>
                <Grid style={{marginRight: '10px'}} className='individCoStageHistoryContHist' item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <IndividCoNotes
                    notes={this.props.notes}
                  />
                </Grid>
              </Grid>

              </Grid>

            </Grid>
          </div>
        )
      } else {
        return (
          <p>Loading...</p>
        )
      }
  }
}

export default IndividCoContact;
