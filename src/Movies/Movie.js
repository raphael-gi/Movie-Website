import { useEffect, useState } from "react";
import axios from '../Conn';
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';

function Trailer(props) {
    const showTrailers = () => {
        const results = props.video.content.results.map((trailer) =>
            <div className="trailer" onClick={
                () => {
                    props.setVideo({
                        content: props.video.content,
                        key: trailer.key
                    })
                }
            } key={trailer.id}>
                <h3>{trailer.name}</h3>
            </div>
        )
        return (
            <>
                {results}
            </>
        )
    }
    return (
        <section style={{display: "flex", gap: "5%"}} id="Trailers" className="content-scroll-section">
            <div className="trailer-main">
                <ReactPlayer url={"https://www.youtube.com/watch?v=" + props.video.key} />
            </div>
            {props.video.content.results.length > 1 && <div className="wrap-trailers"> <h2>Other Trailers</h2> {showTrailers()}</div>}
        </section>
    )
}
function Credits(props) {
    const [creditsAmount, setCreditsAmount] = useState(10)
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "w500/"

    const showCast = () => {
        const casts = props.credits.cast.slice(0, creditsAmount).map((cast) =>
            <Link className="cast" key={cast.id} to={"/People/" + cast.id}>
                {cast.profile_path && <img className="credit-poster" src={IMAGE_URL + cast.profile_path} />}
                <h3>{cast.name}</h3>
                <h4>Playing: {cast.character}</h4>
            </Link>
        )
        return casts
    }
    return (
        <section id="Cast" className="content-scroll-section">
            <div className="wrap-cast">
                {showCast()}
                <button onClick={
                    () => {
                        setCreditsAmount(prevCreditsAmount => prevCreditsAmount + 10)
                    }
                } className="credits-more">+</button>
            </div>
        </section>
    )
}
function Collection(props) {
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "original/"
    const navigate = useNavigate();
    
    const handleNavigation = (id) => {
        navigate("/Movies/" + id)
    }
    const showParts = () => {
        const parts = props.collection.parts.map((part) =>
            <div onClick={
                () => {
                    handleNavigation(part.id)
                }
            } key={part.id} className="content" style={{cursor: "pointer"}}>
                {part.poster_path && <img className="content-poster" src={IMAGE_URL + part.poster_path} />}
                <div>
                    <h2>{part.title}</h2>
                    <h3 className="tagline">{part.release_date}</h3>
                    <h3>{part.vote_average}<i className="bi bi-star-fill" /></h3>
                </div>
            </div>
        )
        return parts
    }
    return (
        <section id="Collection" className="content-scroll-section">
            <h1>{props.collection.name}</h1>
            <h3>{props.collection.overview}</h3>
            <div style={{display: "flex", marginTop: "2%"}}>
                <div className="wrap-content" style={{width: "60%", marginLeft: "2%"}}>
                    {showParts()}
                </div>
                {props.collection.poster_path && <img style={{marginLeft: "auto", height: "700px"}} src={IMAGE_URL + props.collection.poster_path} />}
            </div>

        </section>
    )
}

function Movie() {
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [video, setVideo] = useState({
        content: null,
        key: null
    })
    const [credits, setCredits] = useState(null)
    const [collection, setCollection] = useState(null)
    const [error, setError] = useState(null)

    const URL = "movie/" + id + "?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "original/"
    const CREDITS_URL = "movie/" + id + "/credits?api_key=" + process.env.REACT_APP_API_KEY
    const VIDEO_URL = "movie/" + id + "/videos?api_key=" + process.env.REACT_APP_API_KEY
    const getTrailer = (data) => {
        if (data.results.length == 0) return false
        let official = null
        let offic = null
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].official && data.results[i].type == "Trailer") {
                official = data.results[i].key
                if (data.results[i].name == "Official Trailer") offic = data.results[i].key
            }
        }
        if (offic) return offic
        if (official) return official
        return data.results[0].key
    }
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(URL)
            const requestVideo = await axios.get(VIDEO_URL)
            const requestCredits = await axios.get(CREDITS_URL)
            let requestCollection = null
            setContent(request.data)
            if (request.data.belongs_to_collection) requestCollection = await axios.get(`collection/${request.data.belongs_to_collection.id}?api_key=` + process.env.REACT_APP_API_KEY)
            if (requestVideo.data.results.length > 0) setVideo({ content: requestVideo.data, key: getTrailer(requestVideo.data)})
            if (requestCredits.data.cast.length > 0) setCredits(requestCredits.data)
            if (requestCollection) setCollection(requestCollection.data)
        }
        fetchData()
    }, [])
    const getStars = () => {
        const starsAmount = Math.round((content.vote_average / 2) * 2) / 2
        const stars = []
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(starsAmount)) stars.push(<i className="bi bi-star-fill" />)
            if (i >= starsAmount) stars.push(<i className="bi bi-star" />)
            if (i < starsAmount && i + 1 > starsAmount) stars.push(<i className="bi bi-star-half" />)
        }
        const resultStars = stars.map((star) =>
                <span>{star}</span>
            )
        return (
            resultStars
        )
    }
    if (content) {
        return (
            <>
                 <section className="show-start">
                    <div className="wrap-show-start">
                        <h1 className="show-title">{content.title}</h1>
                        <h2 className="tagline"><em>{content.tagline}</em></h2>
                        <h3>{content.overview}</h3>
                        {getStars()}
                    </div>
                    <div className="wrap-backdrop">
                        <div className="show-backdrop" style={{backgroundImage: "linear-gradient(to right, rgb(33, 33, 39), rgba(0, 0, 0, 0)),url('" + IMAGE_URL + content.backdrop_path + "')"}} />
                    </div>
                </section>
                <div className="wrap">
                    <nav className="movie-nav">
                        {video.content && <a href="#Trailers"><h2>Trailer</h2></a>}
                        {credits && <a href="#Cast"><h2>Cast</h2></a>}
                        {collection && <a href="#Collection"><h2>Collection</h2></a>}
                    </nav>
                    <section className="content-scroll">
                        {video.content && <Trailer video={video} setVideo={setVideo} />}
                        {credits && <Credits credits={credits} setCredits={setCredits} />}
                        {collection && <Collection collection={collection} setCollection={setCollection} />}
                    </section>
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