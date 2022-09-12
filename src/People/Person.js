import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"


function Person() {
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [credits, setCredits] = useState(null)
    const [creditsAmount, setCreditsAmount] = useState(10)
    const [error, setError] = useState(null)
    const [more, setMore] = useState({
        isMore: false,
        show: true
    })

    const URL = process.env.REACT_APP_API_URL + "person/" + id + "?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "w500/"
    const CREDITS_URL = process.env.REACT_APP_API_URL + "person/" + id + "/combined_credits?api_key=" + process.env.REACT_APP_API_KEY

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
        fetch(CREDITS_URL)
            .then(response => {
                if (!response.ok) {
                    throw Error("Credits couldn't be found")
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setCredits(data)
                setError(null)
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
    const showCredits = () => {
        const credit = credits.cast.slice(0, creditsAmount).map((credit) =>
            <Link className="credit" key={credit.id} to={credit.media_type == "movie" ? "/Movies/" + credit.id : "/Shows/" + credit.id}>
                {credit.poster_path && <img className="credit-poster" src={process.env.REACT_APP_API_IMAGE + "w500/" + credit.poster_path} />}
                <h3>{credit.title ? credit.title : credit.name}</h3>
                <h4>Played: {credit.character}</h4>
            </Link>
        )
        return (
            <>
                {credit}
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
                    <h2>{content.name} was in</h2>
                    <div className="wrap-credits">
                        {showCredits()}
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