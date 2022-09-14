import { Link } from "react-router-dom"

function MovieSearched({id, title, vote_average, release_date, poster_path}) {
    const IMG_URL = process.env.REACT_APP_API_IMAGE + "w500/"
    return (
        <Link className="content" to={"/Movies/" + id}>
            {poster_path && <img className="content-poster" src={IMG_URL + poster_path} />}
            <div>
                <h2>{title}</h2>
                <h3 className="tagline">{release_date}</h3>
                <h3>{vote_average}<i className="bi bi-star-fill" /></h3>
            </div>
        </Link>
    )
}

export default MovieSearched