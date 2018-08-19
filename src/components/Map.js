import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const google = window.google;

class Map extends Component {

   render() {

   const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: this.props.center.lat, lng: this.props.center.lng } }
        defaultZoom = { 13 }
      >
      {this.props.markers.map((marker =>
        <Marker onClick={() => this.props.onToggle(marker.location)} 
        key = {`${marker.lat} ${marker.lng}`}  
        position = {{lat: marker.lat, lng: marker.lng}}
        animation = {marker.animate ? google.maps.Animation.DROP : null}>
        {marker.isVisible && <InfoWindow onCloseClick={() => this.props.onToggle(marker.location)}><div>{marker.location}</div></InfoWindow>}
        </Marker>
      ))}
      </GoogleMap>
   ));

   return(
      <div>
        <Map
          containerElement={ <div className="map-container"/> }
          mapElement={ <div className="map" /> }
        />
      </div>
   );

   }
};

export default Map;