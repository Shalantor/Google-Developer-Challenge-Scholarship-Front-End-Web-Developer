import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList';
import BookSearch from './BookSearch';
import {Route} from 'react-router-dom';
import * as api from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    books: [],
    booksSearch : [],
    query : ''
  }

  //BookList gets notified for change
  changeShelf = (book,shelf) => {

    //Remove from app if none is selected
    if(shelf.toLowerCase() === 'none'){
      this.setState( (state) => ({
        books : state.books.filter((b) => b.id !== book.id)
      }))
    }
    else{    //If other shelf is selected, change shelf
      this.setState( (state) => ({
        books : state.books.filter((b) => b.id === book.id ? b.shelf = shelf : b)
      }))
    }

  }

  updateQuery = (query) => {

    this.setState( (state) => ({
      query : query,
      booksSearch : query === '' ? [] : state.booksSearch
    }))

    if(query !== ''){
      api.search(query).then((books) => {
        if(books.constructor === Array && this.state.query === query){
         this.setState( (state) => ({
            query : state.query,
            booksSearch : books
          }))
        }
      }) 
    }
  }


  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <BookList changeShelf = {this.changeShelf} books= {this.state.books}/>
      )}/>
      <Route path="/search" render={() => (
        <BookSearch updateQuery = {this.updateQuery} books={this.state.booksSearch}/>
      )}/>
      </div>
    )
  }
}

export default BooksApp
