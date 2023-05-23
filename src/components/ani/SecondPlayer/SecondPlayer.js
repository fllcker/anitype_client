import React, {useEffect, useRef, useState} from 'react';
import '../../../styles/secondPlayer.css'
import ReactHlsPlayer from "react-hls-player";

const SecondPlayer = ({accent_color= '#fb3452', src, animeName, episodeName, time, setTime,
                           volume, setVolume, onBackToRelease,
                           onAddInFavorites, onPreviousEpisode, onNextEpisode, isAutoPlay = false,
                           timeSkip=80, play, setPlay, isNextEpisode = true,
                           isPreviousEpisode = true, setDuration, isFavourites = false, onLoadedData, className}) => {

    const playerRef = useRef()
    const volumeRef = useRef();
    const progressRef = useRef();

    const [isMouseEnter, setIsMouseEnter] = useState(true)

    const [isDataLoaded, setIsDataLoaded] = useState(false)

    const [volumePlayer, setVolumePlayer] = useState(80)
    const [progress, setProgress] = useState(0)
    const [playerState, setPlayerState] = useState(isAutoPlay)

    const showElementInterval = useRef(setInterval(() => {}))

    const isFullScreen = useRef(false);
    const playerContainerRef = useRef();
    //time div
    const [currentTime, setCurrentTime] = useState(0)
    const [durationTime, setDurationTime] = useState(0)

    //
    useEffect(() => {
        if (setTime){
            setTime(currentTime)
        }
    },[currentTime, setTime])

    useEffect(() => {
        if (currentTime !== time && time){
            timeUpdate(time)
        }
    },[time])

    useEffect(() => {
        if (setVolume){
            setVolume(volumePlayer)
        }
    },[setVolume, volumePlayer])

    useEffect(() => {
        if (volumePlayer !== volume && volume){
            setVolumePlayer(volume)
        }
    },[volume])

    useEffect(() => {
        if (isDataLoaded) {
            if (play) {
                setPlayerState(true)
            } else {
                setPlayerState(false)
            }
        }
    }, [play])

    useEffect(() => {
        if (isDataLoaded) {
            if (setPlay) {
                setPlay(playerState)
            }
        }
    }, [playerState, setPlay])

    function BackToRelease(){
        if (onBackToRelease){
            onBackToRelease()
        }
    }

    function AddInFavorites(){
        if (onAddInFavorites){
            onAddInFavorites()
        }
    }

    function PreviousEpisode(){
        if (onPreviousEpisode){
            onPreviousEpisode()
        }
    }

    function NextEpisode(){
        if (onNextEpisode){
            onNextEpisode()
        }
    }
    //

    function onMouseEnter(){
        setIsMouseEnter(false)
        clearInterval(showElementInterval.current)
        let interval = setInterval(() => {
            setIsMouseEnter(true)
        }, 3000)
        showElementInterval.current = interval
    }



    useEffect(() => {
        volumeRef.current.style.background = `linear-gradient(to right, ${accent_color} ${volumePlayer}%, #ccc ${volumePlayer}%)`;
        progressRef.current.style.background = `linear-gradient(to right, ${accent_color} ${progress / playerRef.current.duration * 100}%, rgba(204, 204, 204, 0.63) ${progress / playerRef.current.duration * 100}%)`;


    }, [progress, volumePlayer, currentTime, durationTime, time, volume, playerState, accent_color])

    useEffect(() => {
        playerRef.current.volume = Math.round(volumePlayer) / 100
    }, [volumePlayer])

    useEffect(() => {
        if (isDataLoaded) {
            if (playerState) {
                playerRef.current.play()
            } else {
                playerRef.current.pause()
            }
        }
    }, [playerState, setPlayerState])

    function skip(){
        playerRef.current.currentTime += timeSkip
    }

    function timeUpdate(second){
        if (second){
            playerRef.current.currentTime = parseInt(second)
            setProgress(parseInt(second))
        }
        setCurrentTime(parseInt(playerRef.current.currentTime))
        console.log("Qt")
    }

    function onLoaded(){
        setCurrentTime(playerRef.current.currentTime)
        setDurationTime(playerRef.current.duration)
        if (time){
            timeUpdate(time)
        }
        if (volume){
            setVolumePlayer(volume)
        }
        if (setDuration){
            setDuration(playerRef.current.duration)
        }
        setIsDataLoaded(true)
        if (onLoadedData){
            onLoadedData()
        }
    }

    function convertSecondsToMinutes(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;

        let formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
        let formattedSeconds = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;

        return formattedMinutes + ":" + formattedSeconds;
    }

    function  toggleFullScreen(boolean){
        isFullScreen.current = boolean;
        if (boolean) {
            const videoElement = playerContainerRef.current
            if (videoElement) {
                if (videoElement.requestFullscreen) {
                    videoElement.requestFullscreen();
                } else if (videoElement.mozRequestFullScreen) {
                    // Firefox
                    videoElement.mozRequestFullScreen();
                } else if (videoElement.webkitRequestFullscreen) {
                    // Chrome, Safari, Opera
                    videoElement.webkitRequestFullscreen();
                } else if (videoElement.msRequestFullscreen) {
                    // IE/Edge
                    videoElement.msRequestFullscreen();
                }
            }
        } else if (document.exitFullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                // Chrome, Safari, Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                // IE/Edge
                document.msExitFullscreen();
            }
        }
    }

    function onKeyDown(e){
        if (e.target.value === "space"){
            console.log(e.target)
        }
    }

    return (
        <div onKeyDown={e => onKeyDown(e)} onMouseMove={onMouseEnter} onMouseLeave={() => setIsMouseEnter(true)} ref={playerContainerRef} className={className ? className : 'video-container-second'}>

            {/*<video onLoadedData={onLoaded} onContextMenu={(e) => e.preventDefault()} onTimeUpdate={() => {*/}
            {/*    setProgress(parseInt(playerRef.current.currentTime))*/}
            {/*    timeUpdate()*/}
            {/*}} ref={playerRef} src={src} autoPlay={isAutoPlay} className='video-player' id='video-player'*/}
            {/*       preload='metadata'></video>*/}

            <ReactHlsPlayer
                onClick={() => setPlayerState(!playerState)}
                onTimeUpdate={() => {
                    setProgress(parseInt(playerRef.current.currentTime))
                    timeUpdate()
                }}
                onContextMenu={(e) => e.preventDefault()}
                src={src}
                autoPlay={isAutoPlay}
                controls={false}
                id='video-player-second'
                onLoadedData={onLoaded}
                className="video-player-second"
                playerRef={playerRef}
            />

            <div onMouseLeave={() => setIsMouseEnter(true)} className={!isMouseEnter ? 'video-hud-second' : 'video-hud-second hidden'}>

                <div className="time-div-second top">
                    <div>
                        <div className="anime_name-second">{animeName}</div>
                        <div className="episode-second">{episodeName}</div>
                    </div>
                    <div>
                        <div className='video-hud__element-second' ></div>
                        <div className='video-hud__element-second video-hud__duration' >{convertSecondsToMinutes(Math.round(currentTime))}/{convertSecondsToMinutes(Math.round(durationTime))}</div>
                    </div>
                </div>

                <div className="div-progress-bar-second">
                    <input ref={progressRef} type="range" min="0" max={durationTime} value={progress} onChange={e => timeUpdate(e.target.value)}  id="range1s"/>
                </div>


                <div className="time-div-second">
                    <div style={{display: "flex"}}>

                        <div className='video-hud__mute-second list_button' title="Вернуться к релизу" onClick={BackToRelease}>
                            <svg height={17} width={17} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 0v64h64V96H64zm384 0H192v64H448V96zM64 224v64h64V224H64zm384 0H192v64H448V224zM64 352v64h64V352H64zm384 0H192v64H448V352z"/>
                            </svg>
                        </div>

                        <div className={isFavourites ? 'video-hud__mute-second fav true' : "video-hud__mute-second fav"} title="Добавить в избранное" onClick={AddInFavorites}>
                            <svg height={17} width={17}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/>
                            </svg>
                        </div>

                        <div className='video-hud__mute-second skip' title={`Перемотать на ${timeSkip}s`} onClick={skip}>
                            <svg height={17} width={17} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
                            </svg>
                        </div>


                    </div>

                    <div style={{display: "flex"}}>

                        <div className={isPreviousEpisode ? 'video-hud__mute-second prev_episode' : 'video-hud__mute-second prev_episode disabled'} onClick={isPreviousEpisode ? PreviousEpisode : null}>
                            <svg height={17} width={17} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"/>
                            </svg>
                        </div>
                        <div className={isDataLoaded ? 'video-hud__mute-second pause' : "video-hud__mute-second pause unActive"} onClick={() => setPlayerState(!playerState)}>
                            {!playerState ? <svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.9,18.9V5.1c0-1.6,1.7-2.6,3-1.8l12,6.9c1.4,0.8,1.4,2.9,0,3.7l-12,6.9C5.6,21.5,3.9,20.5,3.9,18.9z"/>
                                </svg> :
                                <svg height={22} width={22} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
                                </svg>
                            }
                        </div>
                        <div className={isNextEpisode ? 'video-hud__mute-second next_episode' : 'video-hud__mute-second next_episode disabled'} onClick={isNextEpisode ? NextEpisode : null}>
                            <svg height={17} width={17} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"/>
                            </svg>
                        </div>

                    </div>

                    <div style={{display: "flex", zIndex: 5}}>
                        <div className='video-hud__mute-second' onClick={() => {
                            if (volumePlayer === 0) {
                                setVolumePlayer(50)
                            }
                            else {
                                setVolumePlayer(0)
                            }
                        }}>

                            {volumePlayer === 0 && <svg className="svg_mute-second mute" width={19} height={19} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
                            </svg>}
                            {(volumePlayer > 0 && volumePlayer < 60) && <svg className="svg_mute-second" height={17} width={17} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/>
                            </svg>}
                            {volumePlayer >= 60 && <svg className="svg_mute-second" height={20} width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
                            </svg>}

                        </div>

                        <div className="range-second">
                            <input value={volumePlayer} onChange={e => setVolumePlayer(parseInt( e.target.value))} ref={volumeRef} type="range" min="0" max="100" id="range2-second"/>
                        </div>
                        <div className="full-screen-button-second" onClick={() => toggleFullScreen(!isFullScreen.current)}>
                            <svg width={17} height={17} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SecondPlayer;