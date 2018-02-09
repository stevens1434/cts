import React, { Component } from 'react';
import './App.css';
import SalesDash from './SalesDash';
import SalesCoordinatorDash from './SalesCoordinatorDash';
import OperationsDash from './OperationsDash';
import AccountingDash from './AccountingDash';
import { MuiThemeProvider, theme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
// import Card, { CardHeader, CardTitle, CardText} from 'material-ui/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
require('dotenv').config();

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
    this.init = this.init.bind(this);
    this.draggable = this.draggable.bind(this);
    this.droppable = this.droppable.bind(this);
  }

  init(initial) {

  }

  onDragStart = (initial) => {
    // console.log('___result onDragStart___: ', initial);
    this.init(initial);
  }

  onDragEnd = (result) => {
    // console.log('___result onDragEnd___: ', result);
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
        <div className='mainGrid'>
          <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
            <MuiThemeProvider theme={theme}>
              <Grid container spacing={8}>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
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
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
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
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
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
                </Grid>
                <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                  <AccountingDash
                    user={this.props.user}
                    companyData={this.props.companyData}
                    AccReceived={this.props.AccReceived}
                    AccCompleted={this.props.AccCompleted}
                    handlepropsChange={this.handlepropsChange}
                    Completed={this.props.Completed}
                  />
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </DragDropContext>
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

export default CtsMain;
