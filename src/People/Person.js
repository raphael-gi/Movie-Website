import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function Person() {
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [error, setError] = useState(null)
    const [more, setMore] = useState({
        isMore: false,
        show: true
    })
    const URL = "https://api.themoviedb.org/3/person/" + id + "?api_key=01b9f5d604812bcd787cd509a6336c8a"
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500/"

    useEffect(() => {
        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw Error("Person couldn't be found")
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setContent(data)
                setError(null)
                if (data.biography.length > 400) {
                    setMore({isMore: true, show: true})
                }
            })
            .catch(error => {
                setError(error.message)
            })
    }, [])

    const showBiography = () => {
        if (more.isMore) {
            return (
                <>                
                    <h3>{more.show ? content.biography.substr(0, 400) : content.biography}</h3>
                    <a onClick={
                        () => {
                            more.show ? setMore({isMore: true, show: false}) : setMore({isMore: true, show: true})
                        }
                    }>{more.show ? "Show More" : "Show Less"}</a>
                </>
            )
        }
        return (
            <h3>{content.biography}</h3>
        )
    }

    if (content) {
        return (
            <>
                <h1>{content.name}</h1>
                <div className="wrap">
                    <div className="wrap-person">
                        <div className="wrap-profile">
                            <img className="person-profile" src={IMAGE_URL + content.profile_path} />
                            <div className="person-profile-shadow" />
                        </div>
                        <div>
                            <div className="person-bio">
                                {showBiography()}
                            </div>
                            <h3>Birthday: {content.birthday}</h3>
                            {content.deathday && <h3>Deathday: {content.deathday}</h3>}
                            <h3>Born in: {content.place_of_birth}</h3>
                            {content.homepage && <h3><a target="_blank" href={content.homepage}>Homepage</a></h3>}
                        </div>
                    </div>
                </div>
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

export default Person