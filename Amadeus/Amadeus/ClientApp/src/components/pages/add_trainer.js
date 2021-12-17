import React from 'react'
import '../pages/add_trainer-style.css';
import { useState, useEffect } from 'react';

const AddTrainer = props => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [nameDirty, setNameDirty] = useState(false)    
    const [surnameDirty, setSurnameDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [loginDirty, setLoginDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false)

    const [nameError, setNameError] = useState('Поле имени не может быть пустым')
    const [surnameError, setSurnameError] = useState('Поле фамилии не может быть пустым')
    const [phoneError, setPhoneError] = useState('Поле телефона не может быть пустым')
    const [loginError, setLoginError] = useState('Поле логина не может быть пустым')
    const [passwordError, setPasswordError] = useState('Поле пароля не может быть пустым')
    const [confirmPasswordError, setConfirmPasswordError] = useState('Поле подтверждения пароля не может быть пустым')



    const [formValid, setFormValid] = useState(false)

    const AddTrainerHandler =(e)=>{
        console.log(this.state.name);
        console.log(this.state.surname);
        console.log(this.state.phone);
        console.log(this.state.login);


            this.server_api.add_trainer(this.state.name, this.state.surname, this.state.phone, this.state.login, this.state.password, this.state.confirmPassword)
            .then((data)=>{
                console.log(data);
                window.location.replace('/admin_trainers')
            })
            .catch((error)=>{
                console.log(error);
                alert(error)
            })
 
    }

    useEffect(() => {
        if(nameError || surnameError || phoneError || loginError || passwordError || confirmPasswordError){
            setFormValid(false)

        }else{
            setFormValid(true)

        }
    }, [nameError, surnameError, phoneError, loginError, passwordError, confirmPasswordError])
    
    const NameHandler = (e) =>{
        setName(e.target.value)
        const nameRegex = /^[а-яёА-ЯЁ]+$/;
        if(!nameRegex.test(String(e.target.value).toLowerCase())){
            setNameError('Некорректное имя')
        }else{
            setNameError('')
        }
    }

    const SurnameHandler = (e) =>{
        setSurname(e.target.value)
        const surnameRegex = /^[а-яёА-ЯЁ]+$/;
        if(!surnameRegex.test(String(e.target.value).toLowerCase())){
            setSurnameError('Некорректная фамилия')
        }else{
            setSurnameError('')
        }
    }

    const PhoneHandler = (e) =>{
        setPhone(e.target.value)
        const phoneRegex = /^[0-9]$/;
        if(!phoneRegex.test(Number(e.target.value)) && e.target.value.length!== 9){
            setPhoneError('Телефон должен содержать только 9 цифр')
            if(!e.target.value){
                setPhoneError('Поле телефона не может быть пустым')
            }
        }else{
            setPhoneError('')
        }
    }

    const LoginHandler = (e) =>{
        setLogin(e.target.value)
        const loginRegex = /^[a-zA-Z0-9]+$/;
        if(!loginRegex.test(String(e.target.value).toLocaleUpperCase()) && e.target.value.length>20){
            setLoginError('Логин может содержать только латиницу и цифры(не > 20 символов)')
            if(!e.target.value){
                setLoginError('Поле логина не может быть пустым')
            }
        }else{
            setLoginError('')
        }
    }

    const PasswordHandler = (e) =>{
        setPassword(e.target.value)
        const passwordRegex = /^[a-zA-Z0-9]+$/;
        if(!passwordRegex.test(Number(e.target.value)) && e.target.value.length<3 && e.target.value.length>8){
            setPasswordError('Пароль должен быть от 3 до 8 символов')
            if(!e.target.value){
                setPasswordError('Поле пароля не может быть пустым')
            }
        }else{
            setPasswordError('')
        }
    }

    const ConfirmPasswordHandler = (e) =>{
        setConfirmPassword(e.target.value)
        if(!e.target.value /* !== state.password */){
            setConfirmPasswordError('Логин может содержать только латиницу и цифры')
            if(!e.target.value){
                setConfirmPasswordError('Поле подтверждение пароля не может быть пустым')
            }
        }else{
            setConfirmPasswordError('')
        }
    }

    const blurHandler = (e) =>{
        switch(e.target.name){
            case 'name': 
                setNameDirty(true)
                break
            case 'surname': 
                setSurnameDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
            case 'login':
                setLoginDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'confirmPassword':
                setConfirmPasswordDirty(true)
                break
        }
            
    }
    
    if(!props.show){
        return null
    }

    return(

        <div className='AddTrainer_Main' onClick={props.onClose}>
            <div className='AddTrainer_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
                <div className='AddTrainer_Info'>
                Имя
                {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
                <div className="AddTrainer_Input_blok">
                    <input  className="AddTrainer_Input" name='name' onBlur={e => blurHandler(e)} value={name} onChange={e => NameHandler(e)}></input>
                </div>
                Фамилия
                {(surnameDirty && surnameError) && <div style={{color: 'red'}}>{surnameError}</div>}
                <div className="AddTrainer_Input_blok">
                    <input  className="AddTrainer_Input" name='surname' onBlur={e => blurHandler(e)} value={surname} onChange={e => SurnameHandler(e)}></input>
                </div>
                Телефон(последние 9 цифр)
                {(phoneDirty && phoneError) && <div style={{color: 'red'}}>{phoneError}</div>}
                <div className="AddTrainer_Input_blok">
                    <input  className="AddTrainer_Input" name='phone' onBlur={e => blurHandler(e)} value={phone} onChange={e => PhoneHandler(e)}></input>
                </div>
                Логин
                {(loginDirty && loginError) && <div style={{color: 'red'}}>{loginError}</div>}
                <div className="AddTrainer_Input_blok">
                    <input  className="AddTrainer_Input" name='login' onBlur={e => blurHandler(e)} value={login} onChange={e => LoginHandler(e)}></input>
                </div>
                Пароль
                {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
                <div className="AddTrainer_Input_blok">
                    <input className="AddTrainer_Input" name='password' onBlur={e => blurHandler(e)} value={password} onChange={e => PasswordHandler(e)}></input>
                </div>
                Подтверждение пароля
                {(confirmPasswordDirty && confirmPasswordError) && <div style={{color: 'red'}}>{confirmPasswordError}</div>}
                <div className="AddTrainer_Input_blok">
                    <input  className="AddTrainer_Input" name='confirmPassword' onBlur={e => blurHandler(e)} value={confirmPassword} onChange={e => ConfirmPasswordHandler(e)}></input>
                </div>
                
                </div>

                <button disabled={!formValid} onClick={e => AddTrainerHandler(e)} className="AddTrainer_Add_button" >
                        Заказать
                </button>


            </div>

        </div>
    )


}

export default AddTrainer;