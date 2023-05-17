import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {api_url, compressString, makeNormalList} from "../utils/anilibria";
import ReactHlsPlayer from "react-hls-player";
import EpisodeLine from "../components/EpisodeLine";
import EpisodeLineRight from "../components/EpisodeLineRight";

const PlayerPage = () => {
    const videoRef = useRef();

    let params = useParams()

    let [videoSrc, setVideoSrc] = useState('')
    let [animeTitle, setAnimeTitle] = useState('')

    let [episodes, setEpisodes] = useState([])
    let nav = useNavigate()


    useEffect(() => {

        axios({
            url: api_url + 'title?id=' + params.id,
            method: 'get'
        })
            .then(r => {
                setAnimeTitle(r.data.names.ru)
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
            .catch(e => {})
    }, [params?.id, params?.episode])

    useEffect(() => {
        // const secInterval = setInterval(() => {
        //     const videoEl = videoRef.current
        //     console.log(`time: ${videoEl?.currentTime}`)
        //
        // }, 1000)
        //
        // return () => {
        //     clearInterval(secInterval)
        // }
    }, [])

    const nextEp = () => {

    }

    const prevEp = () => {

    }

    return (
        <div className="player_page">
            <div className="player_page_controls">

                <h1>
                    <span className="controls_title">{compressString(animeTitle, 35)}</span>
                    <span className="controls_episode_title">{params.episode}/{episodes.length}</span>
                </h1>




                {/*<div className="inv_sep"></div>*/}

                {/*<div className="right_episodes_list">*/}
                {/*    {*/}
                {/*        episodes.map(eps => <EpisodeLineRight releaseId={params.id} index={eps.episode} active={eps.episode == params.episode}/>)*/}
                {/*    }*/}
                {/*</div>*/}


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