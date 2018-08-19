import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {

   render() {

   const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: this.props.center.lat, lng: this.props.center.lng } }
        defaultZoom = { 13 }
      >
      {this.props.markers.map((marker =>
        <Marker key = {`${marker.lat} ${marker.lng}`}  position = {{lat: marker.lat, lng: marker.lng}}>
        {marker.isVisible && <InfoWindow><div>{marker.location}</div></InfoWindow>}
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