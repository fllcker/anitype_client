import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import {useCookies} from "react-cookie";

const Header = ({selected = ''}) => {
    let [cookies] = useCookies(['username'])

    return (
        <>
            <div className="header">
                <div className="header_left">
                    <Link to="/" className={selected === 'home' ? 'active' : ''}>Главная</Link>
                    <Link to="/last" className={selected === 'last_releases' ? 'active' : ''}>Последние релизы</Link>
                    <Link to="/random" className={selected === 'random_release' ? 'active no1000' : 'no1000'}>Случайный релиз</Link>
                    <Link to="/app" className={selected === 'app' ? 'active no1000' : 'no1000'}>Приложение</Link>

                    <Link to="/search" className={selected === 'search' ? 'active header_mob_search' : 'header_mob_search'}>Поиск</Link>

                    <HeaderSearch/>
                </div>
                <div className="header_right">
                    <Link to="/favourite" className={selected === 'fav' ? 'active' : ''}>Избранное</Link>

                    {
                        cookies.username ?
                            <Link to="/account" className={selected === 'account' ? 'active' : ''}>Аккаунт ({cookies.username})</Link> :
                            <Link to="/auth" className={selected === 'auth' ? 'active' : ''}>Авторизация</Link>
                    }
                </div>
            </div>
        </>
    );
};

export default Header;