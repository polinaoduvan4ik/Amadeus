import React from 'react'
import '../pages/edit_trainer-style.css';
import { useState, useEffect } from 'react';


const EditTrainer = props => {
    const [descr, setDescr] = useState('')
    const [descrDirty, setDescrDirty] = useState(false)
    const [descrError, setDescrError] = useState('Поле имени не может быть пустым')
    const [formValid, setFormValid] = useState(false)


    useEffect(() => {
        if( descrError){
            setFormValid(false)

        }else{
            setFormValid(true)

        }
    }, [descrError])


    const DescrHandler = (e) =>{
        setDescr(e.target.value)
        if(!e.target.value.length < 200){
            setDescrError('в описании не должно быть больше 200 символов')
        }else{
            setDescrError('')
        }
    }

    
    const blurHandler = (e) =>{
        switch(e.target.descr){
            case 'name': 
                setDescrDirty(true)
                break
            
        }
    }


    if(!props.show){
        return null
    }



    return(
        
        <div className='Descr_Main' onClick={props.onClose}>
            <div className='Descr_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
            <div className="Edit_info">
                Описание
                {(descrDirty && descrError) && <div style={{color: 'red'}}>{descrError}</div>}
                <div className="Edit_input_blok">
                    <input  className="Edit_input" name='descr' onBlur={e => blurHandler(e)} value={descr} onChange={e => DescrHandler(e)}></input>
                </div>
                
             </div>             
                
                <button disabled={!formValid}  className="Edit_Add_button" >
                    Добавить
                </button>

            </div>

        </div>
    )

    
}

export default EditTrainer;