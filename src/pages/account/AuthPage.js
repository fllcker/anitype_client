import React, {useEffect, useState} from 'react';
import Header from "../../components/main/Header";
import {useCookies} from "react-cookie";
import axios from "axios";
import {auth} from "../../utils/backendClient";
import {useNavigate} from "react-router-dom";

const AuthPage = ({defMode = 'reg'}) => {
    let [cookies, setCookie] = useCookies(['username', 'access', 'countOfPosts'])
    let nav = useNavigate();

    let [mode, setMode] = useState(defMode)
    let [err, setErr] = useState('')

    let [name, setName] = useState('')
    let [passwd, setPasswd] = useState('')
    let [passwd2, setPasswd2] = useState('')

    useEffect(() => {
        if (cookies.access && cookies.username) nav('/')
    }, [cookies.access, cookies.username])

    let next = () => {
        if (name === '' || passwd === '') return setErr('Введите данные!')
        if (mode === 'reg' && passwd !== passwd2) return setErr('Пароли не совпадают!')
        if (cookies.countOfPosts && cookies.countOfPosts > 3) return setErr('Попробуйте позже!')

        auth(name, passwd, mode === 'reg' ? 'signup' : 'login')
            .then(r => {
                let token = r?.data?.accessToken;
                setCookie('username', name, {
                    maxAge: 3600 * 24 * 31
                })
                setCookie('access', token, {
                    maxAge: 3600 * 24 * 31
                })

                //a-d
                if (cookies.countOfPosts) {
                    setCookie('countOfPosts', +cookies.countOfPosts + 1, {
                        maxAge: 60
                    })
                } else {
                    setCookie('countOfPosts', 1, {
                        maxAge: 60
                    })
                }
                nav('/account')
            })
            .catch(em => {
                //a-d
                if (cookies.countOfPosts) {
                    setCookie('countOfPosts', +cookies.countOfPosts + 1, {
                        maxAge: 60
                    })
                } else {
                    setCookie('countOfPosts', 1, {
                        maxAge: 60
                    })
                }
                
                console.log('err', em.response.data)
                let et = em.response.data.detail;

                switch (et) {
                    case 'User with this username already exists!': {
                        setErr('Имя пользователя занято!')
                        break;
                    }
                    case 'User not found!' : {
                        setErr('Пользователя с таким именем нет!')
                        break;
                    }
                    case 'Wrong data': {
                        setErr('Неверный пароль!')
                        break;
                    }
                    default: setErr(em.response.data.detail)
                }
            })
    }

    return (
        <>
            <Header selected='auth'/>

            <div className="page">
                <div className="page_content auth_page_content">
                    <div className={err === '' ? "error_block" : "error_block error_block_show"}>
                        <div className="error_block_item">
                            {err}
                        </div>
                    </div>


                    <h1 className="auth_page_title">{mode === 'log' ? 'Авторизация' : 'Регистрация'}</h1>

                    <input type="text" className="auth_page_input" placeholder="Имя пользователя" value={name} onChange={e => setName(e.target.value)}/>

                    <input type="password" className="auth_page_input" placeholder="Пароль" value={passwd} onChange={e => setPasswd(e.target.value)}/>

                    {
                        mode === 'reg' &&
                        <input type="password" className="auth_page_input auth_page_input_new" placeholder="Повторите пароль" value={passwd2} onChange={e => setPasswd2(e.target.value)}/>

                    }

                    <div className="auth_buttons">
                        <button className="auth_page_button" onClick={next}>Далее</button>
                        <button className="auth_page_button auth_page_button2" onClick={() => setMode(mode === 'log' ? 'reg' : 'log')}>{mode === 'log' ? 'Нет аккаунта?' : 'Есть аккаунт?'}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;