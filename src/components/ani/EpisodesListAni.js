import React, {useEffect, useState} from 'react';
import {getStringOfQualities} from "../../utils/anilibria";
import EpisodeLineAni from "./EpisodeLineAni";
import {useCookies} from "react-cookie";

import { getEpisodesViewsByRelease} from "../../utils/backendClient";
import {getCompletedEpisodes} from "../../utils/simple";


const EpisodesListAni = ({list, releaseId, player}) => {
    const [cookies] = useCookies(['access'])

    const [completedArray, setCompletedArray] = useState([])

    useEffect(() => {
        if (!cookies.access || !releaseId) return;

        getEpisodesViewsByRelease(cookies.access, releaseId)
            .then(r => {
                setCompletedArray(getCompletedEpisodes(r.data))
            })
            .catch(e => console.error(e))

    }, [cookies.access, releaseId])

    return (
        <>


            <div className="episodes_content">
                <h1>Эпизоды
                    <span className="episodes_count">{list?.length}</span>
                </h1>

                {
                    list?.map(el => <EpisodeLineAni
                        key={el?.episode}
                        index={el?.episode}
                        qualities={getStringOfQualities(el?.hls)}
                        completed={completedArray.includes(el?.episode)}
                        player={player}
                    />)
                }

            </div>
        </>

    );
};

export default EpisodesListAni;