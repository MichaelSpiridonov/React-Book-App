import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx';
import { BookIndex } from './pages/BookIndex.jsx';

const { useState } = React

export function App() {

    const [page, setPage] = useState('book')

    return (
        <section className="app">
            <header className="app-header full main-layout">
                <section>
                    <h1>React Book App</h1>
                    <nav className="app-nav">
                        <a onClick={() => setPage('home')} href="#">Home</a>
                        <a onClick={() => setPage('about')} href="#">About</a>
                        <a onClick={() => setPage('book')} href="#">Books</a>
                    </nav>
                </section>
            </header>

            <main className="container">
                {page === 'home' && <Home />}
                {page === 'about' && <AboutUs />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}