import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import ListView from './components/ListView';

const apiUrl = (lat,lng,query) => `https://api.foursquare.com/v2/venues/search?
	client_id=BP1WT40QN3RRWCSYCXFS3IQHZJT0YCLB43A5XSZ24CDBXKLE&
	client_secret=R5JUNTFIBPUPXNDYVGMSFCAQ15BS4KD0BEEJKH4ETFZPQ2E1&
	v=20180323&limit=10&ll=${lat},${lng}&query=${query}`;

const photoUrl = (id) => `https://api.foursquare.com/v2/venues/${id}/photos?
	client_id=BP1WT40QN3RRWCSYCXFS3IQHZJT0YCLB43A5XSZ24CDBXKLE&
	client_secret=R5JUNTFIBPUPXNDYVGMSFCAQ15BS4KD0BEEJKH4ETFZPQ2E1&v=20180323`;

const markers = [{
			location: "Les Invalides",
			lat: 48.858410,
			lng: 2.313020,
			isVisible : false,
			animate : false
		},{
			location: "Le Parc des Princes",
			lat: 48.841050,
			lng: 2.254560,
			isVisible : false,
			animate : false
		},{
			location: "Quai Branly Museum",
			lat: 48.860540,
			lng: 2.295630,
			isVisible : false,
			animate : false
		},{
			location: "Lido de Paris",
			lat: 48.87236,
			lng: 2.300561,
			isVisible : false,
			animate : false
		},{
			location: "Pont des Arts",
			lat: 48.85833,
			lng: 2.337500,
			isVisible : false,
			animate : false
		}];

class App extends Component {

	state = {
		center : {location: "Eiffel Tower", lat: 48.858372, lng: 2.2945},
		markersShown : markers,
		allMarkers : markers
	}

	//When component mounts, get the coordinates from the api
	componentDidMount() {
		for(let marker of this.state.allMarkers){
			fetch(apiUrl(marker.lat,marker.lng,marker.location))
			.then(function(response) {
			    return response.json();
			})
			.then(function(myJson) {
			  fetch(photoUrl(myJson.response.venues[0].id))
			  .then(function(response) {
			    return response.json();
				})
			  .then(function(myJson) {
			  	console.log(myJson);
			  })
			});
		}
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
		this.setState((state) => ({
			markersShown : state.markersShown.map((marker) => {
				if(marker.location === location){
					marker.isVisible = !marker.isVisible;
				}
				return marker;
			})
		}));
	}

	//animate marker
	animateMarker = (location) => {
		this.setState((state) => ({
			markersShown : state.markersShown.map((marker) => {
				if(marker.location === location){
					marker.isVisible = true;
					marker.animate = true;
				}
				return marker;
			})
		}));
	}

	render() {
		return (
		  <div className="App">
		    <ListView onChoose={this.animateMarker} markers={this.state.markersShown} onFilter = {this.filterLocations}/>
		    <Map center={this.state.center} onToggle = {this.toggleMarker} markers={this.state.markersShown}/>
		  </div>
		);
		}
	}

export default App;
