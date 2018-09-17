import React from 'react'
import './App.css'
import BookList from './BookList';
import BookSearch from './BookSearch';
import {Route} from 'react-router-dom';
import * as api from './BooksAPI';

class BooksApp extends React.Component {

  //State of whole app
  state = {
    books: [],
    booksSearch : [],
    query : ''
  }

  //When component mounts, get the books from the API
  componentDidMount() {
    api.getAll().then((books) => {
      this.setState({
        books: books
      })
    });
  }

  /* Function to put a book from one shelf to another
  *
  * Parameters:
  * book : Book to move
  * shelf: Shelf we want the book to move to
  */
  changeShelf = (book,shelf) => {

    //If shelf the same as the book already is, no need to move it
    if(shelf === book.shelf){
      return;
    }

    //Update database
    api.update(book,shelf).then(()=>{
      //Remove from database and UI shelf if option none is selected
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
    })
  }

  /* Function to put a book from the search page into a shelf
  *
  * Parameters:
  * book : Book to move
  * shelf: Shelf we want the book to move to
  */
  addFromSearch = (book,shelf) => {

    //If option none is selected, skip
    if(shelf === 'none'){
      return;
    }

    //Update database
    api.update(book,shelf).then(() => {
      //If book already in a shelf, update the shelf only
      if(!this.containsBook(book)){
        book.shelf = shelf;
        this.setState( (state) => ({
          books : [...state.books,book]
        }))
      }
      else{ //Else add the book to the selected shelf
        this.setState( (state) => ({
          books : state.books.map((b) => {
            if(b.id === book.id){
              b.shelf = book.shelf;
            }
            return b;
          })
        }))
      }
    })
  }

  //Function to empty query string when navigating back to main page.
  emptyQuery = () =>{
    this.setState({
      query : '',
      booksSearch : []
    })
  }

  /* Function to check if a certain book is in the displayed books. 
  * In other words check if book is in any shelf.
  * 
  * Parameters:
  * book: Book to search for
  */
  containsBook(book) {
    for(let b of this.state.books){
      if(b.id === book.id){
        return true;
      }
    }
    return false;
  }

  /* Function that gets triggered as the user types in the search field
  * Everytime the query of the user changes as he types, the database 
  * gets searched for books that match that query string
  *
  * Paratemers:
  * query: The query the user types in the search field
  */
  updateQuery = (query) => {

    /*First set state of the query. This way we keep the app from 
    * from seeming to hang as the user types, because the queries 
    * to the database take some time.
    * Also if query is empty, remove the books that are shown.
    */ 
    this.setState( (state) => ({
      query : query,
      booksSearch : query === '' ? [] : state.booksSearch
    }))

    if(query !== ''){
      api.search(query).then((books) => {

        //Books that are already in a shelf, do show that shelf in search page
        for(let found of books){
          found.shelf = 'none';
          for(let book of this.state.books){
            if(book.id === found.id){
              found.shelf = book.shelf;
            }
          }
        }

        /*When there is an error an object is returned from the API. 
        * Otherwise, on a successful search, an array is returned,
        * which is checked here. Also the query might change fast, when 
        * the user types and might not allow the previous database query
        * to finish before that. So we have to make sure, that the query 
        * we received as an argument matches the query in the state. This
        * makes sure that the user has finished typing and is waiting for 
        * the results to display.
        */
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
          <BookSearch updateQuery = {this.updateQuery} books={this.state.booksSearch} 
          emptyQuery={this.emptyQuery} changeShelf={this.addFromSearch}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
