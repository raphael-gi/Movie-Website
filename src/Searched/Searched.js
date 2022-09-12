import { useEffect, useState } from "react";
import { useSearchParams  } from "react-router-dom";
import MovieSearched from "./MovieSearched";
import ShowSearched from "./ShowSearched";

function Searched() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [inputValue, setInputValue] = useState(searchParams.get('query'))
    const [content, setContent] = useState(null)
    
    const MOVIE_URL = process.env.REACT_APP_API_URL + "search/movie?api_key=" + process.env.REACT_APP_API_KEY + "&query="
    const SHOW_URL = process.env.REACT_APP_API_URL + "search/tv?api_key=" + process.env.REACT_APP_API_KEY + "&query="

    const [result, setResult] = useState({
        URL: MOVIE_URL,
        element: MovieSearched
    })

    useEffect(() => {
        setCont(result.URL + searchParams.get('query'))
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
    const handelChange = event => {
        setInputValue(event.target.value)
    }

    if (content) {
        return (
            <div className="search-page">
                <form onSubmit={handleSubmit}>
                    <input value={inputValue} onChange={handelChange} id="search" />
                    <button>Search</button>
                </form>
                <div>
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