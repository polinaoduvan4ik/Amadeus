import React from 'react';
import { Link } from 'react-router-dom';
import '../header/header-style.css'


class Header extends React.Component{
render () {
    const logo = require('../images/logo.png');

return (
        <div className="Up_string">
            <div className="Logo">
                <img className="Logo_img"  src={logo} alt={"logo"}/>
                <p className="Logo_text">КСК"АМАДЕУС ФАВОРИТ"</p>
            </div>
            <nav className="Nav">
                        <Link className="Nav_link" to="/">Главная</Link>
                        <a className="Nav_link" href="/trainers">Тренера</a>
                        <a className="Nav_link" href="/photos">Фотоальбом</a>
                        <a className="Nav_link" href="/prices">Цены</a>
            </nav>
            <div className="Enter">
                 <a className="Enter_text" href="/enter" >Вход/Регистрация</a>
                    
             </div>

    
        </div>
        
)
}
}

export default Header