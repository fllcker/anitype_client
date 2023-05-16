import React from 'react';
import {useNavigate} from "react-router-dom";

const EpisodeLine = ({index, qualities}) => {
    const nav = useNavigate()

    const go = () => {
        nav('play/' + index)
    }

    return (
        <div className="episode_line" onClick={go}>
            <p className="episode_line_title">Episode {index}</p>
            <p className="episode_line_qualities">{qualities}</p>
        </div>
    );
};

export default EpisodeLine;