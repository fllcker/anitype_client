import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import {beUrl} from "../utils/beClient";

const AccountPage = () => {
    const nav = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['access', 'username'])

    let [verifyStatus, setVerifyStatus] = useState()
    let [codeSended, setCodeSended] = useState(false)
    let [email, setEmail] = useState('')
    let [msg, setMsg] = useState('')

    useEffect(() => {
        if (!cookies.username || !cookies.access) nav('/')
        if (verifyStatus !== undefined) return;

        axios({
            url: beUrl + 'verify/email/status',
            method: 'get',
            headers: {'Authorization': 'Bearer ' + cookies.access}
        })
            .then(r => setVerifyStatus(r.data))
            .catch(e => console.error(e))
    }, [verifyStatus, cookies.access])

    const logOut = () => {
        removeCookie('access')
        removeCookie('username')
        nav('/')
    }

    const sendCodeClick = () => {
        if (verifyStatus) return false;
        setCodeSended(true)
        axios({
            url: beUrl + 'verify/email/send',
            method: 'post',
            headers: {'Authorization': 'Bearer ' + cookies.access},
            data: {
                email: email
            }
        })
            .then(() => {
                console.log('s')
            })
            .catch(e => {
                console.error(e)
                if (e.response.data) setMsg(e.response.data.detail)
            })
    }

    return (
        <>
            <Header selected='account'/>

            <div className="page">
                <div className="page_content">
                    <h1>Информация об аккаунте</h1>

                    <p className="account_page_text">Имя пользователя: {cookies.username}</p>

                    {
                        verifyStatus === false && <>
                            <p className="account_page_text account_page_warning">У вас не подтвержден email! Ваш аккаунт подвергнут риску!</p>
                            <div className="per_email_inputs">
                                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                                {
                                    !codeSended ?
                                        <span className="span_btn" onClick={sendCodeClick}>Отправить код</span> :
                                        <span className="span_btn">{(!msg || msg === '') && 'Код отправлен'}</span>
                                }



                            </div>
                            { msg && <p className={"per_email_bot"}>{msg}</p>}
                        </>
                    }

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