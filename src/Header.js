import { Link } from "react-router-dom"
import './App.css'

function Header() {

    return (
        <header>
            <Link to="/">Home</Link>
            <Link to="/Movies">Movies</Link>
            <Link to="/Shows">TV Shows</Link>
            <Link to="/People">People</Link>
        </header>
    )
}

export default Header