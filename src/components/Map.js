import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Map extends Component {

   render() {

   const Map = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
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