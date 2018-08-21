import React, { Component } from 'react';

class ListView extends Component {

  state = {
    input : '',
    showErrorWindow : true,
    showList : true
  }

  //Update input
  updateInput = (input) => {
    this.setState({
      input : input
    })
  }

  //close the error window
  closeErrorWindow = () => {
    this.setState({
      showErrorWindow : false
    })
  }

  //Toggle list view
  toggleList = () => {
    this.setState(state => ({
      showList : !state.showList
    }))
  }

   render() {

   return(
    <div>
      <div className="nav">
        <button onClick={() => this.toggleList()} 
          className={"nav-button " + (this.state.showList ? '' : 'move-left move-left-small')}>
          <i className="fa fa-bars"></i>
        </button>
      </div>
      <div className={"list-view" + (this.state.showList ? '' : 'hidden')}>
        <h1>Locations</h1>
        <div className="filter">
          <input type="text" placeholder="Filter locations" onChange={(event) => this.updateInput(event.target.value)}/>
          <button onClick={() => this.props.onFilter(this.state.input)}><i className="fa fa-filter">Filter</i></button>
        </div>
        <ul className="list">
          {this.props.markers.map((marker =>
            <li onClick={() => this.props.onChoose(marker,true)} key = {marker.location} >{marker.location}</li>
          ))}
        </ul>
      </div>
      {this.props.errorsHappened && this.state.showErrorWindow &&
        <div className="error-window">
        <button onClick={() => this.closeErrorWindow()} 
          className="close-button"><i className="fa fa-times"/></button>
          <p>Some images or data may have 
          failed to be downloaded properly.
          You can try to refresh the page to fix this error.</p>
        </div>
      }
    </div>
   );

   }
};

export default ListView;