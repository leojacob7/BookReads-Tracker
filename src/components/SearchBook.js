import React, { Component } from 'react';
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchBook extends Component {

  static propTypes = {
    onBookSectionChange: PropTypes.func,
  }``

  state={
    query: '',
  }

  searchBook = query => {
    query !== '' && BooksAPI.search(query)
      .then((books) => {  
        console.log(books);
        
        this.setState(() => ({
          books
        }))
      })
  }

  onInputChange = (value) => { this.setState({ query: value }); this.searchBook(value) }

  renderBooks = (book) =>
  { 
      const { onBookSectionChange } = this.props;
      if( !book ) return null;
      return (
          <li>
              <div className="book">
              <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${ book.imageLinks && book.imageLinks.thumbnail } )` }}></div>
                  <div className="book-shelf-changer">
                  <select onClick={ (event) => onBookSectionChange( book, event.target.value) }>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                  </select>
                  </div>
              </div>
                  <div className="book-title">{ book.title && book.title }</div>
                  <div className="book-authors">{ book.authors && book.authors[ 0 ] }</div>
              </div>
          </li>
      );
  }

  renderNoResults = () => (
    <div className="search-books-input-wrapper">Sorry No Books Found. Please try a different book</div>
  )


  render() {
    const { books } = this.state;
      return (
          <div className="search-books">
          <div className="search-books-bar">
          <Link to='/' >
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={(e) => this.onInputChange( e.target.value )}  value={ this.state.query } placeholder="Search by title or author"/>
            { books && books.error && this.renderNoResults() }
          </div>
          </div>
          { 
            books && !books.error &&
            <div className="search-books-results">
              <ol className="books-grid">
              { books && books.map( book => this.renderBooks(book)) }
              </ol>
            </div>
          }
        </div>
      );
  }
}

SearchBook.propTypes = {

};

export default SearchBook;