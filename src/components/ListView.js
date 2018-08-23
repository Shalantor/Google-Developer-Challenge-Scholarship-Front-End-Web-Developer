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

      <header className="nav">
        <button aria-label="Display List of Locations" onClick={() => this.toggleList()} 
          className={"nav-button " + (this.state.showList ? '' : 'move-left move-left-small')}>
          <i className="fa fa-bars"></i>
        </button>
      </header>

      <section className={"list-view" + (this.state.showList ? '' : 'hidden')}>
        <h1>Locations</h1>
        <div className="filter">
          <input aria-labelledby="filter" type="text" placeholder="Filter locations" onChange={(event) => this.updateInput(event.target.value)}/>
          <button id="filter" onClick={() => this.props.onFilter(this.state.input)}><i className="fa fa-filter">Filter</i></button>
        </div>
        <ul className="list">
          {this.props.markers.map((marker =>
            <li tabIndex='0' role='button' onClick={() => this.props.onChoose(marker,true)} key = {marker.location} >{marker.location}</li>
          ))}
        </ul>
      </section>
      
      {this.props.errorsHappened && this.state.showErrorWindow &&
        <div className="error-window">
        <button onClick={() => this.closeErrorWindow()} 
          className="close-button"><i className="fa fa-times"/></button>
          <p>Some images or data may have 
          failed to be downloaded properly.
          You can try to refresh the page to fix this error.</p>
        </div>
      }
      <aside className='data-sources'>
        Images provided by <a href='https:\/\/foursquare.com'>foursquare</a> API
      </aside>
    </div>
   );

   }
};

export default ListView;