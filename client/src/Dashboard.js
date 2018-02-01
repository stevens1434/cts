import React, { Component } from 'react';
import './App.css';
// import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// var unirest = require('unirest');
// var jQuery = require('jquery');
require('dotenv').config();
let salesClosing = [];
let salesClosed = [];
let SCReceived = [];
let SCCompleted = [];
let OpsReceived = [];
let OpsOngoing = [];
let OpsCompleted = [];
let AccReceived = [];
let AccCompleted = [];
let Completed = [];
var DragSource;

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
    // console.log('initial start: ', DragSource);
    DragSource = initial;
    // console.log('initial end: ', DragSource);
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
    console.log('map: ', map, 'ident: ', ident);
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
      console.log('salesClosing before map: ', this.props.salesClosing);
      let salesClosingMap = this.props.salesClosing.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let salesClosedMap = this.props.salesClosed.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let SCReceivedMap = this.props.SCReceived.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let SCCompletedMap = this.props.SCCompleted.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let OpsReceivedMap = this.props.OpsReceived.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let OpsOngoingMap = this.props.OpsOngoing.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let OpsCompletedMap = this.props.OpsCompleted.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let AccReceivedMap = this.props.AccReceived.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let AccCompletedMap = this.props.AccCompleted.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      return (
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            <div onClick={this.change} className='Dashboard row'>
              <div className="column">
                  Sales<hr/><br/>
                <div className='subLeft'>
                  Closing
                </div>
                <div>{this.droppable(salesClosingMap, 'salesClosing')}</div>
                {console.log('console.log: ', salesClosingMap, 'salesClosing')}
                <div className='subRight'>
                  Closed
                </div>
                <div>{this.droppable(salesClosedMap, 'salesClosed')}</div>


                </div>
                <div className="column">
                  Sales Coordinator<hr/><br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <div>{this.droppable(SCReceivedMap, 'SCReceived')}</div>


                  <div className='subRight'>
                    Completed
                  </div>
                  <div>{this.droppable(SCCompletedMap, 'SCCompleted')}</div>


              </div>
              <div className="column operations">
                  Operations<hr/><br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <div>{this.droppable(OpsReceivedMap, 'OpsReceived')}</div>


                  <div className='middle'>
                    Ongoing
                  </div>
                  <div>{this.droppable(OpsOngoingMap, 'OpsOngoing')}</div>


                  <div className='subRight'>
                    Completed
                  </div>
                  <div>{this.droppable(OpsCompletedMap, 'OpsCompleted')}</div>


              </div>
              <div className="column">
                  Accounting<hr/><br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <div>{this.droppable(AccReceivedMap, 'AccReceived')}</div>


                  <div className='subRight'>
                    Completed
                  </div>
                  <div>{this.droppable(AccCompletedMap, 'AccCompleted')}</div>


              </div>
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
