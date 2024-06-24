const { useEffect } = React
const { NavLink } = ReactRouterDOM
export function AppHeader() {


    return (
        <header className="app-header full main-layout">
            <section>
            <h1>React Book App</h1>
                <nav className="app-nav">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/books">Books</NavLink>
                </nav>
            </section>
        </header>
    )
}