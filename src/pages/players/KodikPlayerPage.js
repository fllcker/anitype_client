import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const KodikPlayerPage = () => {
    let params = useParams()

    let [info, setInfo] = useState({})
    let [linkUrl, setLinkUrl] = useState()
    let frame = useRef()

    let [message, setMessage] = useState('')

    useEffect(() => {
        if (!params.orig) return;

        axios({
            url: `https://kodikapi.com/search?token=3bd0a27dfccd284c54f4889f4a7d6453&title_orig=${params.orig}`,
            method: 'get'
        })
            .then(r => {
                // r.data.results[0].link
                if (r.data.results && r.data.results.length > 0) {
                    setLinkUrl(r.data.results[0].link)
                    setInfo(r.data.results[0])
                } else {
                    setMessage('Данное аниме не доступно для просмотра в этом плеере')
                }
            })
    }, [params.orig])

    return (
        <>
        {/*    Add global message receiver*/}
            <div className="player_page">
                <div className="player_page_controls player2_page_controls">
                    <h1>
                        <span className="controls_title">{info?.title}</span>
                    </h1>
                    {
                        !params.releaseId ?
                            <Link to="/">Вернуться на главную</Link> :
                            <Link to={`/release/${params.releaseId}`}>Вернуться к релизу</Link>
                    }

                </div>

                {
                    message === '' ?
                        <iframe ref={frame} title="player" src={linkUrl}  className="kodikplayer"
                                frameBorder="0" allowFullScreen allow="autoplay *; fullscreen *"></iframe> :
                        <p>{message}</p>

                }

                <p className="player2_page_small_text">Внимание! В этом плеере есть реклама. Если вы хотите смотреть без рекламы, можете выбрать стандартный плеер</p>
            </div>
        </>
    );
};

export default KodikPlayerPage;