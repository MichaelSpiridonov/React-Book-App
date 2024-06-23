import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedCarId, setSelectedCarId] = useState(null)

  useEffect(() => {
    loadBooks();
  }, []);

  function loadBooks() {
    bookService
      .query()
      .then((books) => setBooks(books))
      .catch((err) => {
        console.log("err:", err);
      });
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId)
        .then(() => {
          setBooks(books =>
                books.filter(book => book.id !== bookId)
            )
        })
        .catch(err => {
            console.log('Problems removing car:', err)
        })
}

function onSelectBookId(bookId) {
    setSelectedBookId(bookId)
}

  if (!books) return <div className="loader"></div>
  return (
    <BookList
      books={books}
      onRemoveBook={onRemoveBook}
      onSelectBookId={onSelectBookId}
    />
  );
}
