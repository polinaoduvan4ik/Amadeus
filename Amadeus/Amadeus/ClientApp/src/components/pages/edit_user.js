import React from 'react'
import '../pages/edit_user-style.css';
import { useState, useEffect } from 'react';


const EditUser = props => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [nameDirty, setNameDirty] = useState(false)    
    const [surnameDirty, setSurnameDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)

    const [nameError, setNameError] = useState('Поле имени не может быть пустым')
    const [surnameError, setSurnameError] = useState('Поле фамилии не может быть пустым')
    const [phoneError, setPhoneError] = useState('Поле телефона не может быть пустым')


    const [formValid, setFormValid] = useState(false)

    const EditUserHandler =(e)=>{
        console.log(this.state.name);
        console.log(this.state.surname);
        console.log(this.state.phone);


            this.server_api.edit_user(this.state.name, this.state.surname, this.state.phone)
            .then((data)=>{
                console.log(data);
                window.location.replace('/admin_users')
            })
            .catch((error)=>{
                console.log(error);
                alert(error)
            })
 
    }

    useEffect(() => {
        if(nameError || surnameError || phoneError){
            setFormValid(false)

        }else{
            setFormValid(true)

        }
    }, [nameError, surnameError, phoneError])
    
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
        }
            
    }
    
    if(!props.show){
        return null
    }

    return(

        <div className='EditUser_Main' onClick={props.onClose}>
            <div className='EditUser_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
                <div className='Info'>
                Имя
                {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
                <div className="EditUser_Input_blok">
                    <input  className="Input" name='name' onBlur={e => blurHandler(e)} value={name} onChange={e => NameHandler(e)}></input>
                </div>
                Фамилия
                {(surnameDirty && surnameError) && <div style={{color: 'red'}}>{surnameError}</div>}
                <div className="EditUser_Input_blok">
                    <input  className="EditUser_Input" name='surname' onBlur={e => blurHandler(e)} value={surname} onChange={e => SurnameHandler(e)}></input>
                </div>
                Телефон(последние 9 цифр)
                {(phoneDirty && phoneError) && <div style={{color: 'red'}}>{phoneError}</div>}
                <div className="EditUser_Input_blok">
                    <input  className="EditUser_Input" name='phone' onBlur={e => blurHandler(e)} value={phone} onChange={e => PhoneHandler(e)}></input>
                </div>
                
                
                </div>

                <button disabled={!formValid} onClick={e => EditUserHandler(e)} className="EditUser_Add_button" >
                        Изменить
                </button>


            </div>

        </div>
    )


}

export default EditUser;