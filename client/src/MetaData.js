import React, { Component } from 'react';
import './App.css';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import TableHeaderColumn from 'material-ui/Table';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import axios from 'axios';
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});
const stages = ['Closing', 'Closed', 'SCReceived', 'SCCompleted', 'Operations Received', 'Operations Ongoing', 'Operations Completed', 'Accounting Received', 'Accounting Completed'];

class MetaData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      companyData: []
    }
    this.change = this.change.bind(this);
  }

  change() {
    console.log('state in MetaData.js: ', this.state);
  }

  componentWillReceiveProps() {
    console.log('this.props in MetaData.js: ', this.props)
  }

  componentDidMount() {
  }

  render() {
    if (this.props.metaData) {
      return (
        <div onClickk={this.change}>
          <p>MetaData</p>
        </div>
      )
    } else {
      return (
        <p onClick={this.change}>Loading...</p>
      )
    }
  }
}

export default MetaData;
