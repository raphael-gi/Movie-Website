import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import './App.css'

function Header() {
    const [underline, setUnderline] = useState("home")
    const location = useLocation();
    useEffect(() => {
        const loc = location.pathname.split("/")[1]
        if (loc == "") setUnderline("home")
        if (loc == "Movies") setUnderline("movies")
        if (loc == "Shows") setUnderline("shows")
        if (loc == "People") setUnderline("people")
    }, [location])
    return (
        <header>
            <Link to="/">Home</Link>
            <Link to="/Movies">Movies</Link>
            <Link to="/Shows">TV Shows</Link>
            <Link to="/People">People</Link>
            <span className={"underline " + underline} />
        </header>
    )
}

export default Header