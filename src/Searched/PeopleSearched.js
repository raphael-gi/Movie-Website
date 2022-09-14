import { Link } from "react-router-dom"

function PeopleSearched({id, name, known_for_department, known_for, profile_path}) {
    const IMG_URL = process.env.REACT_APP_API_IMAGE + "w500/"
    const known = () => {
        const know = known_for.map((cont) =>
        <Link key={cont.id} to={cont.media_type == "movie" ? "/Movies/" + cont.id : "/Shows/" + cont.id}>
            {cont.media_type == "movie" ? <h3>{cont.title}</h3> : <h3>{cont.name}</h3>}
        </Link>
        )
        return (
            <div>
                {know}
            </div>
        )
    }
    return (
        <Link className="content" to={"/People/" + id}>
            {profile_path && <img className="content-poster" src={IMG_URL + profile_path} />}
            <div>
                <h2>{name}</h2>
                <h4>Known for:<span className="tagline"> {known_for_department}</span></h4>
                {known()}
            </div>
        </Link>
    )
}

export default PeopleSearched