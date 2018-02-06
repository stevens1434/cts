import React, { Component } from 'react';
import './App.css';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import { Droppable, Draggable } from 'react-beautiful-dnd';
require('dotenv').config();
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

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
    this.draggable = this.draggable.bind(this);
    this.droppable = this.droppable.bind(this);
    this.displayToDo = this.displayToDo.bind(this);
    this.typeOfSale = this.typeOfSale.bind(this);
    this.dollarAmount = this.dollarAmount.bind(this);
    this.nextToDo = this.nextToDo.bind(this);
  }

  onDragStart = (initial) => {
    console.log('___result onDragStart___: ', initial);
    this.init(initial);
  }

  onDragEnd = (result) => {
    console.log('___result onDragEnd___: ', result);
      this.props.handleStateChange(result)
  }

  typeOfSale(SaleType) {
    // console.log('saletype: ', SaleType);
    return (
      SaleType.map((records, index) => (
        <span>{records} </span>
      ))
    )
  }

  dollarAmount(Amount) {
    // console.log('amount: ', Amount);
     let formattedAmount = nf.format(Amount);
     return (
       <span className='dollarAmountFunction'>{formattedAmount}</span>
     )
  }

  nextToDo(data) {
    console.log('todo data: ', data);
    let nextToDoDate
    data.sort( (a, b) => {
      if (a.DueDate.localeCompare(b.DueDate) === -1) {
        nextToDoDate = a.DueDate;
        return (
          <span>{nextToDoDate}<span>
        )
      }
    })
  }

  displayToDo(data) {
    return (
      data.map((records, index) => (
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography className='expansionHidden'>
              <div className='toDoTitle'>{records.Title}</div>
              <span className='toDoDue'> on {records.DueDate}</span>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className='expansionDetails'>
          <Typography>
              <div>
                <p className='toDoContent'>{records.Content}</p>
                <span className='toDoDue'>recorded on {records.RecordDate}</span>
              </div>
          </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))
    )
  }

  draggable(records, index) {
    let image;
    let check = 'https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/d97bbb09b0b4d656a621ea8ef892adb2/icon-checkmark.png';
    let noCheck = 'http://sweetclipart.com/multisite/sweetclipart/files/imagecache/middle/x_mark_red_circle.png';
    if (records.ApprovedForNextStep === false) {
      image = noCheck;
    } else {
      image = check;
    }
    return (
      <Draggable id='draggable' draggableId={records._id} index={index} key={index} className='card'>
        {(provided, snapshot) => (
          <Card className='card'>
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <ExpansionPanel>
                <ExpansionPanelSummary>
                  <Typography className='expansionHidden'>
                    <span className='compName'>{records.Name}</span>
                    <img className='approvedImage' src={image}></img>
                    <span className='location'>{records.Address.City}</span>
                    <span className='saleType'>{this.typeOfSale(records.SaleType)}</span>
                    <span className='dollarAmount'>{this.dollarAmount(records.Amount)}</span>
                    <span className='nextToDo'>{this.nextToDo(records.ToDo)}</span>
                    <span className='owner'>{records.Owner}</span>
                    <br/>
                    <br/>
                    <br/>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className='expansionDetails'>
                  <Typography>
                    <div>
                      <span>{records.Contacts[0].Primary.FirstName}</span>
                      <span>{records.Contacts[0].Primary.LastName}</span><br/>
                      <p>{records.Contacts[0].Primary.Title}</p>
                    </div>
                    <span>{records.Address.City}</span>
                    <div>{this.displayToDo(records.ToDo)}</div>
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
        <Grid container spacing={8}>
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
