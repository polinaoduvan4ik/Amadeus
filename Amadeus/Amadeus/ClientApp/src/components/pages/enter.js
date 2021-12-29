import React from 'react'
import '../pages/enter-style.css';

import {
    BrowserRouter as Router,
    withRouter,
    Link
} from "react-router-dom";

import Server_api from '../services/server_api';
import Cookie_manager from '../services/cookie_manager';
import Global_variables from '../services/global_variables';


class Enter extends React.Component {
    server_api = new Server_api();
    constructor(props) {
        super(props);
        this.state = {
            loginForm: {
                Login: '',
                Password: ''
            },
            registerForm: {
                Name: '',
                Surname: '',
                Phone: '',
                Login: '',
                Password: '',
                repeatPassword: ''
            },
            errors:{
                Name:'',
                Surname: '',
                Phone: '',
                Login: '',
                Password: '',
                repeatPassword: ''
            }
        }
    }

    componentWillMount() {
        if (Cookie_manager.get(Global_variables.loginCookieName) != null) {
            this.props.history.push('/')
        } else if (this.props.saveState) this.props.saveState({ isVisibleHeader: false })
    }

    _handleInputLogin = (event) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [event.target.name]: event.target.value
            }
        })
    }

    _handleInputRegister = (event) => {
        this.setState({
            registerForm: {
                ...this.state.registerForm,
                [event.target.name]: event.target.value
            }
        })
    }

    _handleOnSubmitLogin = () => {
        this.server_api.loginUser(this.state.loginForm)
            .then((data) => {
                console.log(data)
                if (data.error) alert(data.error)
                else {
                    Cookie_manager.set(Global_variables.loginCookieName, data, 30);
                    if (this.props.handleOnLogin) this.props.handleOnLogin(
                        { isVisibleHeader: true }
                    )
                    // if(this.props.getUserInfo) this.props.getUserInfo()
                    // if(this.props.saveState) this.saveState({isVisibleHeader:true})
                    this.props.history.push('/')
                }
            })
            .catch((error) => {
                console.log('error fetch with loginUser ${Error}')
            })
    }

    _handleOnSubmitRegister = () => {
        let { registerForm } = this.state;
        let form = {
            Name: registerForm.Name,
            Surname: registerForm.Surname,
            Phone: registerForm.Phone,
            Login: registerForm.Login,
            Password: registerForm.Password,
        }
        this.server_api.registerUser(form)
            .then((data) => {
                console.log(data)
                if (data.error) alert(data.error)
                else {
                    alert(data);
                }
            })
            .catch((error) => {
                console.log('error fetch with loginUser ${Error}')
            })
    }
    _handleBlur = (e)=>{
        switch (e.target.name) {
            
            case 'Name':{
                if(!this.state.registerForm.Name?.length){
                    this.setState({...this.state,errors:{...this.state.errors,Name:'Поле не может быть пустым'}})
                }
                else{
                    this.setState({...this.state,errors:{...this.state.errors,Name:''}})
                }
                
                break;
                
            }
            case 'Surname':{
                if(!this.state.registerForm.Surname?.length){
                    this.setState({...this.state,errors:{...this.state.errors,Surname:'Поле не может быть пустым'}})
                }
                else{
                    this.setState({...this.state,errors:{...this.state.errors,Surname:''}})
                }
                
                break;
                
            }
            case 'Phone':{
                if(!this.state.registerForm.Phone?.length){
                    this.setState({...this.state,errors:{...this.state.errors,Phone:'Поле не может быть пустым'}})
                }
                else{
                    this.setState({...this.state,errors:{...this.state.errors,Phone:''}})
                }
                
                break;
                
            }case 'Login':{
                if(!this.state.registerForm.Login?.length){
                    this.setState({...this.state,errors:{...this.state.errors,Login:'Поле не может быть пустым'}})
                }
                else{
                    this.setState({...this.state,errors:{...this.state.errors,Login:''}})
                }
                
                break;
                
            }case 'Password':{
                if(!this.state.registerForm.Password?.length){
                    this.setState({...this.state,errors:{...this.state.errors,Password:'Поле не может быть пустым'}})
                }
                else{
                    this.setState({...this.state,errors:{...this.state.errors,Password:''}})
                }
                
                break;
                
            }
            

        }
    }

    render() {
        let { registerForm, loginForm, repeatPassword } = this.state;
        return (
            <div className="Enter_main">
                <div className="Login_form">
                    <div className="Info">
                        Имя
                <div className="Input_blok">
                            <input name="Name" placeholder={this.state.errors.Name} value={registerForm.Name} onBlur={this._handleBlur} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        Фамилия
                <div className="Input_blok">
                            <input name="Surname" placeholder={this.state.errors.Surname} onBlur={this._handleBlur} value={registerForm.Surname} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        Телефон(последние 9 цифр)
                <div className="Input_blok">
                            <input name="Phone" placeholder={this.state.errors.Phone} onBlur={this._handleBlur} value={registerForm.Phone} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        Логин
                <div className="Input_blok">
                            <input name="Login" placeholder={this.state.errors.Login} onBlur={this._handleBlur} value={registerForm.Login} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        Пароль
                <div className="Input_blok">
                            <input name="Password" placeholder={this.state.errors.Password} onBlur={this._handleBlur} type="password" value={registerForm.Password} onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div><div className="Info">
                        Подтверждение пароля
                <div className="Input_blok">
                            <input name="repeatPassword"  value={registerForm.repeatPassword} type="password" onChange={this._handleInputRegister} className="Input"></input>
                        </div>
                    </div>



                    <button className="Button" onClick={this._handleOnSubmitRegister}>
                        Зарегистрироваться
                </button>

                </div>
                <div className="Enter_form">
                    <div className="Info">
                        Логин
                <div className="Input_blok">
                            <input name="Login" value={loginForm.Login} onChange={this._handleInputLogin} className="Input"></input>
                        </div>
                    </div>
                    <div className="Info">
                        Пароль
                <div className="Input_blok">
                            <input name="Password" value={loginForm.Password} type="password" onChange={this._handleInputLogin} className="Input"></input>                </div>
                    </div>

                    <button className="Button" onClick={this._handleOnSubmitLogin} >
                        Войти
                    </button>

                </div>

            </div>
        )
    }
}

export default withRouter(Enter);