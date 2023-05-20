import React, {useEffect, useState} from 'react';
import {getStringOfQualities, makeNormalList} from "../utils/anilibria";
import EpisodeLine from "./EpisodeLine";
import {useCookies} from "react-cookie";
import axios from "axios";
import {beUrl, getEpisodesViewsByRelease} from "../utils/beClient";
import {getCompletedEpisodes} from "../utils/simple";
import ChoosePlayer from "./ChoosePlayer";

const EpisodesList = ({list, releaseId}) => {
    const [cookies] = useCookies(['access'])

    const [completedArray, setCompletedArray] = useState([])

    useEffect(() => {
        if (!cookies.access || !releaseId) return;

        getEpisodesViewsByRelease(cookies.access, releaseId)
            .then(r => {
                setCompletedArray(getCompletedEpisodes(r.data))
            })
            .catch(e => console.error(e))

    }, [releaseId])

    return (
        <>


            <div className="episodes_content">
                <h1>Эпизоды
                    <span className="episodes_count">{list?.length}</span>
                </h1>

                {
                    list?.map(el => <EpisodeLine
                        key={el?.episode}
                        index={el?.episode}
                        qualities={getStringOfQualities(el?.hls)}
                        completed={completedArray.includes(el?.episode)}
                    />)
                }

            </div>
        </>

    );
};

export default EpisodesList;