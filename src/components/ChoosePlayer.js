import React from 'react';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const ChoosePlayer = ({display = false, setDisplay}) => {
    let nav = useNavigate()
    let [cookies, setCookie] = useCookies(['player'])

    return (
        <>
            {
                display &&
                <div className="choose_player_block">
                    <div className="choose_player">
                        <p className="choose_player_title">Выберите плеер</p>

                        <div className="choose_player_list">
                            <div className="choose_player_list_el" onClick={() => {
                                setCookie('player', 1, {
                                    maxAge: 123123123
                                })
                                setDisplay(false)
                            }}>Стандартный</div>
                            <div className="choose_player_list_el" onClick={() => {
                                setCookie('player', 3, {
                                    maxAge: 123123123
                                })
                                setDisplay(false)
                            }}>Дополнительный</div>
                            <div className="choose_player_list_el" onClick={() => {
                                setCookie('player', 2, {
                                    maxAge: 123123123
                                })
                                setDisplay(false)
                            }}>Kodik (все озвучки)</div>
                            <p className="choose_player_close" onClick={() => setDisplay(false)}>Закрыть</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ChoosePlayer;