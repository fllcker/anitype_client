import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {api_url, compressString, makeNormalList} from "../utils/anilibria";
import ReactHlsPlayer from "react-hls-player";

const PlayerPage = () => {
    const videoRef = useRef();

    let params = useParams()
    let nav = useNavigate()

    // anime infos
    let [anime_info, setAnimeInfo] = useState({})
    let [videoSrc, setVideoSrc] = useState('')
    let [episodes, setEpisodes] = useState([])


    useEffect(() => {
        axios({
            url: api_url + 'title?id=' + params.id,
            method: 'get'
        })
            .then(r => {
                setAnimeInfo(r.data)
                let ep = r.data.player?.list[params.episode];
                setEpisodes(makeNormalList(r?.data?.player?.list))

                if (ep) {
                    let hls = ep.hls;

                    if (hls.fhd) {
                        setVideoSrc('https://' + r?.data?.player?.host + hls.fhd)

                    } else if (hls.hd) {
                        setVideoSrc('https://' + r?.data?.player?.host + hls.hd)
                    } else {
                        setVideoSrc('https://' + r?.data?.player?.host + hls.sd)
                    }
                }
                console.log('re ', videoSrc)
                console.log()
            })
            .catch(e => console.error(e))
    }, [params?.id, params?.episode])

    useEffect(() => { // синхронизация времени

    }, [])

    return (
        <div className="player_page">
            <div className="player_page_controls">
                <h1>
                    <span className="controls_title">{compressString(anime_info?.names?.ru, 35)}</span>
                    <span className="controls_episode_title">{params.episode}/{episodes.length}</span>
                </h1>
            </div>

            <ReactHlsPlayer
                src={videoSrc}
                autoPlay={false}
                controls={true}
                className="reacthlsplayer2"
                height="100vh"
                preload={'auto'}
                playerRef={videoRef}
            />

            <div className="player_page_controls player_page_controls_down">
                <div className="player_pae_controls_buttons">
                    <button onClick={() => nav('/release/' + params.id + '/play/' + (+params.episode - 1))} disabled={params.episode == 1}>Предыдущий эпизод</button>
                    <button onClick={() => nav('/release/' + params.id)}>Назад к релизу</button>
                    <button onClick={() => nav('/release/' + params.id + '/play/' + (+params.episode + 1))} disabled={params.episode == episodes.length}>Следующий эпизод</button>
                </div>
            </div>
        </div>
    );
};

export default PlayerPage;