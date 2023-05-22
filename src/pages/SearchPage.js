import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import {useParams} from "react-router-dom";
import Footer from "../components/main/Footer";
import {getSearch} from "../utils/anilibriaClient";
import SearchPageResultsAni from "../components/ani/SearchPageResultsAni";
import {getSearchKodik} from "../utils/kodikClient";
import {removeDuplicatesByTitleOrig} from "../utils/simple";
import SearchPageResultsKodik from "../components/kodik/SearchPageResultsKodik";
import MainFooter from "../components/main/MainFooter";

const SearchPage = () => {
    let [source, setSource] = useState('ani')

    let params = useParams()
    let [query, setQuery] = useState('')
    let [result, setResult] = useState([])

    useEffect(() => console.log(result), [result])


    const goSearch = () => {
        if (query === '') return;

        if (source === 'ani') {
            goSearchAni()
        } else if (source === 'kodik') {
            goSearchKodik()
        }
    }

    const goSearchAni = () => {
        if (query === '') return;

        getSearch(query)
            .then(r => {
                setResult(r.data)
            })
            .catch(er => console.error(er))
    }

    const goSearchKodik = () => {
        if (query === '') return;

        getSearchKodik(query)
            .then(r => {
                // console.log('kod', r.data.results)
                // console.log('kod2', removeDuplicatesByTitleOrig(r.data.results))
                setResult(removeDuplicatesByTitleOrig(r.data.results))
            })
            .catch(er => console.error(er))
    }

    // когда нажимается enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') goSearch()
    }

    // поиск когда из другого места
    useEffect(() => {
        if (params.query) {
            setQuery(params.query)
            goSearch()
        }
    }, [params.query])

    const changeSource = (nowsrc) => {
        if (source !== nowsrc) {
            setSource(nowsrc)
            if (nowsrc === 'ani') goSearchAni()
            if (nowsrc === 'kodik') goSearchKodik()
        }

    }

    return (
        <>
            <Header selected='search'/>
            <div className="page">
                <div className="page_content">
                    <h1>Поиск</h1>
                    <input type="text" className="search_page_input" placeholder="Введите запрос"
                           onKeyDown={handleKeyDown} onBlur={goSearch} value={query}
                           onChange={e => setQuery(e.target.value)}/>
                    <p className="search_under">
                        <span>
                            <span className="search_under_el search_under_no_select">Источник:</span>
                            <span className={source === 'ani' ? "search_under_el search_under_h_selected" : "search_under_el"}
                            onClick={() => changeSource('ani')}>Anilibria</span>
                            <span className={source === 'kodik' ? "search_under_el search_under_h_selected" : "search_under_el"}
                            onClick={() => changeSource('kodik')}>Kodik</span>
                        </span>

                        <span>
                            <span className="search_under_el search_under_el_no_phone">Каталог</span>
                            <span className="search_under_el search_under_el_no_phone">Расширенный поиск</span>
                        </span>
                    </p>

                    {
                        source === 'ani' &&
                        <SearchPageResultsAni result={result} query={query} />
                    }

                    {
                        source === 'kodik' &&
                        <SearchPageResultsKodik result={result} query={query} />
                    }

                </div>
            </div>
            <Footer/>
            <MainFooter abs={result?.list?.length === 0 || result?.length === 0}/>
        </>
    );
};

export default SearchPage;