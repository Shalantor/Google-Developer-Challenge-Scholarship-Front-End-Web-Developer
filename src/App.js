import React, { Component } from 'react';
import './App.css';
import Geocode from 'react-geocode';
import Map from './components/Map';
import ListView from './components/ListView';

class App extends Component {

	state = {
		center : {}
	}

	//When component mounts, get the books from the API
	componentDidMount() {
		Geocode.fromAddress("Eiffel Tower").then((response) =>{
			this.setState({
				center : response.results[0].geometry.location
			})
		});
	};


	render() {
		return (
		  <div className="App">
		    <ListView/>
		    <Map center={this.state.center}/>
		  </div>
		);
		}
	}

export default App;
