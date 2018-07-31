import React, { Component } from 'react';
import MoveMenu from './MoveMenu'

class Book extends Component {

	render() {
		const {book, onRemove} = this.props;
		return (
			<div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
	            <MoveMenu book = {book} onRemove={onRemove}/>
	          </div>
	          <div className="book-title">{book.title}</div>
	          <div className="book-authors">{book.authors[0]}</div>
	        </div>
		)
	}
}

export default Book