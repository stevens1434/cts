import React, { Component } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
require('dotenv').config();

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
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.change = this.change.bind(this);
    this.draggable = this.draggable.bind(this);
    this.droppable = this.droppable.bind(this);
  }

  change(e) {
    console.log("this.state in CtsMain/Dashboard/SalesDash: ", this.state);
  }

  //Use HOOKS to do conditionals
  //ISSUES:
    //see Synchronous Reordering
    //
  //
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
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
          <div className='mappedItem' ref={provided.innerRef}> {map} {provided.placeholder} </div>
        )}
      </Droppable>
    )
  }

  componentDidMount() {
  }

  render() {
    if (this.props.user && this.props.companyData) {
      let salesClosingMap = this.props.salesClosing.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      let salesClosedMap = this.props.salesClosed.map((records, index) => {
        return ( <div>{this.draggable(records, index)}</div> )
      })
      return (
          <div onClick={this.change} className="column"> Sales<hr/><br/>
            <div className='subLeft'> Closing </div>
              <div>{this.droppable(salesClosingMap, 'salesClosing')}</div>
            <div className='subRight'> Closed </div>
              <div>{this.droppable(salesClosedMap, 'salesClosed')}</div>
          </div>
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
