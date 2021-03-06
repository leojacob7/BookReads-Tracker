import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReadsContainer extends Component {

    static propTypes = {
        onBookSectionChange: PropTypes.func,
        books: PropTypes.array,
      }

      state= {
          value: 'move',
      }

    handleSelect = (book, value) => {
        const { onBookSectionChange } = this.props;
        this.setState({value: value,});
        onBookSectionChange( book, value)
    }

    renderBooks = (book) =>
    { 
        if( !book ) return null;
        return (
            <li key={ book.id }>
                <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${ book.imageLinks && book.imageLinks.thumbnail } )` }}></div>
                    <div className="book-shelf-changer">
                    <select value={ book.shelf } onChange={ (event) => this.handleSelect( book, event.target.value ) }>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                    <div className="book-title">{ book && book.title }</div>
                    <div className="book-authors">{ book && book.authors && book.authors.toString() }</div>
                </div>
            </li>
        );
    }


    render() {
        const {  books } = this.props;
        if( !books ) return null;

        const currentlyReading = books && books.filter((book) => book.shelf === "currentlyReading")
        const wantToRead = books && books.filter((book) => book.shelf === "wantToRead")
        const read = books && books.filter((book) => book.shelf === "read")

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { currentlyReading && currentlyReading.map( book => this.renderBooks(book)) }
                    </ol>
                </div>
                <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            { wantToRead && wantToRead.map( book => this.renderBooks(book) ) }
                        </ol>
                </div>

                <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            { read && read.map( book => this.renderBooks(book) ) }
                        </ol>
                </div>
                </div>
        );
    }
}

ReadsContainer.propTypes = {

};

export default ReadsContainer;
