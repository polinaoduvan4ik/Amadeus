import React from 'react'
import '../pages/enter-style.css';


class Enter extends React.Component{
    render(){
        return(
            <div className="Enter_main">
                <div className="Login_form">
                <div className="Info">
                Имя
                <div className="Input_blok">
                    <input  className="Input"></input>
                </div>
            </div>
            <div className="Info">
                Фамилия
                <div className="Input_blok">
                    <input  className="Input"></input>
                </div>
             </div>
            <div className="Info">
                Телефон(последние 9 цифр)
                <div className="Input_blok">
                    <input  className="Input"></input>
                </div>
             </div>
             <div className="Info">
                Логин
                <div className="Input_blok">
                    <input  className="Input"></input>
                </div>
             </div>
             <div className="Info">
                Пароль
                <div className="Input_blok">
                    <input  className="Input"></input>
                </div>
             </div><div className="Info">
                Подтверждение пароля
                <div className="Input_blok">
                    <input  className="Input"></input>
                </div>
             </div>

             
                
                <button className="Button" >
                    Зарегистрироваться
                </button>

                </div>
                <div className="Enter_form">
                <div className="Info">
                Логин
                <div className="Input_blok">
                    <input  className="Input"></input>
                </div>
            </div>
            <div className="Info">
                Пароль
                <div className="Input_blok">
                    <input  className="Input"></input>
                </div>
             </div>             
                
                <button className="Button" >
                    Войти
                </button>

                </div>

            </div>
        )
    }
}

export default Enter;