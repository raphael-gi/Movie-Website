import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Show() {
    const { id } = useParams()
    const [content, setContent] = useState(null)

    const URL = "https://api.themoviedb.org/3/tv/" + id + "?api_key=01b9f5d604812bcd787cd509a6336c8a"

    useEffect(() => {
        fetch(URL)
            .then((request) => request.json())
            .then((data) => {
                setContent(data)
            })
    }, [])

    if (content) {
        return (
            <>
                <h1>{content.name}</h1>
                <h3>{content.overview}</h3>
            </>
        )
    }
    return (
        <></>
    )
}

export default Show