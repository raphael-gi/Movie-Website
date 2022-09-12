import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Seasons(data) {
    const { id } = useParams()
    const [season, setSeason] = useState(null)
    const [selected, setSelected] = useState(data.seasons[0].season_number)

    const SEASONS_URL = process.env.REACT_APP_API_URL + "tv/" + id + "/season/" + selected + "?api_key=" + process.env.REACT_APP_API_KEY
    const IMAGE_URL = process.env.REACT_APP_API_IMAGE + "w500"

    useEffect(() => {
        fetch(SEASONS_URL)
            .then((request) => request.json())
            .then((data) => {
                console.log(data)
                setSeason(data)
            })
    }, [selected])
    const showSeasons = () => {
        const seasons = data.seasons.map((season) =>
            <div onClick={
                () => {
                    setSelected(season.season_number)
                }
            } key={season.id} className="season flex">
                <div>
                    <h3>{season.name}</h3>
                    <h4>Episodes: {season.episode_count}</h4>
                </div>
                <div>
                    <h4>{season.air_date}</h4>
                </div>
            </div>
        )
        return (
            <>
                {seasons}
            </>
        )
    }
    if (season) {
        return (
            <>
                <div className="wrap-show-season">
                    <div className="wrap-seasons">
                        {showSeasons()}
                    </div>
                    <div className="wrap-season">
                        <div>
                            <h2>{season.name}</h2>
                            <h3>{season.overview}</h3>
                        </div>
                        <div>
                            <img className="season_poster" src={IMAGE_URL + season.poster_path} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Seasons