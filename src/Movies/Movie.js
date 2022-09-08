import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Movie() {
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [error, setError] = useState(null)

    const URL = "https://api.themoviedb.org/3/movie/" + id + "?api_key=01b9f5d604812bcd787cd509a6336c8a"
    
    useEffect(() => {
        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw Error("Movie couldn't be found")
                }
                return response.json()
            })
            .then((data) => {
                setContent(data)
                setError(null)
            })
            .catch(error => {
                setError(error.message)
            })
    }, [])
    if (content) {
        return (
            <>
                <h1>{content.title}</h1>
            </>
        )
    }
    if (error) {
        return (
            <div>
                <h1>{error}</h1>
            </div>
        )
    }
    return (
        <></>
    )
}

export default Movie