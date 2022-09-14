import { useEffect, useState } from "react";
import { useSearchParams  } from "react-router-dom";
import MovieSearched from "./MovieSearched";
import PeopleSearched from "./PeopleSearched";
import ShowSearched from "./ShowSearched";

function Searched() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [inputValue, setInputValue] = useState(searchParams.get('query'))
    const [content, setContent] = useState(null)
    const [showContent, setShowContent] = useState(null)
    const MOVIE_URL = process.env.REACT_APP_API_URL + "search/movie?api_key=" + process.env.REACT_APP_API_KEY + "&query="
    const SHOW_URL = process.env.REACT_APP_API_URL + "search/tv?api_key=" + process.env.REACT_APP_API_KEY + "&query="
    const PEOPLE_URL = process.env.REACT_APP_API_URL + "search/person?api_key=" + process.env.REACT_APP_API_KEY + "&query="

    const [result, setResult] = useState({
        index: 0,
        highlight: "selected-movie",
        URL: MOVIE_URL,
        element: MovieSearched
    })

    useEffect(() => {
        fetch(result.URL + searchParams.get('query'))
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setContent(data)
            })
    }, [searchParams, result])

    useEffect(() => {
        let results = null
        if (content) results = content.results.map((cont) => <result.element key={cont.id} {...cont} />)
        if (content && content.total_results < 1) results = <h2>Nothing has been found...<br/>Search again</h2>
        setShowContent(results)
        //return (
        //    <div className="wrap-content">
        //        {results}
        //    </div>
        //)
    }, [content])

    //const showContent = () => {
    //    if (content.total_results < 1) return <h2>Nothing has been found...<br/>Search again</h2>
    //    const results = content.results.map((cont) => <result.element key={cont.id} {...cont} />)
    //    return (
    //        <div className="wrap-content">
    //            {results}
    //        </div>
    //    )
    //}
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
            <div className="wrap">
                <h1>Search Results</h1>
                <div className="search" style={{height: "inherit", margin: "40px 0"}}>
                    <form className="wrap-input" onSubmit={handleSubmit}>
                        <input className="search-input" value={inputValue} onChange={handelChange} id="search" />
                        <button className="search-button"><i className="bi bi-search" /></button>
                    </form>
                </div>
                <div className="flex">
                    <div>
                        <h2>Search Results</h2>
                        <div className="wrap-result-buttons">
                            <button className={result.index == 0 ? "result-button sel" : "result-button"}onClick= {
                                () => {
                                    setResult({
                                        index: 0,
                                        highlight: "selected-movie",
                                        URL: MOVIE_URL,
                                        element: MovieSearched
                                    })
                                }
                            }>Movies</button>
                            <button className={result.index == 1 ? "result-button sel" : "result-button"} onClick={
                                () => {
                                    setResult({
                                        index: 1,
                                        highlight: "selected-show",
                                        URL: SHOW_URL,
                                        element: ShowSearched
                                    })
                                }
                            }>TV Shows</button>
                            <button className={result.index == 2 ? "result-button sel" : "result-button"} onClick={
                                () => {
                                    setResult({
                                        index: 2,
                                        highlight: "selected-people",
                                        URL: PEOPLE_URL,
                                        element: PeopleSearched
                                    })
                                }
                            }>People</button>
                            <span className={"selected " + result.highlight} />
                        </div>
                    </div>
                    <div className="wrap-content">
                        {showContent}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <></>
    )
}

export default Searched