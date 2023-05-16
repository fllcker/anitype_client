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
        <input type="text" placeholder="Поиск" className="search_input" onKeyDown={handleKeyDown} onBlur={next} value={input} onChange={e => setInput(e.target.value)}/>
    );
};

export default HeaderSearch;