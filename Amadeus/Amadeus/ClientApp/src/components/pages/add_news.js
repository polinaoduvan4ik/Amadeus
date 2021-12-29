import React from 'react'
import '../pages/add_news-style.css';
import { useState, useEffect } from 'react';
import Server_api from '../services/server_api';

const AddNews = props => {
    const server_api = new Server_api();

    const [heading, setHeading] = useState('')
    const [text, setText] = useState('')
    const [headingDirty, setHeadingDirty] = useState(false)
    const [textDirty, setTextDirty] = useState(false)
    const [headingError, setHeadingError] = useState('Поле заголовка не может быть пустым')
    const [textError, setTextError] = useState('Поле текста не может быть пустым')
    const [formValid, setFormValid] = useState(false)

    const WriteInfHandler = (e) => {

        /*  this.server_api.add_call(this.state.name, this.state.phone)
         .then((data)=>{
             console.log(data);
             window.location.replace('/')
         })
         .catch((error)=>{
             console.log(error);
             alert(error)
         }) */

        let form = {
            newsHeading: heading,
            newsElement: text
        }
        server_api.addNews(form)
            .then((data) => {
                if (data.error) alert(data.error)
                if (props.onClose) props.onClose();
                if (props.getNews) props.getNews();
            })
            .catch((error) => {
                console.log(`Error with fetch addNews:`, error)
            })

    }

    useEffect(() => {
        if (headingError || textError) {
            setFormValid(false)

        } else {
            setFormValid(true)

        }
    }, [headingError, textError])


    const HeadingHandler = (e) => {
        setHeading(e.target.value)

        if (!e.target.value) {
            setHeadingError('Поле заголовка не может быть пустым')
        }
        else {
            setHeadingError('')
        }
    }
    const TextHandler = (e) => {
        setText(e.target.value)

        if (!e.target.value) {
            setTextError('Поле текста не может быть пустым')
        }
        else {
            setTextError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'heading':
                setHeadingDirty(true)
                break
            case 'text':
                setTextDirty(true)
                break
        }
    }


    if (!props.show) {
        return null
    }



    return (

        <div className='News_Main' onClick={props.onClose}>
            <div className='News_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
                <div className="News_Info">
                    Заголовок
                    {(headingDirty && headingError) && <div style={{ color: 'red' }}>{headingError}</div>}
                    <div className="News_Input_blok">
                        <input className="News_Input" name='heading' onBlur={e => blurHandler(e)} value={heading} onChange={e => HeadingHandler(e)}></input>
                    </div>
                    Текст новости
                    {(textDirty && textError) && <div style={{ color: 'red' }}>{textError}</div>}
                    <div className="News_Input_blok">
                        <input className="News_Input" name='text' onBlur={e => blurHandler(e)} value={text} onChange={e => TextHandler(e)}></input>
                    </div>
                </div>

                <button disabled={!formValid} onClick={e => WriteInfHandler(e)} className="News_Add_button" >
                    Добавить
                </button>

            </div>

        </div>
    )


}

export default AddNews;