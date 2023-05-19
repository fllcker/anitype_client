import React from 'react';
import {Link} from "react-router-dom";

const FourOfFour = () => {
    return (
        <>

            <div className="page">
                <div className="page_content fof_page">
                    <p className="fof_p">Страница не найдена</p>
                    <h1 className="fof_h1">404</h1>

                    <Link to="/">Вернуться на главную страницу</Link>
                </div>
            </div>
        </>
    );
};

export default FourOfFour;