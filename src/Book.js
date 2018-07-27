import React, { Component } from 'react';
import MoveMenu from './MoveMenu'

class Book extends Component {

	render() {
		console.log(this.props.url)
		return (
			<div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.url }}></div>
	            <MoveMenu/>
	          </div>
	          <div className="book-title">{this.props.title}</div>
	          <div className="book-authors">{this.props.author}</div>
	        </div>
		)
	}
}

export default Book