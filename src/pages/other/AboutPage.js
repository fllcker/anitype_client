import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/main/Footer";

const AboutPage = () => {
    return (
        <>
            <Header/>

            <div className="page">
                <div className="page_content">
                    <h1>AniType</h1>

                    <a href="https://t.me/anitypenews">Telegram</a>
                    <a href="https://discord.gg/RJqPpnQ3pT">Discord</a>


                </div>
            </div>

            <Footer/>
        </>
    );
};

export default AboutPage;
