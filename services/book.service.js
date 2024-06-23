import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = {
    title: '',
    price: 0
}
_createbooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextbookId,
    getFilterBy,
    setFilterBy,
    getDefaultFilter,
    getCurrencyCode
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.title) {
                const regex = new RegExp(gFilterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.price) {
                books = books.filter(book => book.price >= gFilterBy.price)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0, thumbnail = '', description = utilService.makeLorem(50), currencyCode = 'ILS', isOnSale = false) {
    return {
        id: '',
        title,
        thumbnail,
        description,
        listPrice: {
            amount: price,
            currencyCode,
            isOnSale
        }
    }
}

function getDefaultFilter() {
    return {
        title: '',
        price: 0
    }
}

function getFilterBy() {
    return {
        ...gFilterBy
    }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
    return gFilterBy
}

function getNextbookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextbookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextbookIdx === books.length) nextbookIdx = 0
            return books[nextbookIdx].id
        })
}

function _createbooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createbook('Holes', 300, '11.jpg'))
        books.push(_createbook('How To Start Your Own Country', 120, '19.jpg'))
        books.push(_createbook('How To Defend Yourself Against Alien Abduction', 100, '18.jpg'))
        books.push(_createbook('Don\'t Panic', 150, '17.jpg'))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createbook(title, price = 250, thumbnail) {
    const book = getEmptyBook(title, price, thumbnail)
    book.id = utilService.makeId()
    return book
}

function getCurrencyCode(code) {
    switch (code) {
        case 'USD':
            return '$'

        case 'ILS':
            return '₪'

        case 'EUR':
            return '€'

    }
}