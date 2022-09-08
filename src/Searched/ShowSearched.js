import { Link } from "react-router-dom"

function ShowSearched({id, name, vote_average}) {
    return (
        <Link to={"/Shows/" + id}>
            <div>
                <h2>{name}</h2>
                <h3>{vote_average}</h3>
            </div>
        </Link>
    )
}

export default ShowSearched