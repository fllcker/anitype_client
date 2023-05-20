import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import {getLastReleases} from "../utils/alClient";
import LastReleaseV from "../components/LastReleaseV";
import Footer from "../components/Footer";
import MainFooter from "../components/MainFooter";

const LastReleasesPage = () => {
    const [releases, setReleases] = useState([])

    useEffect(() => {
        getLastReleases(setReleases)
    }, [])

    return (
        <>
            <Header selected='last_releases'/>

            <div className="page">
                <div className="page_content">
                    <h1>Последние релизы</h1>

                    <div className="releases_items">
                        {
                            releases?.map(el => <LastReleaseV anime_info={el} key={el?.id}/>)
                        }
                    </div>
                </div>
            </div>

            <Footer/>
            <MainFooter/>
        </>
    );
};

export default LastReleasesPage;