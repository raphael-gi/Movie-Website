import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Trailer from "./Trailer"
import Seasons from "./Seasons"

function Show() {
    const { id } = useParams()
    const [content, setContent] = useState(null)
    const [selected, setSelected] = useState({
        index: 0,
        content: <Trailer />,
    })

    const URL = process.env.REACT_APP_API_URL + "tv/" + id + "?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "original"

    useEffect(() => {
        fetch(URL)
            .then((request) => request.json())
            .then((data) => {
                console.log(data)
                setContent(data)
            })
    }, [])

    if (content && selected.content) {
        return (
            <>  
                <section className="show-start">
                    <div className="wrap-show-start">
                        <h1 className="show-title">{content.name}</h1>
                        <h2 className="tagline"><em>{content.tagline}</em></h2>
                        <h3>{content.overview}</h3>
                    </div>
                    <div className="wrap-backdrop">
                        <div className="show-backdrop" style={{backgroundImage: "linear-gradient(to right, rgb(33, 33, 39), rgba(0, 0, 0, 0)),url('" + IMAGE_URL + content.backdrop_path + "')"}} />
                    </div>
                </section>
                <section className="options">
                    <div className="wrap-show-options">
                        <button onClick={
                            () => {
                                setSelected({index: 0, content: <Trailer {...content} />})
                            }
                        } className={selected.index == 0 ? "show-options options-selected" : "show-options"}>Trailer</button>
                        <button onClick={
                            () => {
                                setSelected({index: 1, content: <Seasons {...content} />})
                            }
                        } className={selected.index == 1 ? "show-options options-selected" : "show-options"}>Seasons</button>
                        <button onClick={
                            () => {
                                setSelected({index: 2, content: <Trailer />})
                            }
                        } className={selected.index == 2 ? "show-options options-selected" : "show-options"}>Info</button>
                        <button onClick={
                            () => {
                                setSelected({index: 3, content: <Trailer />})
                            }
                        } className={selected.index == 3 ? "show-options options-selected" : "show-options"}>Images</button>
                    </div>
                    <div className="selected-content">
                        {selected.content}
                    </div>
                </section>
            </>
        )
    }
    return (
        <></>
    )
}

export default Show