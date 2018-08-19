import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import ListView from './components/ListView';

const markers = [{
			location: "Les Invalides",
			lat: 48.858410,
			lng: 2.313020,
			isVisible : false
		},{
			location: "Le Parc des Princes",
			lat: 48.841050,
			lng: 2.254560,
			isVisible : false
		},{
			location: "Quai Branly Museum",
			lat: 48.860540,
			lng: 2.295630,
			isVisible : false
		},{
			location: "Lido de Paris",
			lat: 48.87236,
			lng: 2.300561,
			isVisible : false
		},{
			location: "Pont des Arts",
			lat: 48.85833,
			lng: 2.337500,
			isVisible : false
		}];

class App extends Component {

	state = {
		center : {location: "Eiffel Tower", lat: 48.858372, lng: 2.2945},
		markersShown : markers,
		allMarkers : markers
	}

	//When component mounts, get the coordinates from the api
	componentDidMount() {

	};

	//Filter locations when button is pressed
	filterLocations = (input) => {
		if(input !== ''){
			this.setState((state) => ({
				markersShown : state.allMarkers.filter(marker => marker.location.includes(input))
			}));
		}
		else{
			this.setState({
				markersShown : this.state.allMarkers
			})
		}
	}

	//Toogle visibility of infowindow of marker
	toggleMarker = (location) => {
		console.log(location);
		this.setState((state) => ({
			markersShown : state.markersShown.map((marker) => {
				if(marker.location === location){
					marker.isVisible = !marker.isVisible;
				}
				return marker;
			})
		}));
	}

	render() {
		return (
		  <div className="App">
		    <ListView markers={this.state.markersShown} onFilter = {this.filterLocations}/>
		    <Map center={this.state.center} onToggle = {this.toggleMarker} markers={this.state.markersShown}/>
		  </div>
		);
		}
	}

export default App;
