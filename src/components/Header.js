import React from 'react';
import {Link} from "react-router-dom";

const Header = ({selected = 'home'}) => {
    return (
        <div className="header">
            <div className="header_left">
                <Link to="/" className={selected === 'home' && 'active'}>Главная</Link>
                <Link to="/" className={selected === 'last_releases' && 'active'}>Последние релизы</Link>
                <Link to="/" className={selected === 'random_release' && 'active'}>Случайный релиз</Link>

                <input type="text" placeholder="Поиск" className="search_input"/>
            </div>
            <div className="header_right">
                <Link to="/" className={selected === 'fav' && 'active'}>Избранное</Link>
                <Link to="/" className={selected === 'fav' && 'active'}>Аккаунт</Link>
            </div>
        </div>
    );
};

export default Header;