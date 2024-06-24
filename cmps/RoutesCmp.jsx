const { Route, Routes, Navigate } = ReactRouterDOM

import { NotFound } from "./NotFound.jsx"
import { AboutUs } from "../pages/AboutUs.jsx"
import { BookDetails } from "../pages/BookDetails.jsx"
import { BookEdit } from "../pages/BookEdit.jsx"
import { BookIndex } from "../pages/BookIndex.jsx"
import { Home } from '../pages/Home.jsx'


export function RoutesCmp() {
    return (
    <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/books" element={<BookIndex />} />
    <Route path="/books/:bookId" element={<BookDetails />} />
    <Route path="/books/edit" element={<BookEdit />} />
    <Route path="/books/edit/:bookId" element={<BookEdit />} />

    <Route path="*" element={<NotFound />} />
    </Routes>
    )
}
