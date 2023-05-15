import React from 'react';
import {compressString, getPoster} from "../utils/anilibria";

const AnimeLine = ({anime_info}) => {
    return (
        <div className="anime_line">
            <div className="anime_line_poster">
                <img className="anime_line_poster_image"
                     src={getPoster(anime_info?.posters?.small?.url)} alt="alt"/>
            </div>
            <div className="anime_line_info">
                <p className="anime_line_info__title">{anime_info?.names?.ru}
                    {
                        anime_info?.names?.en &&
                        <span className="other_names">
                                    ({anime_info?.names?.en})
                        </span>
                    }

                </p>
                <p className="anime_line_info__text">
                    <span>{anime_info?.type?.full_string}</span>
                    <div className="span_separator"></div>
                    <span>{anime_info?.genres?.join(', ')}</span>
                </p>
                <p className="anime_line_info__text anime_line_info__desc">
                    {compressString(anime_info?.description)}
                </p>

                <div className="anime_line_button">
                    <button className="anime_line_open">Смотреть</button>

                </div>
            </div>
        </div>
    );
};

export default AnimeLine;