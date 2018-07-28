import React, { Component } from 'react';
import MoveMenu from './MoveMenu'

class Book extends Component {

	render() {
		const {book} = this.props;
		return (
			<div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.url }}></div>
	            <MoveMenu/>
	          </div>
	          <div className="book-title">{book.title}</div>
	          <div className="book-authors">{book.author}</div>
	        </div>
		)
	}
}

export default Book