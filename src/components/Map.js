import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {

   render() {

   const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: this.props.center.lat, lng: this.props.center.lng } }
        defaultZoom = { 13 }
      >
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