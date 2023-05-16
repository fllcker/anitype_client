import React, {useEffect, useState} from 'react';
import axios from "axios";
import {getSearchUrl} from "../utils/anilibria";
import AnimeLine from "../components/AnimeLine";
import Header from "../components/Header";
import {useParams} from "react-router-dom";

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
        }
    }, [params.query])

    return (
        <>
            <Header/>
            <div className="page">
                <div className="page_content">
                    <h1>Поиск</h1>
                    <input type="text" className="search_page_input" placeholder="Введите запрос" onKeyDown={handleKeyDown} onBlur={goSearch} value={query} onChange={e => setQuery(e.target.value)}/>

                    <div className="anime_list">
                        {
                            result?.list?.map(e => <AnimeLine anime_info={e} key={e.id}/>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;