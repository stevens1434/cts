import React, { Component } from 'react';
import './App.css';
// import Grid from 'material-ui/Grid';
// import axios from 'axios';
import { MuiThemeProvider, theme } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';

class IndividCoData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      individData: {}
    }
    this.change = this.change.bind(this);
  }

  change() {
  }

  componentWillReceiveProps() {
    // console.log('props in IndividCo.js CompWillRcvProps: ', this.props);
  }

  render() {
      if (this.props.individData) {
        const individData = this.props.individData;
        return (
          <div>
            {individData.map((records, index) => (
              <div key={index}>
                <h3>{records.Name}</h3>
                <p>{records.Contacts[0].Primary.Phone.Business.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}</p>
                <p>{records.Address.Street}</p>
                <p>{records.Address.City}, {records.Address.State}</p>
                <p>{records.Address.Zip}</p>
              </div>
            ))}
          </div>
        )
      } else {
        return (
          <p>Loading...</p>
        )
      }
  }
}

export default IndividCoData;
