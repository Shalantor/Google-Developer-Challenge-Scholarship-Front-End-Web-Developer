import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import * as api from './BooksAPI';

class BookSearch extends Component {

  state = {
    query : '',
    books : []
  }

  updateQuery = (query) => {

      this.setState( (state) => ({
        query : query,
        books : query === '' ? [] : state.books
      }))

      if(query !== ''){
        api.search(query).then((books) => {
          console.log(books);
          if(books.constructor === Array && this.state.query === query){
           this.setState( (state) => ({
              query : state.query,
              books : books
            }))
          }
        }) 
      }
  }

	render () {

		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                        placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                      {this.state.books.map((book =>
            <Book book = {book} key={book.id}/>
                      ))}
                    </ol>
            </div>
          </div>
		)
	}
}

export default BookSearch;