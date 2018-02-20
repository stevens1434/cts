/*global google*/
import React, { Component } from 'react';
import './App.css';
import { GoogleMapLoader, GoogleMap, DirectionsRenderer, Marker, Geocoder } from "react-google-maps";
// import { MuiThemeProvider, theme } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
// import Card from 'material-ui/Card';

class IndividCoMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      individData: {}
    }
    this.change = this.change.bind(this);
  }

  change() {
  }

  componentDidMount() {
    if (this.props.Coorid) {
      let marker = new google.maps.Marker();
      const refs = this.refs;
      const lat = this.props.Coorid.Lat;
      const lon = this.props.Coorid.Lon;
      const map = new google.maps.Map(refs.map, {
        center: {
          lat: Number(lat),
          lng: Number(lon)
        },
        zoom: 8,
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
      });
      marker = new google.maps.Marker({
        position: {
          lat: 42.607111,
          lng: -83.286786
        },
        icon: 'http://res.cloudinary.com/stevens1434/image/upload/c_scale,h_25/v1518656112/CTS_mb4lr0_nk4qop.png',
        map: map
      });
      marker = new google.maps.Marker({
        position: {
          lat: Number(lat),
          lng: Number(lon)
        },
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        map: map
      });
    }
  }

  render() {
      if (this.props.Coorid) {
        const Coorid = this.props.Coorid;
        console.log('Coorid: ', Coorid);
        return (
          <div className='individCoMapContainer'>
            <div onClick={this.change} className='individCoMap' ref='map'>
              <pre>{JSON.stringify(Coorid, null, 2)}</pre>
              <div className='individCoMarker' ref='marker'></div>
            </div>
          </div>
        )
      } else {
        return (
          <p>Loading...</p>
        )
      }
  }
}

export default IndividCoMap;
