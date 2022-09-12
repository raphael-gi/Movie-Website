import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"


function People() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [inputValue, setInputValue] = useState(searchParams.get('query') ? searchParams.get('query') : "")
    const [content, setContent] = useState(null)


    const URL = process.env.REACT_APP_API_URL + "person/popular?api_key=" + process.env.REACT_APP_API_KEY
    const SEARCH_URL = process.env.REACT_APP_API_URL + "search/person/?api_key=" + process.env.REACT_APP_API_KEY + "&query="
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "w500/"

    useEffect(() => {
        fetch(searchParams.get('query') ? SEARCH_URL + inputValue : URL)
            .then((request) => request.json())
            .then((data) => {
                console.log(data)
                setContent(data)
            })
    }, [searchParams])
    const showPeople = () => {
        const results = content.results.map((person) =>
            <Link className="person" key={person.id} to={"/People/" + person.id}>
                <div>
                    {person.profile_path && <img className="profile-image" src={IMAGE_URL + person.profile_path}/>}
                    <h3 className="person-title">{person.name}</h3>
                    <h4>{person.known_for.map((known) => known.title ? known.title+ ", " : known.name + ", ")}</h4>
                </div>
            </Link>
        )
        return (
            <div className="wrap-people">
                {results}
            </div>
        )
    }
    const handleSubmit = event => {
        event.preventDefault();
        const inp = document.getElementById("search").value
        setSearchParams({query: inp})
    }
    const handelChange = event => {
        setInputValue(event.target.value)
    }
    if (content) {
        return (
            <>
                <h1>Find anyone you want!</h1>
                <div className="wrap">
                    <div className="wrap-input-search">
                        <form onSubmit={handleSubmit}>
                            <input value={inputValue} onChange={handelChange} id="search" placeholder="Search for your favorite person..." className="search-input search-people" type="text" />
                            <button className="search-button">S</button>
                        </form>
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