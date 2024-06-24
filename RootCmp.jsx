const Router = ReactRouterDOM.HashRouter
import { AppHeader } from "./cmps/AppHeader.jsx"
import { RoutesCmp } from "./cmps/RoutesCmp.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="main-layout">
          <RoutesCmp />
        </main>
      </section>
      <UserMsg />
    </Router>
  )
}
