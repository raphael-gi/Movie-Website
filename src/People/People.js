import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function People() {
    const [content, setContent] = useState(null)
    const URL = "https://api.themoviedb.org/3/person/popular?api_key=01b9f5d604812bcd787cd509a6336c8a"

    useEffect(() => {
        fetch(URL)
            .then((request) => request.json())
            .then((data) => {
                setContent(data)
            })
    }, [])
    const showPeople = () => {
        const results = content.results.map((person) =>
            <Link key={person.id} to={"/People/" + person.id}>
                <div>
                    <h2>{person.name}</h2>
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
            <>
                {showPeople()}
            </>
        )
    }
    return (
        <></>
    )
}

export default People