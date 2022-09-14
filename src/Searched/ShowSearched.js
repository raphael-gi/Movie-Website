import { Link } from "react-router-dom"

function ShowSearched({id, name, vote_average, first_air_date, poster_path, overview}) {
    const IMG_URL = process.env.REACT_APP_API_IMAGE + "w500/"
    return (
        <Link className="content" to={"/Shows/" + id}>
            {poster_path && <img className="content-poster" src={IMG_URL + poster_path} />}
            <div>
                <h2>{name}</h2>
                <div className="flex">
                    <div>
                        <h3 className="tagline">{first_air_date}</h3>
                        <h3>{vote_average}<i className="bi bi-star-fill" /></h3>
                    </div>
                    <h3>{overview.length > 200 ? overview.substr(0, 200) + "...." : overview}</h3>
                </div>
            </div>
        </Link>
    )
}

export default ShowSearched