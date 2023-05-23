import React from 'react';
import Footer from "../components/main/Footer";
import HeaderNew from '../components/HeaderNew';

const HomePage = () => {
    return (
        <>
            <HeaderNew />

            <div className="page">
                <div className="page_content">
                    <h1>Добрый день, <span className="home_username"> fllcker</span></h1>

                    <div className="home_blocks">
                        <div className="home_block">


                            <h2>Друзья</h2>
                            <p className="home_block_title">Узнайте, что смотрят ваши друзья. Вы также можете присоединиться к просмотру, нажав на имя друга</p>

                            <div className="fr_list_block">
                                <div className="fr_list_block_el">
                                    <div className="friends_list_username">fllcker</div>
                                    <div className="friends_list_watching">
                                        <span className="friends_list_watching_watch">Смотреть</span>
                                        <span className="friends_list_watching_title"> Адский рай</span>
                                        <span className="friends-list_watching_time">1:30</span>
                                    </div>
                                </div>

                                <div className="fr_list_block_el">
                                    <div className="friends_list_username">fllcker</div>
                                    <div className="friends_list_watching">
                                        <span className="friends_list_watching_watch">Смотреть</span>
                                        <span className="friends_list_watching_title"> Адский рай</span>
                                        <span className="friends-list_watching_time">1:30</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default HomePage;