import React from 'react'
import './App.css'
import SearchBook from './components/SearchBook'
import ReadsContainer from './components/ReadsContainer'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom';

export default class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {                
        this.setState(() => ({
          books
        }))
      })
  }

  bookSectionChange = (book, value, isNewBook = false) => {
    if(isNewBook) {
      book.shelf = value;
      this.setState((currentState) => ({
        books: [...currentState.books, book],
      }))
      BooksAPI.update( book, value )
      return;
    }
    this.setState((currentState) => ({
      books: currentState.books.map( b => {
        if( b === book ){
          b.shelf = value;
          return b;
        }
        else return b;
      } ),
    }))
    BooksAPI.update( book, value ) 
  }

  renderListContainer = () => (
    <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
          <ReadsContainer books={ this.state.books } onBookSectionChange={ (book, value) => this.bookSectionChange( book, value, false ) }/>
      </div>
    </div>
    <div className="open-search">
      <Link to='/search' >
      <button>Add a book</button>
      </Link>
    </div>
  </div>
  );

  renderSearchBook = () => {
    return (
      <SearchBook
        booksOnShelf={ this.state.books }
        onBookSectionChange={ (book, value) => this.bookSectionChange( book, value, true ) }
      />
    );
  }

  render() {
    return (
      <div className="app">
          <Route path="/search" render= { () => this.renderSearchBook() } />
          <Route exact path="/" render= { () => this.renderListContainer() } />
          
      </div>
    )
}
}