import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getSearchUrl} from "../utils/anilibria";
import AnimeLine from "../components/AnimeLine";
import Header from "../components/Header";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer";
import LastReleaseV from "../components/LastReleaseV";

const SearchPage = () => {
    let params = useParams()
    let [query, setQuery] = useState('')
    let [result, setResult] = useState([])


    const goSearch = () => {
        if (query === '') return;

        axios({
            url: getSearchUrl(query),
            method: 'get'
        })
            .then(r => {
                setResult(r.data)
                console.log(r.data)
            })
            .catch(er => console.error(er))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') goSearch()
    }

    useEffect(() => {
        if (params.query) {
            setQuery(params.query)

            axios({
                url: getSearchUrl(params.query),
                method: 'get'
            })
                .then(r => {
                    setResult(r.data)
                    console.log(r.data)
                })
                .catch(e => console.error(e))
        }
    }, [params.query])

    return (
        <>
            <Header/>
            <div className="page">
                <div className="page_content">
                    <h1>Поиск</h1>
                    <input type="text" className="search_page_input" placeholder="Введите запрос"
                           onKeyDown={handleKeyDown} onBlur={goSearch} value={query}
                           onChange={e => setQuery(e.target.value)}/>


                    <div className="releases_items">
                        {
                            // result?.list?.map(e => <AnimeLine anime_info={e} key={e.id}/>)     | anime_list
                            result?.list?.map(e => <LastReleaseV anime_info={e} key={e.id}/>)
                        }

                        {
                            (query !== '' && (!result || !result.list || result?.list?.length === 0)) &&
                            <div className="release_items_null">
                                <p className="release_items_null_h1">:(</p>
                                <p className="release_items_null_text">Нет результатов</p>
                            </div>
                        }

                        {
                            (query === '') &&
                            <div className="release_items_null">
                                <p className="release_items_null_h1">{'<-'}</p>

                                <p className="release_items_null_text">Введите запрос</p>
                            </div>
                        }


                    </div>

                </div>
            </div>
            <Footer/>
        </>
    );
};

export default SearchPage;