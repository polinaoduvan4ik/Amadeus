import React from 'react'
import '../pages/call-style.css';
import { useState, useEffect } from 'react';
import Server_api from '../services/server_api';


const Modal = props => {
    const server_api = new Server_api();
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [nameError, setNameError] = useState('Поле имени не может быть пустым')
    const [phoneError, setPhoneError] = useState('Поле телефона не может быть пустым')
    const [formValid, setFormValid] = useState(false)

    const WriteInfHandler = (e) => {
        let form = {
            name:name,
            surname:123,
            phone:phone,
        }
        server_api.add_call(form)
            .then((data) => {
                console.log(data);
                window.location.replace('/')
            })
            .catch((error) => {
                console.log(error);
                alert(error)
            })

    }

    useEffect(() => {
        if (nameError || phoneError) {
            setFormValid(false)

        } else {
            setFormValid(true)

        }
    }, [nameError, phoneError])


    const NameHandler = (e) => {
        setName(e.target.value)
        const nameRegex = /^[а-яёА-ЯЁ]+$/;
        if (!nameRegex.test(String(e.target.value).toLowerCase())) {
            setNameError('Некорректное имя')
        } else {
            setNameError('')
        }
    }

    const PhoneHandler = (e) => {
        setPhone(e.target.value)
        const phoneRegex = /^[0-9]$/;
        if (!phoneRegex.test(Number(e.target.value)) && e.target.value.length !== 9) {
            setPhoneError('Телефон должен содержать только 9 цифр')
            if (!e.target.value) {
                setPhoneError('Поле телефона не может быть пустым')
            }
        } else {
            setPhoneError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
        }
    }


    if (!props.show) {
        return null
    }



    return (

        <div className='Call_Main' onClick={props.onClose}>
            <div className='Call_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
                <div className="Call_Info">
                    Имя
                    {(nameDirty && nameError) && <div style={{ color: 'red' }}>{nameError}</div>}
                    <div className="Call_Input_blok">
                        <input className="Call_Input" name='name' onBlur={e => blurHandler(e)} value={name} onChange={e => NameHandler(e)}></input>
                    </div>
                    Телефон(последние 9 цифр)
                    {(phoneDirty && phoneError) && <div style={{ color: 'red' }}>{phoneError}</div>}
                    <div className="Call_Input_blok">
                        <input className="Call_Input" name='phone' onBlur={e => blurHandler(e)} value={phone} onChange={e => PhoneHandler(e)}></input>
                    </div>
                </div>
                <div className='Call_button_add'>
                    <button disabled={!formValid} onClick={e => WriteInfHandler(e)} className="Add_button" >
                        Заказать
                    </button>
                </div>


            </div>

        </div>
    )


}

export default Modal;