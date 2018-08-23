import React, { Component } from 'react';
import { withScriptjs,withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

/* This code is placed outside the component code intenionally.
 * This prevents the map for re rendering when only a marker
 * needs to be re rendered. This solution was taken from an 
 * answer of a user at the issue number 220 for the 
 * react google maps framework, which is at the 
 * link https://github.com/tomchentw/react-google-maps/issues/220.
 * This code initializes the map the markers and the info windows*/
const RenderMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: props.center.lat, lng: props.center.lng } }
        defaultZoom = { 13 }
        role = 'application'
      >
      {props.markers.map((marker =>
        <Marker role='button' onClick={() => props.onToggle(marker)} 
        key = {`${marker.lat} ${marker.lng}`}  
        position = {{lat: marker.lat, lng: marker.lng}}
        animation = {marker.animate ? window.google.maps.Animation.BOUNCE : null}>
        {marker.isVisible && <InfoWindow tabIndex = '0' role='button' onCloseClick={() => props.onToggle(marker,false)}>
          <div><img src={marker.img} alt={marker.location + ' in Paris, France'} /><p>{marker.location}</p></div></InfoWindow>}
        </Marker>
      ))}
      </GoogleMap>
   )));

class Map extends Component {

  state = {
    showErrorWindow : false
  }

  componentDidCatch(error,info){
    this.setState ({
      showErrorWindow : true
    });
  }

  //close the error window
  closeErrorWindow = () => {
    this.setState({
      showErrorWindow : false
    })
  }

   render() {

   return(
      <div>
        <RenderMap
          containerElement={ <div className="map-container"/> }
          mapElement={ <div className="map" /> }
          loadingElement = { <div className="map" /> }
          googleMapURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBD6flB_1bjpFaxI4k_xi07fl9GbCosRYU'
          center = {this.props.center}
          markers = {this.props.markers}
          onToggle = {this.props.onToggle}
        />
        {this.state.showErrorWindow &&
          <div>
            <div className="map-container"/>
            <div className="map" />
            <div className="error-window">
            <button onClick={() => this.closeErrorWindow()} 
              className="close-button"><i className="fa fa-times"/></button>
              <p>Some images or data may have 
              failed to be downloaded properly.
              You can try to refresh the page to fix this error.</p>
            </div>
          </div>
        }
      </div>
   );

   }
};

export default Map;