import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Shows() {
    const [content, setContent] = useState(null)

    const [attributes, setAttributes] = useState({
        sort: "popularity.desc"
    })

    const URL = process.env.REACT_APP_API_URL + "discover/tv?api_key=" + process.env.REACT_APP_API_KEY + "&sort_by="

    useEffect(() => {
        setShows()
    }, [attributes])
    
    const setShows = () => {
        fetch(URL + attributes.sort)
        .then((response) => response.json())
        .then((data) => {
            setContent(data)
        })
    }
    const showShows = () => {
        const results = content.results.map((cont) =>
            <Link key={cont.id} to={"/Shows/" + cont.id}>
                <div>
                    <h2>{cont.name}</h2>
                </div>
            </Link>
        )
        return (
            <div>
                {results}
            </div>
        )
    }
    if (content) {
        return (
            <div>
                <h2>Popular Shows</h2>
                <div>
                    <div>Sort</div>
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
                    <button onClick={
                        () => {
                            const order = document.getElementById("sort").value;
                            setAttributes({sort: order})
                        }
                    }>Search</button>
                </div>
                {showShows()}
            </div>
        )
    }
    return (
        <></>
    )
}

export default Shows