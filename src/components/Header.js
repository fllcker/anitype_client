import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import HeaderSearch from "./HeaderSearch";

const Header = ({selected = ''}) => {

    return (
        <>
            <div className="header">
                <div className="header_left">
                    <Link to="/" className={selected === 'home' && 'active'}>Главная</Link>
                    <Link to="/last" className={selected === 'last_releases' && 'active'}>Последние релизы</Link>
                    <Link to="/random" className={selected === 'random_release' && 'active'}>Случайный релиз</Link>

                    <HeaderSearch/>
                </div>
                <div className="header_right">
                    <Link to="/" className={selected === 'fav' && 'active'}>Избранное</Link>
                    <Link to="/" className={selected === 'fav' && 'active'}>Аккаунт</Link>
                </div>
            </div>
        </>
    );
};

export default Header;