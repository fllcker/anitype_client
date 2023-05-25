import React from 'react';
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const MainPage = () => {

    let nav = useNavigate()

    const [cookies] = useCookies(['username'])

    return (
        <>


            <Header selected='home' />

            <div className="page">
                <div className="page_content">
                    <h1 className="main_page_title">Смотри аниме на
                        <span className="main_page_title_green"> AniType</span>
                    </h1>
                    <p className="main_page_desc">Огромное количество релизов с озвучкой от AniLibria, современный дизайн и не только, зарегистрируйся прямо сейчас</p>

                    {
                        cookies.username ? (
                            <div className="go_reg">
                                <button onClick={() => nav('/last')}>Перейти к просмотру</button>
                            </div>
                        ) : (
                            <div className="go_reg">
                                <button onClick={() => nav('/auth/signup')}>Зарегистрироваться</button>
                            </div>
                        )
                    }
                </div>
            </div>
            <video src="https://cdn.discordapp.com/attachments/1109427599379267655/1109925819775725729/pidor.webm" className="backgroundvideo" muted autoPlay loop playsInline></video>
            {/*<img src="https://images.pling.com/img/00/00/62/69/92/1730410/anime-forest-011.jpg" alt="" className="backgroundvideo"/>*/}

        </>
    );
};

export default MainPage;
