import { useEffect, useState } from "react";
import { useSearchParams  } from "react-router-dom";
import MovieSearched from "./MovieSearched";
import ShowSearched from "./ShowSearched";

function Searched() {
    const [searchParams, setSearchParams] = useSearchParams()

    const MOVIE_URL = "https://api.themoviedb.org/3/search/movie?api_key=01b9f5d604812bcd787cd509a6336c8a&query="
    const SHOW_URL = "https://api.themoviedb.org/3/search/tv?api_key=01b9f5d604812bcd787cd509a6336c8a&query="

    const [content, setContent] = useState(null)
    const [result, setResult] = useState({
        URL: MOVIE_URL,
        element: MovieSearched
    })

    useEffect(() => {
        setCont(result.URL + searchParams.get('query'))
        console.log(searchParams.get('query'))
    }, [searchParams, result])

    const setCont = (URL) => {
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            setContent(data)
        })
    }
    const showContent = () => {
        let results = null
        results = content.results.map((cont) => <result.element key={cont.id} {...cont} />)
        return (
            <div>
                {results}
            </div>
        )
    }
    const handleSubmit = event => {
        event.preventDefault();
        const inp = document.getElementById("search").value
        setSearchParams({query: inp})
    }

    if (content) {
        return (
            <div className="search-page">
                <form onSubmit={handleSubmit}>
                    <input id="search" />
                    <button>Search</button>
                </form>
                <div className="filter">
                    <h2>Search Results</h2>
                    <button onClick= {
                        () => {
                            setResult({
                                URL: MOVIE_URL,
                                element: MovieSearched
                            })
                        }
                    }>Movies</button>
                    <button onClick={
                        () => {
                            setResult({
                                URL: SHOW_URL,
                                element: ShowSearched
                            })
                        }
                    }>TV Shows</button>
                </div>
                {showContent()}
            </div>
        )
    }
    return (
        <></>
    )
}

export default Searched