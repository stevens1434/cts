import React, { Component } from 'react';
import './App.css';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Typography from 'material-ui/Typography';
import { Droppable, Draggable } from 'react-beautiful-dnd';
require('dotenv').config();
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});


class SalesDash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      data: {},
      userData: {},
      companyData: {},
      salesClosing: [],
      salesClosed: [],
      hover: false
    }
    this.change = this.change.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.draggable = this.draggable.bind(this);
    this.droppable = this.droppable.bind(this);
    this.displayToDo = this.displayToDo.bind(this);
    this.typeOfSale = this.typeOfSale.bind(this);
    this.dollarAmount = this.dollarAmount.bind(this);
    this.nextToDo = this.nextToDo.bind(this);
    this.handleView = this.handleView.bind(this);
    // this.mouseEnter = this.mouseEnter.bind(this);
  }

  change() {
    console.log('state in salesDash: ', this.state);
  }

  onDragStart = (initial) => {
    console.log('___result onDragStart___: ', initial);
    this.props.init(initial);
  }

  onDragEnd = (result) => {
    console.log('___result onDragEnd___: ', result);
      this.props.handleStateChange(result)
  }

  handleView(e) {
    let i = e.target.getAttribute('value');
    console.log('i in eventtarget : ', e.target.getAttribute('value'));
    // console.log('id: ', id);
    return (`/mycompanies/`+i)
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
    if (data.length > 0) {
      let nextToDoDate;
      data.sort( (a, b) => {
        if (a.DueDate.localeCompare(b.DueDate) === -1) {
          nextToDoDate = b.DueDate;
          return( '' )
        } else if (a.DueDate.localeCompare(b.DueDate) === 1) {
          nextToDoDate = a.DueDate;
        }
        return( '' )
      })
      return (
        <span>Next f/u: {nextToDoDate}</span>
      )
    } else {
      return (
        <span>Next f/u: none</span>
      )
    }
  }

  displayToDo(data) {
    return (
      data.map((records, index) => (
        <ExpansionPanel>
          <ExpansionPanelSummary style={{margin: '5px', marginTop: '0px', marginBottom: '0px', padding: '0px', paddingLeft: '5px', paddingRight: '5px'}}>
            <Typography style={{paddingRight: '0px', padding: '2px 10px'}} id='expansionHidden' className='expansionHidden'>
              <div className='toDoTitle'>{records.Title}</div>
              <span className='toDoDue'> on {records.DueDate}</span>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{padding: '2px 10px'}} className='expansionDetails'>
          <Typography style={{padding: '1px'}}>
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

  //ON MOUSE ENTER TO CHANGE STYLE...
  // style={this.state.hover === true ? {backgroundColor: 'rgb(174, 25, 54)'} : {backgroundColor: 'none'}} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseEnter}
  // mouseEnter(index) {
  //   // console.log('mouseOverrrrrr');
  //   if (this.state.hover === false) {
  //     console.log('hover was false now true')
  //     this.setState({
  //       hover: true
  //     })
  //   } else {
  //     console.log('hover was true now false')
  //     this.setState({
  //       hover: false
  //     })
  //   }
  // }

  draggable(records, index, userId, roleType) {
    const companyUserId = records.userId[0];
    const center = {
      margin: 'auto',
    }
    let image;
    const check = 'https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/d97bbb09b0b4d656a621ea8ef892adb2/icon-checkmark.png';
    const noCheck = 'http://sweetclipart.com/multisite/sweetclipart/files/imagecache/middle/x_mark_red_circle.png';
    if (records.ApprovedForNextStep === false) {
      image = noCheck;
    } else {
      image = check;
    }
    return (
      <Draggable id='draggable' draggableId={records._id} index={index} key={index} className='card'>
        {(provided, snapshot) => (
          <Card className='card'>
            <div className='betweenCardAndExpansionPanel' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <ExpansionPanel className='dashExpansion'>
                <ExpansionPanelSummary>
                  <Typography className='expansionHidden'>
                    {userId === companyUserId || roleType === 'Owner' || roleType === 'Manager' ?
                      <span>
                        <Link className='compName' to={'/mycompanies/' + records._id} params={records._id} data-key={index} value={records._id} onClick={this.handleView}>
                          {records.Name}
                        </Link>
                      </span>
                    :
                      <span className='compName'>{records.Name}</span>
                    }
                    <img className='approvedImage' src={image} alt='approval'></img>
                    <span className='location'>{records.Address.City}</span>
                    <span className='saleType'>{this.typeOfSale(records.SaleType)}</span>
                    <span className='dollarAmount'>{this.dollarAmount(records.Amount)}</span>
                    <span className='nextToDo'>{this.nextToDo(records.ToDo)}</span>
                    <span className='owner'>{records.Owner}</span>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{padding: '3px'}} className='expansionDetails'>
                <Typography style={center}>
                  <div>
                    <span>{records.Contacts[0].Primary.FirstName}</span>
                    <span>{records.Contacts[0].Primary.LastName}</span><br/>
                    <div>{records.Contacts[0].Primary.Title}</div>
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

  render() {
    if (this.props.user && this.props.companyData) {
      // console.log('this.props: ', this.props);
      const userId = this.props.user.id;
      const roleType = this.props.roleType;
      let salesClosingMap = this.props.salesClosing.map((records, index) => {
        return ( <div>{this.draggable(records, index, userId, roleType)}</div> )
      })
      let salesClosedMap = this.props.salesClosed.map((records, index) => {
        return ( <div>{this.draggable(records, index, userId, roleType)}</div> )
      })
      return (
          <Grid onClick={this.change} container spacing={8}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3 className="column"> Sales<hr/><br/></h3>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className='subLeft'> Closing </div>
              <div>{this.droppable(salesClosingMap, 'salesClosing')}</div>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <div className='subRight'> Closed </div>
              <div>{this.droppable(salesClosedMap, 'salesClosed')}</div>
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

export default SalesDash;
