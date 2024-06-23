import { bookService } from "../services/book.service.js";

export function BookPreview({ book }) {
    const {title, thumbnail } = book
    const { amount: price, currencyCode } = book.listPrice
    return (
        <article className="book-preview">
            <h1>Title: {title}</h1>
            <h2>Price: {price}{bookService.getCurrencyCode(currencyCode)}</h2>
            <img src={`./assets/img/${thumbnail}`} alt="" />
        </article>
    )
}