import React, { Component } from 'react';

class ListView extends Component {

   render() {

   return(
    <div>
      <div className="nav">
        <h1>Locations</h1>
      </div>
      <div className="filter">
        <input type="text" placeholder="Filter locations"/>
      </div>
      <ul className="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
   );

   }
};

export default ListView;