import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const HeaderSearch = () => {
    const nav = useNavigate()

    const [input, setInput] = useState('')

    const next = () => {
        if (input === '') return;

        nav('/search/' + input)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') next()
    }

    return (
        <>
            <img alt='search' className='searchIcon' src='https://bit.ly/43E8Tnl'></img>
            <input 
                type="text" 
                placeholder="Поиск" 
                className="search_input header_search_mobile_no_display" 
                onKeyDown={handleKeyDown} 
                onBlur={next} 
                value={input} 
                onChange={e => setInput(e.target.value)}
            >
            </input>
        </>
    );
};

export default HeaderSearch;