import React, { Component } from 'react';
import BookShelf from './BookShelf';
import {Link} from 'react-router-dom';

class BookList extends Component {

	state = {
		//Just for testing
		booksCurrently : [],

		booksWant : [],

		booksRead : []
	}

	//BookList gets notified for change
	changeShelf = (book,shelf) => {
		//Remove from previous shelf
		if(book.shelf === "read"){
			this.setState((state) =>({
				booksRead : state.booksRead.filter((b) => b.title !== book.title)
			}))
		}
		else if(book.shelf === "wantToRead"){
			this.setState((state) =>({
				booksWant : state.booksWant.filter((b) => b.title !== book.title)
			}))
		}
		else if(book.shelf=== "currentlyReading"){
			this.setState((state) =>({
				booksCurrently : state.booksCurrently.filter((b) => b.title !== book.title)
			}))
		}

		//Add to new shelf
		book.shelf = shelf;
		if(shelf === "read"){
			this.setState((state) =>({
				booksRead : [...state.booksRead,book]
			}))
		}
		else if(shelf === "wantToRead"){
			this.setState((state) =>({
				booksWant : [...state.booksWant,book]
			}))
		}
		else if(shelf=== "currentlyReading"){
			this.setState((state) =>({
				booksCurrently : [...state.booksCurrently,book]
			}))
		}
	}

	render () {
		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">
	              <div>
	                <BookShelf changeShelf={this.changeShelf} title="Currently Reading" books={this.state.booksCurrently}/>
	                <BookShelf changeShelf={this.changeShelf} title="Want to Read" books={this.state.booksWant}/>
	                <BookShelf changeShelf={this.changeShelf} title="Read" books={this.state.booksRead}/>
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