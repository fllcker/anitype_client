import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import {api_url, compressString, makeNormalList} from "../../utils/anilibria";
import ReactHlsPlayer from "react-hls-player";
import {useCookies} from "react-cookie";
import {getEpisodeTime} from "../../utils/backendClient";
import {calcEpisodeDone} from "../../utils/simple";
import GlobalMessageReceiver from "../../components/other/GlobalMessageReceiver";

const PlayerPage = () => {
    const videoRef = useRef();

    let params = useParams()
    let nav = useNavigate()
    let [cookies] = useCookies(['access'])

    // anime infos
    let [anime_info, setAnimeInfo] = useState({})
    let [videoSrc, setVideoSrc] = useState('')
    let [episodes, setEpisodes] = useState([])

    let con = useRef(false)
    let lastPushedTime = useRef(0)


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

    const onPlayerLoaded = (o) => {
        if (!cookies.access) return console.log('!cookies.access');
        if (!params.id || !params.episode) return console.log('!params.id || !params.episode');
        //o.target.currentTime = 30

        getEpisodeTime(cookies.access, params.id, params.episode)
            .then(tr => {
                videoRef.current.currentTime = tr.data

                console.log('received time', tr.data)
            })
            .catch(e => console.error(e))

    }

    useEffect(() => { // синхронизация времени
        if (!params.id || !params.episode || !cookies.access) return console.log("!params.id || !params.episode || !cookies.access");

        const socket = new SockJS('https://anitypes.site/push-time');
        const stompClient = new Client({webSocketFactory: () => socket});

        const connectAndSubscribe = () => {
            if (!con.current) {
                stompClient.activate();
                con.current = true;
            }

            stompClient.onConnect = () => {
                const interval = setInterval(() => {
                    if (videoRef.current?.currentTime && videoRef.current.currentTime !== 0 && videoRef.current.currentTime !== lastPushedTime.current) {
                        lastPushedTime.current = videoRef.current.currentTime;

                        const jsonData = {
                            access: cookies.access,
                            releaseId: params.id,
                            episodeId: params.episode,
                            time: videoRef.current?.currentTime ? Math.round(videoRef.current.currentTime) : -1,
                            done: calcEpisodeDone(videoRef.current?.currentTime, videoRef.current?.duration),
                        };
                        const message = JSON.stringify(jsonData);

                        stompClient.publish({destination: '/app/push-time', body: message});
                        console.log("SESDANSDNASJNDASD", message)
                        console.log('timee', videoRef.current.currentTime)
                    }
                }, 3000);

                return () => {
                    clearInterval(interval);
                    stompClient.deactivate();
                };
            };
        };

        connectAndSubscribe();
    }, [params?.id, params.episode, cookies.access])

    return (
        <>
            <GlobalMessageReceiver/>
            <div className="player_page">
                <div className="player_page_controls">
                    <h1>
                        <span className="controls_title">{compressString(anime_info?.names?.ru, 35)}</span>
                        <span className="controls_episode_title">{params.episode}/{episodes.length}</span>
                    </h1>
                </div>

                <ReactHlsPlayer
                    src={videoSrc}
                    autoPlay={true}
                    controls={true}
                    className="reacthlsplayer2"
                    height="100vh"
                    playerRef={videoRef}
                    onLoadedData={onPlayerLoaded}
                />

                <div className="player_page_controls player_page_controls_down">
                    <div className="player_pae_controls_buttons">
                        <button onClick={() => nav('/release/' + params.id + '/play/' + (+params.episode - 1))}
                                disabled={params.episode == 1}>Предыдущий эпизод
                        </button>
                        <button onClick={() => nav('/release/' + params.id)}>Назад к релизу</button>
                        <button onClick={() => nav('/release/' + params.id + '/play/' + (+params.episode + 1))}
                                disabled={params.episode == episodes.length}>Следующий эпизод
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayerPage;