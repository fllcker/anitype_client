import React from 'react';
import {Link} from "react-router-dom";

const MainFooter = ({abs = false}) => {
    return (
        <div className={abs ? "main_footer main_footer_abs" : 'main_footer'}>
            <Link to="/pravo">Правообладателям</Link>
            <Link to="/about">О нас</Link>
        </div>
    );
};

export default MainFooter;