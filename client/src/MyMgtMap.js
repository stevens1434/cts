/*global google*/
import React, { Component } from 'react';
import './App.css';
import { GoogleMapLoader, GoogleMap, DirectionsRenderer, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import axios from 'axios';

class MyMgtMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      companyData: []
    }
    this.change = this.change.bind(this);
  }

  change() {
    console.log('state in MyMgtSummaryChart.js: ', this.state);
  }

  componentWillReceiveProps() {
    if (this.props.companyData.length > 0) {

      let refs = this.refs;
      let companyData = this.props.companyData;
      console.log('companyData: ', companyData);
      let address = '';
      for (var i in companyData) {
        let addressObj = companyData[i].Address;
        let street = companyData[i].Address.Street;
        let unit = companyData[i].Address.UnitNumber;
        let city = companyData[i].Address.City;
        let state = companyData[i].Address.State;
        let zip = companyData[i].Address.Zip;
        address = street+'+'+city+'+'+state; //REMOVED: +'+'+zip
        let formattedAddress = address.replace(/\s/g, '+');
        console.log('address: ', formattedAddress);
        axios.post('userCompanies/api', {
          data: formattedAddress
        })
        .then(response => {
          console.log('response form api: ', response);

        }).catch(err => {
          console.log('err: ', err);
        })
        // //SET INITIAL LOCATION AND ZOOM
        // let map = new google.maps.Map(refs.map, {
        //   center: {
        //     lat: 42.7325,
        //     lng: 84.5555
        //   },
        //   zoom: 10,
        //   title: 'example title'
        // })
        //
        // //ITERATE THROUGH AND SET MARKERS FOR EACH POSITION
        // //for (xxx) {
        // let marker = new google.maps.Marker({
        //   position: {
        //     lat: 42.7325,
        //     lng: 84.5555
        //   },
        //   label: 'lansing label',
        //   icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569',
        //   map: map
        // })

      }

      // //INFOWINDOW FOR EACH ITERATED THROUGH MARKER
      // let infoWindow = new google.maps.InfoWindow({
      //   content: 'lansing content'
      // });
      // let listener = google.maps.event.addListener(marker, 'click', (function(marker) {
      //   return function() {
      //     infoWindow.setContent('lansing name');
      //     infoWindow.open(map, marker);
      //   }
      // })(marker));
      // let mark = new google.maps.Marker({
      //   position: {
      //     lat: 42.7325,
      //     lng: 84.5555
      //   },
      //   icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      //   map: map
      // })

      //DONE

      // let nameAndStageData = [];
      // let chartData = [];
      // for (var i in companyData) {
      //   let nameAndStageDataInfo = {}
      //   nameAndStageDataInfo.name = companyData[i].Name;
      //   let data = []
      //   for (var j in companyData[i].StageHistory) {
      //     // console.log('companyData[i].StageHistory: ', companyData[i].StageHistory[j].DateEntered);
      //     let dataInfo = [];
      //     let dateData;
      //     let dates = function() {
      //       let dateStr = companyData[i].StageHistory[j].DateEntered
      //       // console.log('dateData: ', dateData);
      //       dateData = new Date(dateStr).getTime();
      //       // console.log('dateStr: ', dateStr);
      //     }
      //     dates();
      //     dataInfo.push(dateData);
      //     dataInfo.push(companyData[i].StageHistory[j].StageName);
      //     dataInfo.push(companyData[i].Name);
      //     data.push(dataInfo);
      //     chartData.push(dataInfo);
      //   }
      //   nameAndStageDataInfo.columns = ['date', 'stage', 'name'];
      //   nameAndStageDataInfo.points = data;
      //   // console.log('data: ', data);
      //   nameAndStageData.push(nameAndStageDataInfo);
      // }

      // this.setState({
      //   nameAndStageData: nameAndStageData,
      //   chartData: chartData,
      //   companyData: companyData
      // })
    }
  }

  componentDidMount() {
  }

  render() {
    if (this.state.companyData) {
      const location = {lon: 42.7325, lat: 84.5555}
      return (
        <div style={{height: '520px', width: '620px'}} onClick={this.change} className='mapitem mapmap' ref='map'>
          <p>MyMgtMap</p>
          <pre>{JSON.stringify(location, null, 2)}</pre>
          <div className='mapMarker' ref='marker'></div>
        </div>
      )
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
}

export default MyMgtMap;
