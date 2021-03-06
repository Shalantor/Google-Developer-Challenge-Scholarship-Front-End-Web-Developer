import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';

class BookSearch extends Component {

	render () {

		return (
			<div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick ={this.props.emptyQuery}>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.props.query}
              onChange={(event) => this.props.updateQuery(event.target.value)}/>
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.books.map((book =>
                <Book book = {book} key={book.id} changeShelf={this.props.changeShelf}/>
            ))}
          </ol>
        </div>

      </div>
		)
	}
}

export default BookSearch;