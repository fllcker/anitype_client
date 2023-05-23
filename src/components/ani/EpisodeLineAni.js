import React from 'react';
import {useNavigate} from "react-router-dom";

const EpisodeLineAni = ({index, qualities, completed = false}) => {
    const nav = useNavigate()

    const go = () => {
        nav('play/' + index)
    }

    return (
        <div className={completed ? "episode_line episode_line_done" : "episode_line"} onClick={go}>
            <p className="episode_line_title">Episode {index}</p>
            <p className="episode_line_qualities">{qualities}</p>
        </div>
    );
};

export default EpisodeLineAni;