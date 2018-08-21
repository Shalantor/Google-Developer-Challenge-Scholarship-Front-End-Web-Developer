import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const google = window.google;

const RenderMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: props.center.lat, lng: props.center.lng } }
        defaultZoom = { 13 }
      >
      {props.markers.map((marker =>
        <Marker onClick={() => props.onToggle(marker)} 
        key = {`${marker.lat} ${marker.lng}`}  
        position = {{lat: marker.lat, lng: marker.lng}}
        animation = {marker.animate ? google.maps.Animation.BOUNCE : null}>
        {marker.isVisible && <InfoWindow onCloseClick={() => props.onToggle(marker,false)}>
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