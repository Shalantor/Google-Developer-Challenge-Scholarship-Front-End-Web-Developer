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
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    </div>
   );

   }
};

export default ListView;