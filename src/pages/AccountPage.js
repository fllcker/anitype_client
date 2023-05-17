import React, {useEffect} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const AccountPage = () => {
    const nav = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['access', 'username'])

    useEffect(() => {
        if (!cookies.username || !cookies.access) nav('/')
    })

    const logOut = () => {
        removeCookie('access')
        removeCookie('username')
        nav('/')
    }

    return (
        <>
            <Header selected='account'/>

            <div className="page">
                <div className="page_content">
                    <h1>Информация об аккаунте</h1>

                    <p className="account_page_text">Имя пользователя: {cookies.username}</p>
                    <p className="account_page_text">Здесь будет дополнительная информация</p>

                    <div className="account_page_text">
                        <button onClick={logOut}>Выйти из аккаунта</button>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default AccountPage;