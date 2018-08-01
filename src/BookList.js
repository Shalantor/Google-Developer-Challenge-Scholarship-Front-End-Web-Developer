import React, { Component } from 'react';
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

class BookList extends Component {

	render () {
		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
	              <div>
	                <BookShelf changeShelf={this.props.changeShelf} title="Currently Reading" books={this.props.books.filter((b) => b.shelf === "currentlyReading")}/>
	                <BookShelf changeShelf={this.props.changeShelf} title="Want to Read" books={this.props.books.filter((b) => b.shelf === "wantToRead")}/>
	                <BookShelf changeShelf={this.props.changeShelf} title="Read" books={this.props.books.filter((b) => b.shelf === "read")}/>
	              </div>
	            </div>
	            <div className="open-search">
	              <Link to="/search">Add a book</Link>
	            </div>
	          </div>
        )
	}
}

export default BookList