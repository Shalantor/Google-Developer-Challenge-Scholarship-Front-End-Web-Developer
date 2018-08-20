import React, { Component } from 'react';

class ListView extends Component {

  state = {
    input : ''
  }

  //Update input
  updateInput = (input) => {
    this.setState({
      input : input
    })
  }

   render() {

   return(
    <div>
      <div className="nav">
        <button><i className="fa fa-bars"></i></button>
      </div>
      <div className="list-view">
        <h1>Locations</h1>
        <div className="filter">
          <input type="text" placeholder="Filter locations" onChange={(event) => this.updateInput(event.target.value)}/>
          <button onClick={() => this.props.onFilter(this.state.input)}><i className="fa fa-filter">Filter</i></button>
        </div>
        <ul className="list">
          {this.props.markers.map((marker =>
            <li onClick={() => this.props.onChoose(marker.location)} key = {marker.location} >{marker.location}</li>
          ))}
        </ul>
      </div>
      {this.props.errorsHappened && 
        <div className="error-window">
          Some images or data may have 
          failed to be downloaded properly.
          You can try to refresh the page to fix this error.
        </div>
      }
    </div>
   );

   }
};

export default ListView;