import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import {api_url} from "../utils/anilibria";
import {getEpisodeTime} from "../utils/beClient";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {calcEpisodeDone} from "../utils/simple";
import GlobalMessageReceiver from "../components/GlobalMessageReceiver";
import SecondPlayer from "../components/SecondPlayer";

const SecondPlayerPage  = () => {

    let params = useParams()
    let nav = useNavigate()
    let [cookies] = useCookies(['access'])

    // anime infos
    let [videoSrc, setVideoSrc] = useState('')

    let con = useRef(false)
    let lastPushedTime = useRef(0)

    //player
    const time = useRef(0);
    const [currentTime, setCurrentTime] = useState(0)
    const durationTime= useRef(0)


    useEffect(() => {
        axios({
            url: api_url + 'title?id=' + params.id,
            method: 'get'
        })
            .then(r => {
                //setAnimeInfo(r.data)
                let ep = r.data.player?.list[params.episode];
                //setEpisodes(makeNormalList(r?.data?.player?.list))

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
            })
            .catch(e => console.error(e))
    }, [params.id, params.episode])

    const onPlayerLoaded = () => {
        if (!cookies.access) return console.log('!cookies.access');
        if (!params.id || !params.episode) return console.log('!params.id || !params.episode');

        getEpisodeTime(cookies.access, params.id, params.episode)
            .then(tr => {
                time.current = tr.data
                setCurrentTime(tr.data)
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
                    console.log(time, durationTime, lastPushedTime.current)
                    if (time.current && time.current !== 0 && time.current !== lastPushedTime.current && durationTime.current !== 0) {
                        lastPushedTime.current = time.current;


                        const jsonData = {
                                access: cookies.access,
                                releaseId: params.id,
                                episodeId: params.episode,
                                time: time ? Math.round(time.current) : -1,
                                done: calcEpisodeDone(time, durationTime),
                            };


                        const message = JSON.stringify(jsonData);

                        stompClient.publish({destination: '/app/push-time', body: message});
                        console.log('pushed time: ' + time.current)
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

    function timeChange(a){
        console.log(a)
        time.current = a
    }

    return (
        <>
            <GlobalMessageReceiver/>
            <div className="player_page">
                <SecondPlayer src={videoSrc} onLoadedData={onPlayerLoaded} autoPlay={true} time={currentTime} setTime={timeChange} setDuration={(e) => {
                    durationTime.current = e
                }} accent_color={"#1FDF64"}
                />
            </div>
        </>
    );
};

export default SecondPlayerPage;