import React, { Component } from 'react';

class ListView extends Component {

   render() {

   return(
    <div>
      <div className="nav">
        <button><i className="fa fa-bars"></i></button>
      </div>
      <div className="list-view">
        <h1>Locations</h1>
        <div className="filter">
          <input type="text" placeholder="Filter locations"/>
          <button><i className="fa fa-filter">Filter</i></button>
        </div>
        <ul className="list">
          {this.props.markers.map((marker =>
            <li key = {marker.name} >{marker.location}</li>
          ))}
        </ul>
      </div>
    </div>
   );

   }
};

export default ListView;