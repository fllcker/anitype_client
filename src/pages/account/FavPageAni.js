import React, {useEffect, useState} from 'react';
import Header from "../../components/main/Header";
import {getFavs} from "../../utils/backendClient";
import {useCookies} from "react-cookie";
import {getCurrentReleases} from "../../utils/anilibriaClient";
import LastReleaseAni from "../../components/ani/LastReleaseAni";
import Footer from "../../components/main/Footer";

const FavPageAni = () => {
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
            .catch(e => console.error(e))
    }, [])

    return (
        <>
            <Header selected="fav"/>

            <div className="page">
                <div className="page_content">
                    <h1>Избранное</h1>

                    <div className="releases_items favs_releases_items">
                        {
                            result?.map(el => <LastReleaseAni anime_info={el} key={el.id}/>)
                        }
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default FavPageAni;