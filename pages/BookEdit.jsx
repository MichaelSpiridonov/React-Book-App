const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const { bookId } = useParams()

  useEffect(() => {
    if (bookId) loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => console.log("err:", err))
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit)
      .then(() => {
        navigate("/books")
        showSuccessMsg(`Book saved successfully!`)
      })
      .catch((err) => console.log("err:", err))
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    console.log(field)
    console.log(bookToEdit.listPrice[field])
    switch (target.type) {
      case "number":
      case "range":
        value = +value
        break

      case "checkbox":
        value = target.checked
        break

      default:
        break
    }
    if (field === 'amount') {
        setBookToEdit((prevBook) => ({ ...prevBook, listPrice: {...prevBook.listPrice, amount: value} }))
    }
    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
  }

  const { title } = bookToEdit
  const { amount: price } = bookToEdit.listPrice

  return (
    <section className="book-edit">
      <h1>{bookId ? "Edit" : "Add"} Book</h1>
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title</label>
        <input onChange={handleChange} value={title} type="text" name="title" id="title" />

        <label htmlFor="amount">Price</label>
        <input onChange={handleChange} value={price || ""} type="number" name="amount" id="amount" />

        <button>Save</button>
      </form>
    </section>
  )
}
