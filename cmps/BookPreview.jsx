import { bookService } from "../services/book.service.js"

export function BookPreview({ book }) {
  const { title, thumbnail } = book
  const { amount: price, currencyCode, isOnSale } = book.listPrice
  return (
    <article className="book-preview">
      <h1>Title: {title}</h1>
      <h2>
        Price: {price}
        {bookService.getCurrencyCode(currencyCode)}
      </h2>
      <div className="image-container">
        <img src={`./assets/img/${book.thumbnail}`} alt="" />
        {(isOnSale) ? <div className="sale-sign">On Sale!</div> : ''}
      </div>
    </article>
  )
}
