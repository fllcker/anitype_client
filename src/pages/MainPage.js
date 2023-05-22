import React from 'react';
import Header from "../components/main/Header";
import {useNavigate} from "react-router-dom";
import ParticlesComp from "../components/other/ParticlesComp";

const MainPage = () => {
    let nav = useNavigate()

    return (
        <>

            <ParticlesComp/>

            <Header selected='home'/>

            <div className="page">
                <div className="page_content">
                    <h1 className="main_page_title">Смотри аниме на
                         <span className="main_page_title_green"> AniType</span>
                    </h1>
                    <p className="main_page_desc">Огромное количество релизов с озвучкой от AniLibria, современный дизайн и не только, зарегистрируйся прямо сейчас</p>

                    <div className="go_reg">
                        <button onClick={() => nav('/auth/signup')}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>

            {/*<video src="animebg.webm" className="backgroundvideo" muted autoPlay loop></video>*/}
            {/*<img src="https://images.pling.com/img/00/00/62/69/92/1730410/anime-forest-011.jpg" alt="" className="backgroundvideo"/>*/}

        </>
    );
};

export default MainPage;