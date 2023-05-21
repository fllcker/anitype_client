import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {beUrl} from "../utils/beClient";
import {useCookies} from "react-cookie";

const VerificationPage = () => {
    let [result, setResult] = useState('')
    let [status, setStatus] = useState('')
    let params = useParams()
    let [cookies] = useCookies(['access'])

    let sended = useRef(false)
    useEffect(() => {
        if (sended.current) return;
        sended.current = true;
        if (!params.code) setStatus('err')
        if (status !== '') return;
        axios({
            url: beUrl + 'verify/email/accept/' + params.code,
            method: 'get',
            headers: {'Authorization': 'Bearer ' + cookies.access}
        })
            .then(r => {
                setStatus('successful')
                setResult('Успех!')
            })
            .catch(e => {
                console.error(e)
                if (e.response.data) {
                    setStatus('err')
                    setResult(e.response.data.detail)
                }
            })
    }, [params.code])

    return (
        <>
            <Header/>

            <div className="page">
                <div className="page_content">
                    <h1>Подтверждение электронной почты</h1>


                    <p className={status === 'err' ? "verification_result verification_error" : "verification_result verification_succ"}>{
                        status === 'successful' ? 'Успех!' : result
                    }</p>


                    <Link to="/">На главную</Link>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default VerificationPage;