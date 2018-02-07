import React, { Component } from 'react';
import './App.css';
import Grid from 'material-ui/Grid';
import {PieChart, Pie, Legend, Tooltip, ResponsiveContainer} from 'recharts';
import axios from 'axios';
// import Card from 'material-ui/Card';
// import ExpansionPanel, {
//   ExpansionPanelSummary,
//   ExpansionPanelDetails,
// } from 'material-ui/ExpansionPanel';
// import Typography from 'material-ui/Typography';
// import { Droppable, Draggable } from 'react-beautiful-dnd';
require('dotenv').config();
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});


class MyMgtSummaryChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.change = this.change.bind(this);
  }

  change() {
    console.log('state in myManagement.js: ', this.state);
  }

  componentDidMount() {

  }

  render() {
    let props = this.props;
    console.log('props in mymgtsummarychart: ', props);
      return (
        <p>Summary Chart</p>
      )
  }
}

export default MyMgtSummaryChart;
