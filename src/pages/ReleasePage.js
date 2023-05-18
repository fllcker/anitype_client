import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {ani_url, api_url, compressString, getPoster, getStringOfQualities, makeNormalList} from "../utils/anilibria";
import EpisodeLine from "../components/EpisodeLine";
import Header from "../components/Header";
import {useCookies} from "react-cookie";
import {changeFav, getFavStatus} from "../utils/beClient";
import Footer from "../components/Footer";
import ProxyImg from "../components/ProxyImg";
import EpisodesList from "../components/EpisodesList";

const ReleasePage = () => {
    const params = useParams();
    const nav = useNavigate();
    const [cookies] = useCookies(['access'])

    const [anime_info, setAnimeInfo] = useState({})
    const [faved, setFaved] = useState(false)

    useEffect(() => {
        axios({
            url: api_url + 'title?id=' + params.id,
            method: 'get'
        })
            .then(r => {
                console.log('RECEIVED ANIME iNFo', r.data)
                setAnimeInfo(r.data)
            })
            .catch(e => nav('/search'))

        if (cookies.access) {
            getFavStatus(cookies.access, params?.id)
                .then(res => setFaved(res.data))
                .catch(e => console.error(e))
        }
    }, [params?.id])

    return (
        <>
            <Header/>
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
                                    {anime_info?.description}
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
                            </div>
                        </div>
                    </div>

                    <EpisodesList list={makeNormalList(anime_info?.player?.list)} releaseId={params?.id}/>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default ReleasePage;