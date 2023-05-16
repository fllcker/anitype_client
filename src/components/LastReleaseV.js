import React, {useState} from 'react';
import {ani_url, compressString} from "../utils/anilibria";
import {useNavigate} from "react-router-dom";

const LastReleaseV = ({anime_info}) => {
    const nav = useNavigate()

    return (
        <div className="last_release_v" onClick={() => nav('/release/' + anime_info?.id)}>

            <span className="last_release_text bold">
                {anime_info?.names?.ru}
                <p className="last_release_text_desc">
                    {compressString(anime_info?.description, 270)}
                </p>
            </span>
            <img src={ani_url + anime_info?.posters?.small?.url} alt="" className="last_release_v_poster"/>
        </div>
    );
};

export default LastReleaseV;