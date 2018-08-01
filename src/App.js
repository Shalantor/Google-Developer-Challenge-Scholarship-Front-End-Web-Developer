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

    if(shelf === book.shelf){
      return;
    }

    //Remove from app if none is selected
    if(shelf === 'none'){
      this.setState( (state) => ({
        books : state.books.filter((b) => b.id !== book.id)
      }))
    }
    else{    //If other shelf is selected, change shelf
      this.setState( (state) => ({
        books : state.books.map((b) => {
          if(b.id === book.id){
            b.shelf = shelf;
          }
          return b;
        })
      }))
    }

  }

  //Add from search
  addFromSearch = (book,shelf) => {
    if(!this.containsBook(book)){
      book.shelf = shelf;
      this.setState( (state) => ({
        books : [...state.books,book]
      }))
    }
    else{
      this.setState( (state) => ({
        books : state.books.map((b) => {
          if(b.id === book.id){
            b.shelf = book.shelf;
          }
          return b;
        })
      }))
    }
  }

  //Empty query when going back
  emptyQuery = () =>{
    this.setState({
      query : '',
      booksSearch : []
    })
  }

  containsBook(book) {
    for(let b of this.state.books){
      if(b.id === book.id){
        return true;
      }
    }
    return false;
  }

  updateQuery = (query) => {

    this.setState( (state) => ({
      query : query,
      booksSearch : query === '' ? [] : state.booksSearch
    }))

    if(query !== ''){
      api.search(query).then((books) => {

        //Categorize books correctly
        for(let found of books){
          found.shelf = 'none';
          for(let book of this.state.books){
            if(book.id === found.id){
              found.shelf = book.shelf;
            }
          }
        }

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
        <BookSearch updateQuery = {this.updateQuery} books={this.state.booksSearch} emptyQuery={this.emptyQuery} onRemove={this.addFromSearch}/>
      )}/>
      </div>
    )
  }
}

export default BooksApp
