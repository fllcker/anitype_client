import React from 'react';
import {useNavigate} from "react-router-dom";

const EpisodeLineRight = ({index, releaseId, active = false}) => {
    const nav = useNavigate()

    const go = () => {
        nav('/release/' + releaseId + '/play/' + index)
    }

    return (
        <div className={active ? "episode_line episode_line_active" : "episode_line"} onClick={go}>
            <p className="episode_line_title">Episode {index}</p>
        </div>
    );
};

export default EpisodeLineRight;