import React from 'react';
import Header from "../components/Header";
import {Link, useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';

const MainPage = () => {

    let nav = useNavigate()

    const [cookies] = useCookies(['username'])

    return (
        <>

            <Header selected='home' />

            <div className="page">
                <div className="page_content">
                    <h1 className="main_page_title">Что случилось?</h1>
                    <p className="main_page_desc">Мы решили полностью переделать сайт. Поэтому того, что видите сейчас скоро не будет. Новый дизайн и функционал вы можете посмотреть в моем тиктоке. Возможно, то, что есть сейчас останется на другом домене, и с урезанным функционалом. В любом случае, то, что будет вас точно удивит! Следите за новостями в нашем дискорд сервере и телеграм канале.</p>



                    <Link to="https://t.me/anitypenews">
                        <button>t.me/anitypenews</button>
                    </Link>
                    <p></p>
                    <iframe src="https://discord.com/widget?id=1109422526762864682&theme=dark" width="350" height="500"
                            allowTransparency="true" frameBorder="0"
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>

                </div>
            </div>
            {/*<img src="https://images.pling.com/img/00/00/62/69/92/1730410/anime-forest-011.jpg" alt="" className="backgroundvideo"/>*/}

        </>
    );
};

export default MainPage;
