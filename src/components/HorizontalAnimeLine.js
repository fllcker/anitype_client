import React from 'react';
import {useNavigate} from "react-router-dom";

const HorizontalKodikAnimeLine = ({title1, title2, title3, year, quality}) => {
    let nav = useNavigate()

    const goToWatch = () => {
        nav(`/player/2/${title2}`)
    }

    return (
        <div className="small_release_line" onClick={goToWatch}>
            <div className="small_release_line_el">
                <div className="small_release_line_el_title">Название</div>
                <div className="small_release_line_el_value">{title1}</div>
            </div>
            <div className="small_release_line_el no690">
                <div className="small_release_line_el_title">Оригинальное название</div>
                <div className="small_release_line_el_value">{title2}</div>
            </div>
            <div className="small_release_line_el no930">
                <div className="small_release_line_el_title">Другое название</div>
                <div className="small_release_line_el_value">{title3}</div>
            </div>
            <div className="small_release_line_el no400 rl_small_el">
                <div className="small_release_line_el_title">Год</div>
                <div className="small_release_line_el_value">{year}</div>
            </div>
            <div className="small_release_line_el no310 rl_small_el">
                <div className="small_release_line_el_title">Качество</div>
                <div className="small_release_line_el_value">{quality}</div>
            </div>
        </div>
    );
};

export default HorizontalKodikAnimeLine;