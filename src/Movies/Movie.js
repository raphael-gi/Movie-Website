import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Movie() {
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [credits, setCredits] = useState(null)
    const [creditsAmount, setCreditsAmount] = useState(10)
    const [error, setError] = useState(null)

    const URL = process.env.REACT_APP_API_URL + "movie/" + id + "?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "w500/"
    const CREDITS_URL = process.env.REACT_APP_API_URL + "movie/" + id + "/credits?api_key=" + process.env.REACT_APP_API_KEY

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
        fetch(CREDITS_URL)
            .then(response => {
                if (!response.ok) {
                    throw Error("Movie couldn't be found")
                }
                return response.json()
            })
            .then((data) => {
                setCredits(data)
                setError(null)
            })
            .catch(error => {
                setError(error.message)
            })
    }, [])

    const showCast = () => {
        const casts = credits.cast.slice(0, creditsAmount).map((cast) =>
            <Link className="cast" key={cast.id} to={"/People/" + cast.id}>
                {cast.profile_path && <img className="credit-poster" src={IMAGE_URL + cast.profile_path} />}
                <h3>{cast.name}</h3>
                <h4>Playing: {cast.character}</h4>
            </Link>
        ) 
        return (
            <>
                {casts}
                <button onClick={
                    () => {
                        setCreditsAmount(prevCreditsAmount => prevCreditsAmount + 10)
                    }
                } className="credits-more">+</button>
            </>
        )
    }
    if (content && credits) {
        return (
            <>
                <div className="wrap">
                    <section className="movie-start">
                        <h1>{content.title}</h1>
                        <div className="movie-content">
                            <div>
                                <img className="movie-poster" src={IMAGE_URL + content.poster_path} />
                            </div>
                            <div>
                                <h3><em>{content.tagline}</em></h3>
                                <h3>{content.overview}</h3>
                                <div className="flex">
                                    <button>Trailer</button>
                                    <div>{Math.round(content.vote_average * 10) / 10} <i className="bi bi-star-fill" /></div>
                                    {content.homepage && <h4><a target="_blank" href={content.homepage}>Homepage</a></h4>}
                                </div>
                                {content.belongs_to_collection &&
                                    <div>
                                        {content.belongs_to_collection.name}
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                    <div className="wrap-cast">
                        {showCast()}
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

export default Movie