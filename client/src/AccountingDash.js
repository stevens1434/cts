import React, { Component } from 'react';
import './App.css';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardTitle, CardText} from 'material-ui/Card';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { Droppable, Draggable } from 'react-beautiful-dnd';
require('dotenv').config();

class AccountingDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      data: {},
      userData: {},
      companyData: {},
      salesClosing: [],
      salesClosed: [],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.change = this.change.bind(this);
    this.draggable = this.draggable.bind(this);
    this.droppable = this.droppable.bind(this);
    this.displayNotes = this.displayNotes.bind(this);
    this.approvedForNextStep = this.approvedForNextStep.bind(this);
  }

  change(e) {
    console.log("this.state in CtsMain/Dashboard/SalesDash: ", this.state);
  }

onDragStart = (initial) => {
    console.log('___result onDragStart___: ', initial);
    this.init(initial);
  }

  onDragEnd = (result) => {
    console.log('___result onDragEnd___: ', result);
      this.props.handleStateChange(result)
  }

  displayNotes(data) {
    let notes = data.map((records, index) => (
      <span>
        <div className='bold'>{data.Title}</div>
        <p>{data.Content}</p>
        <span>{data.RecordDate}</span>
      </span>
    ))
    return (
      <div>{notes}</div>
    )
  }

  approvedForNextStep(data) {
    if (data === true) {
      return (
        <div>Approved</div>
      )
    } else {
      return (
        <div>Not Approved</div>
      )
    }
  }

  draggable(records, index) {
    return (
      <Draggable id='draggable' draggableId={records._id} index={index} key={index} className='card'>
        {(provided, snapshot) => (
          <Card className='card'>
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <ExpansionPanel>
                <ExpansionPanelSummary>
                  <Typography className='expansionHidden'>{records.Name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className='expansionDetails'>
                  <Typography>
                    <div>{this.approvedForNextStep(records.ApprovedForNextStep)}</div>
                    <div>
                      <span>{records.Contacts[0].Primary.FirstName}</span>
                      <span>{records.Contacts[0].Primary.LastName}</span><br/>
                      <p>{records.Contacts[0].Primary.Title}</p>
                    </div>
                    <span>{records.Address.City}</span>
                    <div>{this.displayNotes(records.Notes)}</div>
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              {provided.placeholder}
            </div>
          </Card>
        )}
      </Draggable>
    )
  }

  droppable(map, ident) {
    return (
      <Droppable id='droppable' droppableId={ident} isDropDisabled={false} className='dropBox'>
        {(provided, snapshot) => (
          <div className='mappedItem' ref={provided.innerRef}> {map} {provided.placeholder} </div>
        )}
      </Droppable>
    )
  }

  componentDidMount() {
  }

  render() {
    if (this.props.user && this.props.companyData) {
      let AccReceivedMap = this.props.AccReceived.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let AccCompletedMap = this.props.AccCompleted.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      return (
        <Grid container spacing={8} onClick={this.change}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <h3 className="column">Accounting<hr/><br/></h3>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className='subLeft'>Received</div>
            <div>{this.droppable(AccReceivedMap, 'AccReceived')}</div>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className='subRight'>Completed</div>
            <div>{this.droppable(AccCompletedMap, 'AccCompleted')}</div>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <div className='Dashboard'>
          <p>Loading...</p>
        </div>
      )
    }
  }
}

export default AccountingDash;
