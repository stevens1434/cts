import React, { Component } from 'react';
import './App.css';
// import MyMgtSummaryChart from './MyMgtSummaryChart';
// import MyMgtCompare from './MyMgtCompare';
// import MyMgtEff from './MyMgtEff';
// import MetaData from './MetaData';
// import MyMgtMap from './MyMgtMap';
// import Grid from 'material-ui/Grid';
import axios from 'axios';
// import Paper from 'material-ui/Paper';
// import Card from 'material-ui/Card';

class IndividCo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
    this.change = this.change.bind(this);
  }

  change() {
    console.log('state in IndividCo.js: ', this.state);
  }

  componentWillReceiveProps() {
    console.log('props in IndividCo.js CompWillRcvProps: ', this.props);
  }

  componentDidMount() {
    let url = window.location.pathname
    // let url2 = this._reactInternalFiber.return.stateNode.context.router.route.location.pathname;
    // console.log("params in IndividTrail: ", this._reactInternalFiber.return.stateNode.context.router.route.location.pathname)
    // console.log("window.location: ", window.location.pathname)
    var id = url.substring(url.lastIndexOf('/') + 1);
    // console.log('information in compDidMt in IndividCo.js: ', id);
    fetch('userCompanies/individCo/'+id, {
      method: 'GET'
    })
    .then(response => {
      console.log('response: ', response);
    }).catch(err => {
      console.log('err: ', err);
    })
  }

  render() {
      console.log('===== props in IndividCo.js: ', this.props);
      return (
        <div onClick={this.change}>
          <p>IndividCo</p>
        </div>
      )
  }
}

export default IndividCo;
