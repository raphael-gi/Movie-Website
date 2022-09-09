import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function People() {
    const [content, setContent] = useState(null)
    const URL = "https://api.themoviedb.org/3/person/popular?api_key=01b9f5d604812bcd787cd509a6336c8a"
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"

    useEffect(() => {
        fetch(URL)
            .then((request) => request.json())
            .then((data) => {
                setContent(data)
            })
    }, [])
    const showPeople = () => {
        const results = content.results.map((person) =>
            <Link className="person" key={person.id} to={"/People/" + person.id}>
                <div>
                    <img className="profile-image" src={IMAGE_URL + person.profile_path}/>
                    <h3 className="person-title">{person.name}</h3>
                </div>
            </Link>
        )
        return (
            <div className="wrap-people">
                {results}
            </div>
        )
    }
    if (content) {
        return (
            <>
                <h1>Find anyone you want!</h1>
                <div className="wrap">
                    <div className="wrap-input-search">
                        <input placeholder="Search for your favorite person..." className="search-input search-people" type="text" />
                        <button className="search-button">S</button>
                    </div>
                    {showPeople()}
                </div>
            </>
        )
    }
    return (
        <></>
    )
}

export default People