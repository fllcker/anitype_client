import React from 'react';

const Footer = () => {


    return (
        <footer class="footer">

            <ul class="social-icon">
                <li class="social-icon__item"><a class="social-icon__link" href="https://www.tiktok.com/@skyfllcker">
                    <p>TikTok</p>
                </a></li>
                <li class="social-icon__item"><a class="social-icon__link" href="https://t.me/anitypenews">
                <p>Telegram</p>
                </a></li>
                <li class="social-icon__item_last"><a class="social-icon__link" href="https://discord.gg/RJqPpnQ3pT">
                <p>Discord</p>
                </a></li>
            </ul>
            <p class="site__title">AniType</p>
            <ul class="menu">
                <li class="menu__item"><a class="menu__link" href="/pravo">Правообладателям</a></li>
                <li class="menu__item"><a class="menu__link" href="/about">О нас</a></li>

            </ul>
        </footer>
    );
};

export default Footer;