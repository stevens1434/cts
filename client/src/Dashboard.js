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
    // console.log('INITIAL in onDragEnd: ', DragSource)
    // if (result.source.droppableId === DragSource.source.droppableId) {
    //   console.log('source and destination are the same!');
    // }
    if (!result.destination) {
      return;
    } else {
      let _source = result.source.droppableId;
      let _destination = result.destination.droppableId;
      let sourceState = this.state[_source];
      let destinationState = this.state[_destination];
      // console.log('sourceState: ', sourceState);
      // console.log('desintationState: ', destinationState);
      let indexSource = result.source.index;
      let indexDestination = result.destination.index;
      let itemToMove = sourceState[indexSource];
      // console.log('itemToMove: ', itemToMove);
      sourceState.splice(indexSource, 1);
      destinationState.splice(indexDestination, 0, itemToMove);
      // console.log('new DestinationState: ', destinationState);
      // console.log('new sourceState: ', sourceState);
      this.setState({
        [_source]: sourceState,
        [_destination]: destinationState
      })
    }
  }

  componentDidMount() {
    const a = this;
    let closingsales = [];
    let closedsales = [];
    let receivedsc = [];
    let completedsc = [];
    let receivedopps = [];
    let ongoingopps = [];
    let completedopps = [];
    let receivedacc = [];
    let completedacc = [];
    let completed = [];
    let responseData;
    if (this.props.user) {
      axios.post('cts/allCompanies', {
      }).then(response => {
        responseData = response.data;
        for (var i in responseData) {
          if(responseData[i].CurrentStage === 'Closing') {
            closingsales.push(responseData[i]);
          } else if (responseData[i].CurrentStage === 'Closed') {
            closedsales.push(responseData[i]);
          } else if (responseData[i].CurrentStage === 'Sales Coordinator Received') {
            receivedsc.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Sales Coordinator Completed') {
            completedsc.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Operations Received') {
            receivedopps.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Operations Ongoing') {
            ongoingopps.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Operations Completed') {
            completedopps.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Accounting Received') {
            receivedacc.push(responseData[i]);
          } else if(responseData[i].CurrentStage === 'Accounting Completed') {
            completedacc.push(responseData[i]);
          } else {
            completed.push(responseData[i]);
          }
        }
      }).then(response => {
        this.setState({
          companyData: responseData,
          salesClosing: closingsales,
          salesClosed: closedsales,
          SCReceived: receivedsc,
          SCCompleted: completedsc,
          OpsReceived: receivedopps,
          OpsOngoing: ongoingopps,
          OpsCompleted: completedopps,
          AccReceived: receivedacc,
          AccCompleted: completedacc,
          Completed: completed
        })
      })
    } else {
      console.log('state not updated yet');
    }
  }

  render() {
    if (this.props.user && this.state.companyData) {
      // let companyData = this.state.companyData;
      // salesClosing = [];
      // salesClosed = [];
      // SCReceived = [];
      // SCCompleted = [];
      // OpsReceived = [];
      // OpsOngoing = [];
      // OpsCompleted = [];
      // AccReceived = [];
      // AccCompleted = [];
      // for (var i in companyData) {
      //   if(companyData[i].CurrentStage === 'Closing') {
      //     salesClosing.push(companyData[i]);
      //     // console.log('Closing Copmanies: ', salesClosing);
      //   }
      //   if(companyData[i].CurrentStage === 'Closed') {
      //     salesClosed.push(companyData[i]);
      //     // console.log('Closed Copmanies: ', salesClosed);
      //   }
      //   if(companyData[i].CurrentStage === 'Sales Coordinator Received') {
      //     SCReceived.push(companyData[i]);
      //     // console.log('SC Rcvd Copmanies: ', SCReceived);
      //   }
      //   if(companyData[i].CurrentStage === 'Sales Coordinator Completed') {
      //     SCCompleted.push(companyData[i]);
      //     // console.log('SC Comp Copmanies: ', SCCompleted);
      //   }
      //   if(companyData[i].CurrentStage === 'Operations Received') {
      //     OpsReceived.push(companyData[i]);
      //     // console.log('Ops Rcvd Copmanies: ', OpsReceived);
      //   }
      //   if(companyData[i].CurrentStage === 'Operations Ongoing') {
      //     OpsOngoing.push(companyData[i]);
      //     // console.log('Ops Ongoing Copmanies: ', OpsOngoing);
      //   }
      //   if(companyData[i].CurrentStage === 'Operations Completed') {
      //     OpsCompleted.push(companyData[i]);
      //     // console.log('Ops Comp Copmanies: ', OpsCompleted);
      //   }
      //   if(companyData[i].CurrentStage === 'Accounting Received') {
      //     AccReceived.push(companyData[i]);
      //     // console.log('Acc Rcvd Copmanies: ', AccReceived);
      //   }
      //   if(companyData[i].CurrentStage === 'Accounting Completed') {
      //     AccCompleted.push(companyData[i]);
      //     // console.log('Acc Completed Copmanies: ', AccCompleted);
      //   }
      // }
      console.log('salesClosing before map: ', salesClosing);
      let salesClosingMap = this.state.salesClosing.map((records, index) => {
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
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        )
      })
      let salesClosedMap = this.state.salesClosed.map((records, index) => {
        return (
          <Draggable id='draggable' draggableId={records._id} index={index} key={index} className='card'>
            {(provided, snapshot) => (
              <div>
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <p className='records'>{records.Name}</p>
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Draggable>
        )
      })
      let SCReceivedMap = this.state.SCReceived.map((records, index) => {
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
      })
      let SCCompletedMap = this.state.SCCompleted.map((records, index) => {
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
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        )
      })
      let OpsReceivedMap = this.state.OpsReceived.map((records, index) => {
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
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        )
      })
      let OpsOngoingMap = this.state.OpsOngoing.map((records, index) => {
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
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        )
      })
      let OpsCompletedMap = this.state.OpsCompleted.map((records, index) => {
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
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        )
      })
      let AccReceivedMap = this.state.AccReceived.map((records, index) => {
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
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        )
      })
      let AccCompletedMap = this.state.AccCompleted.map((records, index) => {
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
                </div>
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        )
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
                <Droppable id='droppable' droppableId='salesClosing' isDropDisabled={false} className='dropBox'>
                  {(provided, snapshot) => (
                    <div className='mappedItem' ref={provided.innerRef}>
                      {salesClosingMap}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div className='subRight'>
                  Closed
                </div>
                <Droppable id='droppable' droppableId='salesClosed' className='dropBox'>
                  {(provided, snapshot) => (
                    <div className='mappedItem' ref={provided.innerRef}>
                      {salesClosedMap}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                </div>
                <div className="column">
                  Sales Coordinator<hr/><br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <Droppable id='droppable' droppableId='SCReceived' className='dropBox'>
                    {(provided, snapshot) => (
                      <div className='mappedItem' ref={provided.innerRef}>
                        {SCReceivedMap}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className='subRight'>
                    Completed
                  </div>
                  <Droppable id='droppable' droppableId='SCCompleted' className='dropBox'>
                    {(provided, snapshot) => (
                      <div className='mappedItem' ref={provided.innerRef}>
                        {SCCompletedMap}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
              </div>
              <div className="column operations">
                  Operations<hr/><br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <Droppable id='droppable' droppableId='OpsReceived' className='dropBox'>
                    {(provided, snapshot) => (
                      <div className='mappedItem' ref={provided.innerRef}>
                        {OpsReceivedMap}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className='middle'>
                    Ongoing
                  </div>
                  <Droppable id='droppable' droppableId='OpsOngoing' className='dropBox'>
                    {(provided, snapshot) => (
                      <div className='mappedItem' ref={provided.innerRef}>
                        {OpsOngoingMap}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className='subRight'>
                    Completed
                  </div>
                  <Droppable id='droppable' droppableId='OpsCompleted' className='dropBox'>
                    {(provided, snapshot) => (
                      <div className='mappedItem' ref={provided.innerRef}>
                        {OpsCompletedMap}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
              </div>
              <div className="column">
                  Accounting<hr/><br/>
                  <div className='subLeft'>
                    Received
                  </div>
                  <Droppable id='droppable' droppableId='AccReceived' className='dropBox'>
                    {(provided, snapshot) => (
                      <div className='mappedItem' ref={provided.innerRef}>
                        {AccReceivedMap}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className='subRight'>
                    Completed
                  </div>
                  <Droppable id='droppable' droppableId='AccCompleted' className='dropBox'>
                    {(provided, snapshot) => (
                      <div className='mappedItem' ref={provided.innerRef}>
                        {AccCompletedMap}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
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
