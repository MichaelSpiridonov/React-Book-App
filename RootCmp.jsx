import { Home } from './cmps/Home.jsx'
import { AboutUs } from './cmps/AboutUs.jsx';
import { BookIndex } from './cmps/BookIndex.jsx';

const { useState } = React

export function App() {

    const [page, setPage] = useState('home')

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