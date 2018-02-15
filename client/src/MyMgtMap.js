/*global google*/
import React, { Component } from 'react';
import './App.css';
import { GoogleMapLoader, GoogleMap, DirectionsRenderer, Marker, Geocoder } from "react-google-maps";
import axios from 'axios';
const nf = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

class MyMgtMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      companyData: []
    }
    this.change = this.change.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    // this.renderInfoWindowContent = this.renderInfoWindowContent.bind(this);
  }

  change() {
    console.log('state in MyMgtSummaryChart.js: ', this.state);
  }

  // renderInfoWindowContent(companyData) {
  //   return (
  //     '<div>'+
  //       '<h1>'+companyData.Name+'</h1>'+
  //       '<p>'+companyData.CurrentStage+'</p>'+
  //       '<p>'+companyData.Owner+'</p>'+
  //       '<p>'+nf.format(companyData.Amount)+'</p>'+
  //     '</div>'
  //   )
  // }

  renderMarker(companyData, lat, lon, map, iconImage) {
    console.log('companyData in renderMarker: ', companyData);
    let mark = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lon
      },
      icon: iconImage,
      animation: google.maps.Animation.DROP,
      map: map
    })
    let renderInfoWindowContent =
        `<div>`+
          '<h3>'+companyData.Name+'</h3>'+
          '<p>Stage: '+companyData.CurrentStage+'</p>'+
          '<p>Owner:'+companyData.Owner+'</p>'+
          '<p>Amount:'+nf.format(companyData.Amount)+'</p>'+
        '</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: renderInfoWindowContent
    });
    let listener = google.maps.event.addListener(mark, 'mouseover', (function(mark) {
      return function() {
        infoWindow.setContent(renderInfoWindowContent);
        infoWindow.open(map, mark);
      }
    })(mark));
    let listener2 = google.maps.event.addListener(mark, 'mouseout', (function(mark) {
      return function() {
        infoWindow.close();
      }
    })(mark));
  }

  componentWillReceiveProps() {
    const companyData = this.props.companyData;
    const refs = this.refs;
    let marker = new google.maps.Marker();
    console.log('refs: ', refs);
    let addresses = [];
    if (this.props.companyData.length > 0) {
      axios.post('userCompanies/api')
      .then(response => {
        console.log('STARTING FOR LOOP AND GEOCACHING');
        let apiKey = response.data
        const map = new google.maps.Map(refs.map, {
          center: {
            lat: 42.607111,
            lng: -83.286786
          },
          zoom: 9,
          styles: [
            { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] },
            { "elementType": "labels", "stylers": [ { "visibility": "off" } ] },
            { "featureType": "poi", "stylers": [ { "color": "#cda1ae" } ] },
            { "featureType": "road.arterial", "stylers": [ { "visibility": "off" } ] },
            { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "saturation": 75 } ] },
            { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#ae1936" }, { "saturation": -50 }, { "lightness": 45 } ] },
            { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [ { "color": "#ae1936" } ] },
            { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#9ad0d3" } ] },
            { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }
          ]
        })
        marker = new google.maps.Marker({
          position: {
            lat: 42.607111,
            lng: -83.286786
          },
          icon: 'http://res.cloudinary.com/stevens1434/image/upload/c_scale,h_25/v1518656112/CTS_mb4lr0_nk4qop.png',
          map: map
        })
        let address = '';
        for (var i in companyData) { //for loop begin
          let lat = parseFloat(companyData[i].Address.Coorid.Lat);
          let lon = parseFloat(companyData[i].Address.Coorid.Lon);
          let street = companyData[i].Address.Street;
          let unit = companyData[i].Address.UnitNumber;
          let city = companyData[i].Address.City;
          let state = companyData[i].Address.State;
          let zip = companyData[i].Address.Zip;
          address = street+' '+city+' '+state; //REMOVED: +'+'+zip
          let formattedAddress = address.replace(/\s/g, '+');
          let currentStage = companyData[i].CurrentStageAlt
          if (currentStage === 'salesClosing' || currentStage === 'salesClosed') {
            let iconImage = 'http://res.cloudinary.com/stevens1434/image/upload/c_scale,h_25/v1518564977/66-256_dc37nf.png';
            this.renderMarker(companyData[i], lat, lon, map, iconImage);
          } else if (currentStage === 'SCReceived' || currentStage === 'SCCompleted') {
            let iconImage = 'http://res.cloudinary.com/stevens1434/image/upload/c_scale,h_25/v1518564933/list-256_kop5y8.png';
            this.renderMarker(companyData[i], lat, lon, map, iconImage);
          } else if (currentStage === 'OpsReceived' || currentStage === 'OpsOngoing' || currentStage === 'OpsCompleted') {
            let iconImage = 'http://res.cloudinary.com/stevens1434/image/upload/c_scale,h_25/v1518565001/tools-256_vlzen5.png';
            this.renderMarker(companyData[i], lat, lon, map, iconImage);
          } else if (currentStage === 'AccReceived' || currentStage === 'AccCompleted') {
            let iconImage = 'http://res.cloudinary.com/stevens1434/image/upload/c_scale,h_25/v1518565004/dollar-bills-256_paddjo.png';
            this.renderMarker(companyData[i], lat, lon, map, iconImage);
          } else {
            console.log('NO MARKER TO RENDER');
          }
        } //for loop end
      }).catch(err => {
        console.log('err: ', err);
      });
    }
  }

  componentDidMount() {
  }

  render() {
    if (this.state.companyData) {
      return (
        <div style={{height: '500px', width: '100%'}} onClick={this.change} className='map' ref='map'>
          <pre>{JSON.stringify({lon: 42.7325, lat: 84.5555}, null, 2)}</pre>
          <div className='marker' ref='marker'></div>
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
