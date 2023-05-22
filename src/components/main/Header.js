import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import {useCookies} from "react-cookie";
import GlobalMessageReceiver from "../other/GlobalMessageReceiver";

const Header = ({selected = ''}) => {
    let [cookies] = useCookies(['username'])

    useEffect(() => {
        if (selected === 'home') {
            document.body.classList.add('backgroundCustom')
        } else {
            document.body.classList.remove('backgroundCustom')
        }
    }, [])

    return (
        <>
            <GlobalMessageReceiver/>

            {/*<span className="warnmessage">Внимание! Сейчас обновляется сервер,*/}
            {/*        <br/>*/}
            {/*        некоторые функции недоступны</span>*/}

            <div className="header">
                <div className="header_left">
                    <Link to="/" className={selected === 'home' ? 'active' : ''}>Главная</Link>
                    <Link to="/last" className={selected === 'last_releases' ? 'active' : ''}>Последние релизы</Link>
                    {/*<Link to="/random" className={selected === 'random_release' ? 'active no1000' : 'no1000'}>Случайный релиз</Link>*/}
                    <Link to="/app" className={selected === 'app' ? 'active no1000' : 'no1000'}>Приложение</Link>

                    <Link to="/search" className={selected === 'search' ? 'active header_mob_search' : 'header_mob_search'}>Поиск</Link>

                    <HeaderSearch/>


                </div>
                <div className="header_right">
                    { cookies.username &&
                            <Link to="/favourite" className={selected === 'fav' ? 'active' : ''}>Избранное</Link> }

                    {
                        cookies.username ?
                            <Link to="/account" className={selected === 'account' ? 'active' : ''}>Аккаунт ({cookies.username})</Link> :
                            <Link to="/auth/signin" className={selected === 'auth' ? 'active' : ''}>Авторизация</Link>
                    }
                </div>
            </div>
        </>
    );
};

export default Header;