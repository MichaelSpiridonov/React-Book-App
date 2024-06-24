import { LongTxt } from "../cmps/LongTxt.jsx"
import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    bookService.get(bookId).then((book) => setBook(book))
  }, [])

  function getPageCategory() {
    if (book.pageCount > 500) return "Serious Reading"
    else if (book.pageCount > 200) return "Decent Reading"
    else return "Light Reading"
  }

  function getCondition(publishedDate) {
    const currentYear = getCurrentYear()
    if (currentYear - publishedDate > 10) return "Vintage"
    else if (currentYear - publishedDate < 1) return "New"
    else return "Not New /Neither Old"
  }

  function getCurrentYear() {
    return new Date().getFullYear()
  }

  function colorPrice() {
    if (book.listPrice.amount > 150) return "red"
    else if (book.listPrice.amount < 20) return "green"
  }
  if (!book) return <div className="loader"></div>
  return (
    <section className="book-details">
      <div className="image-container">
        <img src={`./assets/img/${book.thumbnail}`} alt="" />
        {book.listPrice.isOnSale ? (<div className="sale-sign">On Sale!</div>) : ''}
      </div>
      <h1>Book Title: {book.title}</h1>
      <h1>
        Book Price:
        <span className={colorPrice()}>{`${
          book.listPrice.amount
        } ${bookService.getCurrencyCode(book.listPrice.currencyCode)}`}</span>
      </h1>
      <h2>is On Sale: {book.listPrice.isOnSale ? "Yes" : "No"}</h2>
      <ul>
        <li>Author/s: {book.authors.map((author) => `${author}, `)}</li>
        <li>Page Count: {book.pageCount}</li>
        <li>Page Category: {getPageCategory()}</li>
        <li>Published Date: {book.publishedDate}</li>
        <li>Condition: {getCondition(book.publishedDate)}</li>
        <li>Categories: {book.categories}</li>
        <li>Language: {book.language}</li>
      </ul>
      <LongTxt txt={book.description} />

      <button onClick={onBack}>Back</button>
    </section>
  )
}
