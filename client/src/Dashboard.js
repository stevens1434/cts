import React, { Component } from 'react';
import './App.css';
// import { CircularProgress } from 'material-ui/Progress';
// import axios from 'axios';
// import ReactDOM from 'react-dom';
import SalesDash from './SalesDash';
import SalesCoordinatorDash from './SalesCoordinatorDash';
import OperationsDash from './OperationsDash';
import AccountingDash from './AccountingDash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// var unirest = require('unirest');
// var jQuery = require('jquery');
require('dotenv').config();
// let salesClosing = [];
// let salesClosed = [];
// let SCReceived = [];
// let SCCompleted = [];
// let OpsReceived = [];
// let OpsOngoing = [];
// let OpsCompleted = [];
// let AccReceived = [];
// let AccCompleted = [];
// let Completed = [];
// var DragSource;

class CtsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      data: {},
      userData: {},
      companyData: {},
      salesClosing: [],
      salesClosed: [],
      SCReceived: [],
      SCCompleted: [],
      OpsReceived: [],
      OpsOngoing: [],
      OpsCompleted: [],
      AccReceived: [],
      AccCompleted: [],
      Completed: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.change = this.change.bind(this);
    this.init = this.init.bind(this);
    this.draggable = this.draggable.bind(this);
    this.droppable = this.droppable.bind(this);
  }

  change(e) {
    console.log("this.state in Rescutetime.js parent: ", this.state);
  }

  //Use HOOKS to do conditionals
  //ISSUES:
    //see Synchronous Reordering
    //
  //
  init(initial) {

  }

  onDragStart = (initial) => {
    console.log('___result onDragStart___: ', initial);
    this.init(initial);
  }

  onDragEnd = (result) => {
    console.log('___result onDragEnd___: ', result);
      this.props.handleStateChange(result)
  }

  draggable(records, index) {
    return (
      <Draggable id='draggable' draggableId={records._id} index={index} key={index} className='card'>
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <p>{records.Name}</p>
              {provided.placeholder}
            </div>
          </div>
        )}
      </Draggable>
    )
  }

  droppable(map, ident) {
    return (
      <Droppable id='droppable' droppableId={ident} isDropDisabled={false} className='dropBox'>
        {(provided, snapshot) => (
          <div className='mappedItem' ref={provided.innerRef}>
            {map}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }

  componentDidMount() {
  }

  render() {
    //TODO: split into multiple components to make it more readable
    if (this.props.user && this.props.companyData) {
      return (
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            <div onClick={this.change} className='Dashboard row'>
                <SalesDash
                  user={this.props.user}
                  companyData={this.props.companyData}
                  salesClosing={this.props.salesClosing}
                  salesClosed={this.props.salesClosed}
                  handlepropsChange={this.handlepropsChange}
                  Completed={this.props.Completed}
                  Cold={this.props.Completed}
                  Dead={this.props.Completed}
                />
                <SalesCoordinatorDash
                  user={this.props.user}
                  companyData={this.props.companyData}
                  SCReceived={this.props.SCReceived}
                  SCCompleted={this.props.SCCompleted}
                  handlepropsChange={this.handlepropsChange}
                  Completed={this.props.Completed}
                  Cold={this.props.Completed}
                  Dead={this.props.Completed}
                />
                <OperationsDash
                  user={this.props.user}
                  companyData={this.props.companyData}
                  OpsReceived={this.props.OpsReceived}
                  OpsOngoing={this.props.OpsOngoing}
                  OpsCompleted={this.props.OpsCompleted}
                  handlepropsChange={this.handlepropsChange}
                  Completed={this.props.Completed}
                  Cold={this.props.Completed}
                  Dead={this.props.Completed}
                />
                <AccountingDash
                  user={this.props.user}
                  companyData={this.props.companyData}
                  AccReceived={this.props.AccReceived}
                  AccCompleted={this.props.AccCompleted}
                  handlepropsChange={this.handlepropsChange}
                  Completed={this.props.Completed}
                />
            </div>
          </DragDropContext>
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

export default CtsMain;
