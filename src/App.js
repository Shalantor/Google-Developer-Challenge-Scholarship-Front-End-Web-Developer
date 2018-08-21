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
	client_secret=R5JUNTFIBPUPXNDYVGMSFCAQ15BS4KD0BEEJKH4ETFZPQ2E1
	&v=20180323&limit=1`;

const markers = [{
			location: "Les Invalides",
			lat: 48.858410,
			lng: 2.313020,
			isVisible : false,
			animate : false,
			img : undefined
		},{
			location: "Le Parc des Princes",
			lat: 48.841050,
			lng: 2.254560,
			isVisible : false,
			animate : false,
			img : undefined
		},{
			location: "Quai Branly Museum",
			lat: 48.860540,
			lng: 2.295630,
			isVisible : false,
			animate : false,
			img : undefined
		},{
			location: "Lido de Paris",
			lat: 48.87236,
			lng: 2.300561,
			isVisible : false,
			animate : false,
			img : undefined
		},{
			location: "Pont des Arts",
			lat: 48.85833,
			lng: 2.337500,
			isVisible : false,
			animate : false,
			img : undefined
		}];

class App extends Component {

	state = {
		center : {location: "Eiffel Tower", lat: 48.858372, lng: 2.2945},
		markersShown : markers,
		allMarkers : markers,
		errorsHappened : false
	}

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

	//Show info of marker, helper function to determine if loading api is needed
	loadInfo = (marker,animate) => {
		const that = this;
		if(marker.img === undefined && !this.state.errorsHappened){
			fetch(apiUrl(marker.lat,marker.lng,marker.location))
			.then(function(response) {
			    if(response.status === 200){
			    	return response.json();
			    }
			    else{
			    	throw new Error();
			    }
			})
			.catch(error => 
				that.setState((state) => ({
					errorsHappened : true,
					markersShown : state.markersShown.map((m) => {
					if(marker.location === m.location){
						m.isVisible = animate ? true : !m.isVisible;
						m.animate = animate;
					}
					return m;
				})
			})))
			.then(function(myJson) {
			  fetch(photoUrl(myJson.response.venues[0].id))
			  .then(function(response) {
				    if(response.status === 200){
				    	return response.json();
				    }
				    else{
				    	throw new Error();
				    }
				})
			  .then(function(myJson) {
				that.setState((state) => ({
					markersShown : state.markersShown.map((m) => {
						if(marker.location === m.location){
							m.img = myJson.response.photos.items[0].prefix + '100x100' + myJson.response.photos.items[0].suffix;
							m.isVisible = animate ? true : !m.isVisible;
							m.animate = animate;
						}
						return m;
					})
				}));
			  })
			  .catch(error => 
				that.setState((state) => ({
					errorsHappened : true,
					markersShown : state.markersShown.map((m) => {
					if(marker.location === m.location){
						m.isVisible = animate ? true : !m.isVisible;
						m.animate = animate;
					}
					return m;
				})
				})))
			});
		}
		else{
			that.setState((state) => ({
				markersShown : state.markersShown.map((m) => {
					if(marker.location === m.location){
						m.isVisible = animate ? true : !m.isVisible;
						m.animate = animate;
					}
					return m;
				})
			}));
		}
	}

	render() {
		return (
		  <div className="App">
		    <ListView errorsHappened={this.state.errorsHappened} onChoose={this.loadInfo} markers={this.state.markersShown} onFilter = {this.filterLocations}/>
		    <Map center={this.state.center} onToggle = {this.loadInfo} markers={this.state.markersShown}/>
		  </div>
		);
		}
	}

export default App;
