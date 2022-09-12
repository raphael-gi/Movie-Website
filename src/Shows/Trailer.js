import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReactPlayer from 'react-player'


function Trailer() {
    const { id } = useParams()

    const [video, setVideo] = useState({
        content: null,
        key: null
    })
    const VIDEO_URL = process.env.REACT_APP_API_URL + "tv/" + id + "/videos?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "original"

    const getTrailer = (data) => {
        if (data.results.length == 0) return false
        let official = false
        let offic = false
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].official && data.results[i].type == "Trailer") {
                official = data.results[i].key
                if (data.results[i].name == "Official Trailer") offic = data.results[i].key
            }
        }
        if (offic) return offic
        if (official) return official
        return 0
    }
    useEffect(() => {
        fetch(VIDEO_URL)
            .then((request) => request.json())
            .then((data) => {
                setVideo({
                    content: data,
                    key: getTrailer(data)
                })
            })
    }, [])
    let trailer
    if (video.content) {
        trailer = video.content.results.map((trailer) =>
            <div onClick={
                () => {
                    setVideo({
                        content: video.content,
                        key: trailer.key
                    })
                }
                //style={{backgroundImage: "url(" + IMAGE_URL + content.backdrop_path + ")"}}
            } key={trailer.id} className="show-trailer">
                <h4>{trailer.name}</h4>
            </div>
        )
    }
        return (
            <div className="show-trailers">
                <div className="show-selected-trailer">
                    <ReactPlayer width={"100%"} url={"https://www.youtube.com/watch?v=" + video.key} />
                </div>
                <div className="wrap-trailer-options">
                    {trailer}
                </div>
            </div>
        )
}

export default Trailer