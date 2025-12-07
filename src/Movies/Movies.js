import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../Conn'

function Movies() {
    const [content, setContent] = useState(null)
    const [genre, setGenre] = useState(null)

    const [attributes, setAttributes] = useState({
        sort: "popularity.desc",
        genres: []
    })
    const [selectedGenres, setSelectedGenres] = useState([])
    const [option, setOption] = useState(null)

    const URL = process.env.REACT_APP_API_URL + "discover/movie?api_key=" + process.env.REACT_APP_API_KEY + "&sort_by="
    const GENRE_URL = process.env.REACT_APP_API_URL + "genre/tv/list?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "w500"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(URL + attributes.sort)
            const requestGenre = await axios.get(GENRE_URL)
            setContent(request.data)
            setGenre(requestGenre.data)
        }
        fetchData()
    }, [attributes])
    
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
    if (content) {
        return (
            <div>
                <div className="wrap">
                    <h1>Popular Movies</h1>
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
                                <h3>Genres</h3>
                                {showGenres()}
                                </div>
                                <button className="option-button" onClick={handleSearch}>Search</button>
                            </div>
                        {showMovies()}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <></>
    )
}

export default Movies