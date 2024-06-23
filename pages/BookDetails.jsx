import { bookService } from "../services/book.service.js"

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [])
    
    if (!book) return <div className="loader"></div>
    return (
        <section className="book-details">
            <img src={`./assets/img/${book.thumbnail}`} alt="" />
            <h1>Book Title: {book.title}</h1>
            <h1>Book Price: {`${book.listPrice.amount} ${bookService.getCurrencyCode(book.listPrice.currencyCode)}`}</h1>
            <p>Book Description: {book.description}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}