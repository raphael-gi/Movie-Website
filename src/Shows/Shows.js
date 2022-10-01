import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Shows() {
    const [content, setContent] = useState(null)
    const [genre, setGenre] = useState(null)

    const [attributes, setAttributes] = useState({
        sort: "popularity.desc",
        genres: [],
        airDateGte: ""
    })
    const [selectedGenres, setSelectedGenres] = useState([])
    const [option, setOption] = useState(null)

    const URL = process.env.REACT_APP_API_URL + "discover/tv?api_key=" + process.env.REACT_APP_API_KEY + "&with_genres=" + attributes.genres + "&air_date.gte=" + attributes.airDateGte + "&sort_by=" + attributes.sort
    const GENRE_URL = process.env.REACT_APP_API_URL + "genre/tv/list?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "w500"

    useEffect(() => {
        fetch(GENRE_URL)
            .then((response) => response.json())
            .then((data) => {
                setGenre(data)
            })
    }, [])
    useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setContent(data)
            })
    }, [attributes])

    const showShows = () => {
        const results = content.results.map((cont) =>
            <Link className="card" key={cont.id} to={"/Shows/" + cont.id}>
                {cont.poster_path && <img className="card-poster" src={IMAGE_URL + cont.poster_path} />}
                <h3>{cont.name}</h3>
            </Link>
        )
        return (
            <div className="wrap-cards">
                {results}
            </div>
        )
    }
    const showGenres = () => {
        const genres = genre.genres.map((genre) =>
            <div key={genre.id} className="wrap-check">
                <input value={genre.id} onChange={handleChange} className="genre-check" type="checkbox" />
                <h4>{genre.name}</h4>
            </div>
        )
        return (
            <form>
                {genres}
            </form>
        )
    }

    const handleChange = (e) => {
        const isChecked = e.target.checked
        if (isChecked) setSelectedGenres(previousState => ([...previousState, e.target.value]))
        if (!isChecked) setSelectedGenres(previousState => (previousState.filter(genre => genre !== e.target.value)))
    }
    const handleSearch = () => {
        const order = document.getElementById("sort").value;
        setAttributes({
            sort: order,
            genres: selectedGenres,
            airDateGte: ""
        })
    }
    if (content && genre) {
        return (
            <div className="wrap">
                <h1>Popular Shows</h1>
                <div className="wrap-full-shows">
                    <div className="wrap-options">
                        <div className={option == 0 ? "sort option option-open" : "sort option"}>
                                <div onClick={
                                    () => {
                                        option == 0 ? setOption(null) : setOption(0)
                                    }
                                } className="option-select">
                                    <h2>Sort</h2>
                                    <i className="arrow bi bi-caret-right-fill" style={option == 0 ? {rotate: "90deg"} : {rotate: "0deg"}} />
                                </div>
                                <select id="sort">
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
                        <div className={option == 1 ? "sort option option-open" : "sort option"}>
                                <div onClick={
                                    () => {
                                        option == 1 ? setOption(null) : setOption(1)
                                    }
                                } className="option-select">
                                    <h2>Filter</h2>
                                    <i className="arrow bi bi-caret-right-fill" style={option == 1 ? {rotate: "90deg"} : {rotate: "0deg"}} />
                                </div>
                                <h3>Air Dates</h3>
                                <div className="flex">
                                    <h4>From:</h4>
                                    <input type="date" />
                                </div>
                                <div className="flex">
                                    <h4>To:</h4>
                                    <input type="date" />
                                </div>
                                <h3>Genres</h3>
                                {showGenres()}
                        </div>
                        <button className="option-button" onClick={handleSearch}>Search</button>
                    </div>
                    {showShows()}
                </div>
            </div>
        )
    }
    return (
        <></>
    )
}

export default Shows