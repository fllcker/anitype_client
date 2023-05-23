import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import {useCookies} from "react-cookie";
import GlobalMessageReceiver from "./GlobalMessageReceiver";

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

                    {/* Заменить src на путь с сервера */}
                    <div className="header_link homeLink">
                        <img className={selected === 'home' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/888505536457367552/1109937237472313375/icons8-home-48.png'></img>
                        <Link to="/" className={selected === 'home' ? 'active' : ''}>Главная</Link>
                    </div>
                    <div className="header_link lastreleaseLink">
                        <img className={selected === 'last_releases' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/888505536457367552/1109939390693769257/icons8-collage-60.png'></img>
                        <Link to="/last" className={selected === 'last_releases' ? 'active' : ''}>Последние релизы</Link>
                    </div>
                    {/*<Link to="/random" className={selected === 'random_release' ? 'active no1000' : 'no1000'}>Случайный релиз</Link>*/}
                    <div className="header_link appLink">
                        <img className={selected === 'app' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/888505536457367552/1109932067480940544/icons8-download-48.png'></img>
                        <Link to="/app" className={selected === 'app' ? 'active no1000' : 'no1000'}>Приложение</Link>
                    </div>
                    <div className="header_link searchLink">
                        <img className={selected === 'search' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/888505536457367552/1109940133316280471/icons8-search-100.png'></img>
                        <Link to="/search" className={selected === 'search' ? 'active header_mob_search' : 'header_mob_search'}>Поиск</Link>
                    </div>
                </div>


                <div className="header_search">
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
            {/* MOBILE MENU */}
            <div class="mob_menu">
    <Link to="/" className={selected === 'home' ? 'active': ''}>
        <div>
            <img className={selected === 'home' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/888505536457367552/1109937237472313375/icons8-home-48.png' />
            <span className="caption">Главная</span>
        </div>
    </Link>
    <Link to="/last" className={selected === 'last_releases' ? 'active' : ''}>
        <div>
            <img className={selected === 'last_releases' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/888505536457367552/1109939390693769257/icons8-collage-60.png' />
            <span className="caption">Последнее</span>
        </div>
    </Link>
    <Link to="/search" className={selected === 'search' ? 'active header_mob_search' : 'header_mob_search'}>
        <div>
            <img className={selected === 'search' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/888505536457367552/1109940133316280471/icons8-search-100.png' />
            <span className="caption">Поиск</span>
        </div>
    </Link>
    {
        cookies.username ?
            <Link to="/account" className={selected === 'account' ? 'active' : ''}>
                <div>
                    <img className={selected === 'account' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/1110187278447431800/1110240825406935091/icons8-user-96.png' />
                    <span className="caption">Аккаунт</span>
                </div>
            </Link> :
            <Link to="/auth/signin" className={selected === 'auth' ? 'active' : ''}>
                <div>
                    <img className={selected === 'auth' ? 'selected_icon' : 'header_icon'} alt='icon' src='https://media.discordapp.net/attachments/1110187278447431800/1110240825406935091/icons8-user-96.png' />
                    <span className="caption">Вход</span>
                </div>
            </Link>
    }
</div>

        </>
    );
};

export default Header;
