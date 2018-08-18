import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import ListView from './components/ListView';

class App extends Component {

	state = {
		center : {location: "Eiffel Tower", lat: 48.858372, lng: 2.2945},
		markersShown : [{
			location: "Les Invalides",
			lat: 48.858410,
			lng: 2.313020
		},{
			location: "Le Parc des Princes",
			lat: 48.841050,
			lng: 2.254560
		},{
			location: "Quai Branly Museum",
			lat: 48.860540,
			lng: 2.295630
		},{
			location: "Lido de Paris",
			lat: 48.87236,
			lng: 2.300561
		},{
			location: "Pont des Arts",
			lat: 48.85833,
			lng: 2.337500
		}],
		allMarkers : []
	}

	//When component mounts, get the coordinates from the api
	componentDidMount() {

	};


	render() {
		return (
		  <div className="App">
		    <ListView/>
		    <Map center={this.state.center} markers={this.state.markersShown}/>
		  </div>
		);
		}
	}

export default App;
