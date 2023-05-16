import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import {getFavs} from "../utils/beClient";
import {useCookies} from "react-cookie";
import {getCurrentReleases} from "../utils/alClient";
import LastReleaseV from "../components/LastReleaseV";
import Footer from "../components/Footer";

const FavPage = () => {
    let [cookies] = useCookies(['access'])

    let [result, setResult] = useState([])

    useEffect(() => {
        getFavs(cookies.access)
            .then(r => {
                let a = []
                r.data.content?.map(e => a.push(e.releaseId))
                let releasesString = a.join(",")

                getCurrentReleases(setResult, releasesString)
            })
    }, [])

    return (
        <>
            <Header selected="fav"/>

            <div className="page">
                <div className="page_content">
                    <h1>Избранное</h1>

                    <div className="releases_items favs_releases_items">
                        {
                            result?.map(el => <LastReleaseV anime_info={el}/>)
                        }
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default FavPage;