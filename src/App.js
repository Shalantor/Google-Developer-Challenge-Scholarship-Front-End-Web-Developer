import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList';
import BookSearch from './BookSearch';
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <BookList/>
      )}/>
      <Route path="/search" render={() => (
        <BookSearch/>
      )}/>
      </div>
    )
  }
}

export default BooksApp
