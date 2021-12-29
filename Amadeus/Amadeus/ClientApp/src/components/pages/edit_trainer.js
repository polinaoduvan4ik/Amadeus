import React from 'react'
import '../pages/edit_trainer-style.css';
import { useState, useEffect } from 'react';
import Server_api from '../services/server_api';



const EditTrainer = props => {
    const [descr, setDescr] = useState('')
    const [descrDirty, setDescrDirty] = useState(false)
    const [descrError, setDescrError] = useState('Поле имени не может быть пустым')
    const [formValid, setFormValid] = useState(false)
    const server_api = new Server_api();

    useEffect(() => {
        if(descrError){
            setFormValid(false)

        }else{
            setFormValid(true)

        }
    }, [descrError])


    const DescrHandler = (e) =>{
        setDescr(e.target.value)
        if(e.target.value.length <10){
            setDescrError('в описании не должно быть больше 200 символов')
        }else{
            setDescrError(null)
        }
    }

    
    const blurHandler = (e) =>{
        switch(e.target.descr){
            case 'name': 
                setDescrDirty(true)
                break
            
        }
    }

    const handleSubmit = () =>{
        server_api.editTrainer({TrainerDiscription:descr,id:props.id})
        .then((data)=>{
            console.log(data);
            props.getTrainers();
            props.onClose();
        })
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
                
                <button disabled={!formValid}  className="Edit_Add_button" onClick={handleSubmit}>
                    Добавить
                </button>

            </div>

        </div>
    )

    
}

export default EditTrainer;