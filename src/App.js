import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import ListView from './components/ListView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ListView/>
        <Map/>
      </div>
    );
  }
}

export default App;
