import { Link } from "react-router-dom"

function MovieSearched({id, title, vote_average}) {
    const IMG_URL = "https://image.tmdb.org/t/p/w500/"
    return (
        <Link to={"/Movies/" + id}>
            <div>
                <h2>{title}</h2>
                <h2>{vote_average}</h2>
            </div>
        </Link>
    )
}

export default MovieSearched