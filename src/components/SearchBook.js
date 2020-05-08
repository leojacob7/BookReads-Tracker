import React, { Component } from 'react';
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import PropTypes from 'prop-types';

class SearchBook extends Component {

  static propTypes = {
    booksOnShelf: PropTypes.array,
    onBookSectionChange: PropTypes.func,
  }

  constructor() {
    super();
    this.searchBook = debounce(500, this.searchBook);
  }

  state={
    query: '',
    value: 'none',
    books: [],
  }

  searchBook = query => {
    const { booksOnShelf = [] } = this.props;

    query !== '' && BooksAPI.search(query)
      .then((books) => {  
        const newBooks = books && !books.error && books.map(book => {
          book.shelf = "none";
          booksOnShelf.forEach(bookOnShelf => {
            if (book.id === bookOnShelf.id) {
              book.shelf = bookOnShelf.shelf;
            }
          });
          return book;
        });
        if (!newBooks){
          this.setState( { books } )
        }

        newBooks && this.setState(() => ({
          books: newBooks
        }))
      })
    if( query === '' ) this.setState(() => ({ books: [],}))
  }

  handleSelect = (book, value) => {
    const { onBookSectionChange } = this.props;
    this.setState({value: value,});
    onBookSectionChange( book, value)
}

  onInputChange = (value) => { this.setState({ query: value }); this.searchBook(value) }

  renderNoResults = () => (
    <div className="search-books-input-wrapper">Sorry No Books Found. Please try a different book</div>
  )

  renderBooks = (book) =>
  { 
      if( !book ) return null;
      return (
          <li key={ book.id }>
              <div className="book">
              <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${ book.imageLinks && book.imageLinks.thumbnail } )` }}></div>
                  <div className="book-shelf-changer">
                  <select value={ book.shelf!== 'none' ? book.shelf : this.state.value } onChange={ (event) => this.handleSelect( book, event.target.value ) }>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                  </select>
                  </div>
              </div>
                  <div className="book-title">{ book.title && book.title }</div>
                  <div className="book-authors">{ book.authors && book.authors.toString() }</div>
              </div>
          </li>
      );
  }



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