import { useEffect, useState } from "react"
import axios from '../Conn'
import { Link, useParams } from "react-router-dom"
import ReactPlayer from 'react-player'

function Trailer(props) {
    function showTrailers() {
        const results = props.video.content.results.map((trailer) =>
            <div onClick={
                () => {
                    props.setVideo({
                        content: props.video.content,
                        key: trailer.key
                    })
                }
            } key={trailer.id}>
                {trailer.name}
            </div>
        )
        return (
            <div>
                {results}
            </div>
        )
    }
    return (
        <section id="Trailers" className="content-scroll-section">
            <ReactPlayer url={"https://www.youtube.com/watch?v=" + props.video.key} />
            {showTrailers()}
        </section>
    )
}

function Movie() {
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [credits, setCredits] = useState(null)
    const [creditsAmount, setCreditsAmount] = useState(10)
    const [error, setError] = useState(null)

    const URL = process.env.REACT_APP_API_URL + "movie/" + id + "?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "original/"
    const CREDITS_URL = process.env.REACT_APP_API_URL + "movie/" + id + "/credits?api_key=" + process.env.REACT_APP_API_KEY
    const [video, setVideo] = useState({
        content: null,
        key: null
    })
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
        async function fetchData() {
            const request = await axios.get(VIDEO_URL)
            if (request.data.results.length > 0) {
                setVideo({
                    content: request.data,
                    key: getTrailer(request.data)
                })
            }
        }
        fetchData()
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
            <div className="wrap-cast">
                {casts}
                <button onClick={
                    () => {
                        setCreditsAmount(prevCreditsAmount => prevCreditsAmount + 10)
                    }
                } className="credits-more">+</button>
            </div>
        )
    }
    if (content && credits) {
        return (
            <>
                 <section className="show-start">
                    <div className="wrap-show-start">
                        <h1 className="show-title">{content.title}</h1>
                        <h2 className="tagline"><em>{content.tagline}</em></h2>
                        <h3>{content.overview}</h3>
                    </div>
                    <div className="wrap-backdrop">
                        <div className="show-backdrop" style={{backgroundImage: "linear-gradient(to right, rgb(33, 33, 39), rgba(0, 0, 0, 0)),url('" + IMAGE_URL + content.backdrop_path + "')"}} />
                    </div>
                </section>
                <div className="wrap">
                    <nav className="movie-nav">
                        {video.content && <a href="#Trailers"><h2>Trailer</h2></a>}
                        <a href="#Cast"><h2>Cast</h2></a>
                    </nav>
                    <section className="content-scroll">
                        {video.content && <Trailer video={video} setVideo={setVideo} />}
                        <section id="Cast" className="content-scroll-section">
                            {showCast()}
                        </section>
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