import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Movies() {
    const [content, setContent] = useState(null)

    const [attributes, setAttributes] = useState({
        sort: "popularity.desc"
    })
    const URL = process.env.REACT_APP_API_URL + "discover/movie?api_key=" + process.env.REACT_APP_API_KEY + "&sort_by="
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "w500"

    useEffect(() => {
        setMovies()
    }, [attributes])
    
    const setMovies = () => {
        fetch(URL + attributes.sort)
            .then((response) => response.json())
            .then((data) => {
                setContent(data)
            })
    }
    const showMovies = () => {
        const results = content.results.map((cont) =>
            <Link className="card" key={cont.id} to={"/Movies/" + cont.id}>
                {cont.poster_path && <img className="card-poster" src={IMAGE_URL + cont.poster_path} />}
                <h3>{cont.title}</h3>
            </Link>
        )
        return (
            <div className="wrap-cards">
                {results}
            </div>
        )
    }
    if (content) {
        return (
            <div>
                <h1>Popular Movies</h1>
                <div className="wrap">
                    <div className="wrap-filter">
                        <div className="filter">
                            <h2>Sort</h2>
                            <select className="dropdown" id="sort">
                                <option value="popularity.desc">Popularity Descending</option>
                                <option value="popularity.asc">Popularity Ascending</option>
                                <option value="vote_average.desc">Rating Descending</option>
                                <option value="vote_average.asc">Rating Ascending</option>
                                <option value="release_date.desc">Release Date Descending</option>
                                <option value="release_date.asc">Release Date Ascending</option>
                                <option value="original_title.desc">Title (A-Z)</option>
                                <option value="original_title.asc">Title (Z-A)</option>
                            </select>
                        </div>
                        <button onClick={
                            () => {
                                const order = document.getElementById("sort").value;
                                setAttributes({sort: order})
                            }
                        }>Search</button>
                    </div>
                    {showMovies()}
                </div>
            </div>
        )
    }
    return (
        <></>
    )
}

export default Movies