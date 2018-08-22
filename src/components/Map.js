import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

/*For animation of marker*/
const google = window.google;

/* This code is placed outside the component code intenionally.
 * This prevents the map for re rendering when only a marker
 * needs to be re rendered. This solution was taken from an 
 * answer of a user at the issue number 220 for the 
 * react google maps framework, which is at the 
 * link https://github.com/tomchentw/react-google-maps/issues/220.
 * This code initializes the map the markers and the info windows*/
const RenderMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: props.center.lat, lng: props.center.lng } }
        defaultZoom = { 13 }
        role = 'application'
      >
      {props.markers.map((marker =>
        <Marker role='button' onClick={() => props.onToggle(marker)} 
        key = {`${marker.lat} ${marker.lng}`}  
        position = {{lat: marker.lat, lng: marker.lng}}
        animation = {marker.animate ? google.maps.Animation.BOUNCE : null}>
        {marker.isVisible && <InfoWindow role='button' onCloseClick={() => props.onToggle(marker,false)}>
          <div><img src={marker.img} alt={marker.location + ' in Paris, France'} /><p>{marker.location}</p></div></InfoWindow>}
        </Marker>
      ))}
      </GoogleMap>
   ));

class Map extends Component {

   render() {

   return(
      <div>
        <RenderMap
          containerElement={ <div className="map-container"/> }
          mapElement={ <div className="map" /> }
          center = {this.props.center}
          markers = {this.props.markers}
          onToggle = {this.props.onToggle}
        />
      </div>
   );

   }
};

export default Map;