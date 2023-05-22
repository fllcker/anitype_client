import React, {useEffect, useState} from 'react';
import { useNavigate, useParams} from "react-router-dom";
import {ani_url, makeNormalList} from "../utils/anilibria";
import Header from "../components/Header";
import {useCookies} from "react-cookie";
import {changeFav, getFavStatus} from "../utils/beClient";
import Footer from "../components/Footer";
import ProxyImg from "../components/ProxyImg";
import EpisodesList from "../components/EpisodesList";
import {getAnimeById} from "../utils/alClient";
import ChoosePlayer from "../components/ChoosePlayer";
import {getCurrentPlayerString, removeDescAd} from "../utils/simple";

const ReleasePage = () => {
    const params = useParams();
    const nav = useNavigate();
    const [cookies] = useCookies(['access', 'player'])

    const [choosePlayerWind, setChoosePlayerWind] = useState(false)

    const [anime_info, setAnimeInfo] = useState({})
    const [faved, setFaved] = useState(false)

    useEffect(() => {
        getAnimeById(params?.id)
            .then(r => {
                setAnimeInfo(r.data)
            })
            .catch(() => nav('/search'))

        if (cookies.access) {
            getFavStatus(cookies.access, params?.id)
                .then(res => setFaved(res.data))
                .catch(e => console.error(e))
        }
    }, [cookies.access, nav, params?.id])

    const goToKodik = () => {
        console.log(anime_info.code)
        nav(`/player/2/${anime_info?.code}/r/${params?.id}`)
    }

    return (
        <>
            <Header/>

            <ChoosePlayer display={choosePlayerWind} setDisplay={setChoosePlayerWind}/>

            <div className="page">
                <div className="page_content">
                    <div className="release_content">
                        <div className="release_content_poster">
                            {anime_info?.posters?.small &&
                                <ProxyImg url={ani_url + anime_info?.posters?.small?.url} alt={anime_info?.names?.ru} classes={"release_page_image"}/>
                            }

                        </div>
                        <div className="release_content_info">
                            <div className="release_content_info_upper">
                                <h1>{anime_info?.names?.ru}</h1>

                                <p className="anime_line_info__text">
                                    <span>{anime_info?.type?.full_string}</span>
                                    <div className="span_separator"></div>
                                    <span>{anime_info?.genres?.join(', ')}</span>
                                </p>

                                <p className="anime_line_info__text anime_line_info__desc">
                                    {removeDescAd(anime_info?.description)}
                                </p>
                            </div>

                            <div className="release_content_info_down">
                                {
                                    cookies.access &&
                                    <>
                                        <span className="span_button" onClick={() => changeFav(cookies.access, params?.id, !faved, setFaved)}>{faved ? 'Убрать из избранного' : 'Добавить в избранное'}</span>
                                        <span className="span_button">Отметить просмотренным</span>
                                    </>
                                }

                                <div className="release_content_player_button">
                                    <p>Сейчас у вас {
                                        getCurrentPlayerString(cookies.player)
                                    } плеер</p>
                                    <button className="rcpbb" onClick={() => setChoosePlayerWind(true)}>Выбрать плеер</button>

                                    {
                                        +cookies.player === 2 && <button className="rcpbb kodik_watch_button" onClick={goToKodik}>Смотреть</button>
                                    }


                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        (!cookies.player || cookies.player === '' || +cookies.player === 1 || +cookies.player === 3) &&
                            <EpisodesList list={makeNormalList(anime_info?.player?.list)} releaseId={params?.id} player={+cookies.player}/>
                    }

                </div>
            </div>

            <Footer/>
        </>
    );
};

export default ReleasePage;