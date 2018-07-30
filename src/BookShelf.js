import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  removeFromShelf = (book,shelf) => {

    //Check if same shelf
    if (shelf === book.shelf){
      return;
    }

    //Remove from shelf
    this.setState((state) => ({
      books : state.books.filter((b) => b.title !== book.title)
    }))

    //Add to new shelf
    book.setState((state) => ({
      shelf: shelf
    }))
  }

	render() {
		const {books, title} = this.state;
		return (
				<div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.map((book =>
						<Book onRemove = {this.removeFromShelf} book = {book} key={book.title}/>
                      ))}
                    </ol>
                  </div>
                </div>
			)
	}

}

export default BookShelf