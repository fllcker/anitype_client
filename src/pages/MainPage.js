import React from 'react';
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    let nav = useNavigate()

    return (
        <>
            <Header selected='home'/>

            <div className="page">
                <div className="page_content">
                    <h1 className="main_page_title">Смотри аниме на
                         <span className="main_page_title_green"> AniType</span>
                    </h1>
                    <p className="main_page_desc">Огромное количество релизов с озвучкой от AniLibria, современный дизайн и не только, зарегистрируйся прямо сейчас</p>

                    <div className="go_reg">
                        <button onClick={() => nav('/auth')}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>

            <video src="animebg.mp4" className="backgroundvideo" muted autoPlay loop></video>

        </>
    );
};

export default MainPage;