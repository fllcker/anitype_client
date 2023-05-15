import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {api_url, compressString, getPoster} from "../utils/anilibria";

const ReleasePage = () => {
    const params = useParams();
    const nav = useNavigate();

    const [anime_info, setAnimeInfo] = useState({})

    useEffect(() => {
        axios({
            url: api_url + 'title?id=' + params.id,
            method: 'get'
        })
            .then(r => {
                console.log(r.data)
                setAnimeInfo(r.data)
            })
            .catch(e => nav('/search'))
    }, [params?.id])

    return (
        <div className="page">
            <div className="page_content">
                <div className="release_content">
                    <div className="release_content_poster">
                        <img src={getPoster(anime_info?.posters?.small?.url)} alt="poster" className="release_page_image"/>
                    </div>
                    <div className="release_content_info">
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
                </div>

                <div className="episodes_content">
                    <h1>Эпизоды</h1>
                    <div className="episode_line">
                        <p>Эпизод 1</p>
                    </div>

                    <div className="episode_line">
                        <p>Эпизод 2</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReleasePage;