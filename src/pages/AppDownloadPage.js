import React from 'react';
import Footer from "../components/main/Footer";
import HeaderNew from '../components/HeaderNew';

const AppDownloadPage = () => {
    return (
        <>
            <HeaderNew selected='app'/>

            <div className="page download_app_page">
                <div className="page_content">
                    <h1 className="download_app_title">Приложение для <span className="windows"> Windows </span> уже готово!</h1>
                    <div className="download_app_button_div">


                        <a href="https://dl.dropboxusercontent.com/s/zrv87uq4965wjrz/AniType.rar">
                            <button>Скачать</button>
                        </a>
                    </div>
                </div>
                <img src="previewApp.png" alt="App preview" className="download_app_img"/>

            </div>

            <Footer/>
        </>
    );
};

export default AppDownloadPage;