import React from 'react';
import {useNavigate} from "react-router-dom";

const EpisodeLine = ({index, qualities, completed = false, player = 1}) => {
    const nav = useNavigate()

    const go = () => {
        if (player === 1) nav('play/' + index)
        if (player === 3) nav('play2/' + index)
    }

    return (
        <div className={completed ? "episode_line episode_line_done" : "episode_line"} onClick={go}>
            <p className="episode_line_title">Episode {index}</p>
            <p className="episode_line_qualities">{qualities}</p>
        </div>
    );
};

export default EpisodeLine;