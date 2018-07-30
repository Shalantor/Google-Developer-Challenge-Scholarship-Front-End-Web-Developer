import React, { Component } from 'react';

class MoveMenu extends Component{

	render() {
		return (
                <div className="book-shelf-changer">
                  <select value={this.props.book.shelf} onChange={(value)=>this.props.onRemove(this.props.book)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>			
		)
	}
}

export default MoveMenu