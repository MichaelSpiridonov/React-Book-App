import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const [selectedCarId, setSelectedCarId] = useState(null);

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    console.log('Loading...')
    bookService.query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => {
        console.log("err:", err);
      });
  }

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((books) => books.filter((book) => book.id !== bookId));
      })
      .catch((err) => {
        console.log("Problems removing car:", err);
      });
  }

  function onSetFilter(filterBy) {
    setFilterBy({ ...filterBy });
  }

  function onSelectBookId(bookId) {
    setSelectedBookId(bookId);
  }

  if (!books) return <div className="loader"></div>;
  return (
    <React.Fragment>
      <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <BookList
        books={books}
        onRemoveBook={onRemoveBook}
        onSelectBookId={onSelectBookId}
      />

    </React.Fragment>
  );
}
