import React from 'react'
import '../pages/add_schedule-style.css';
import { useState, useEffect } from 'react';


const AddSchedule = props => {


    if(!props.show){
        return null
    }



    return(
        
        <div className='AddSchedule_Main' onClick={props.onClose}>
            <div className='AddSchedule_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
            <div className="AddSchedule_Info">
                Тренер
                <div>
                    <select name="trainer" id="trainer">
{/*                         надо сделать список тренеров тут(имя фамилия) */}
                    </select>
                </div>
                Дата
                <div className='Date'>
                    <input type="date" name="Calendar"></input>
                </div>
                Время начала работы
                <div className='BeginWork'>
                    <select name="from" id="from">
                        <option value="1">8:00</option>
                        <option value="2">9:00</option>
                        <option value="3">10:00</option>
                        <option value="4">11:00</option>
                        <option value="5">12:00</option>
                        <option value="6">13:00</option>
                        <option value="7">14:00</option>
                        <option value="8">15:00</option>
                        <option value="9">16:00</option>
                        <option value="10">17:00</option>
                    </select>
                </div>
                Время конца работы
                <div>
                    <select name="to" id="to">
                        <option value="1">9:00</option>
                        <option value="2">10:00</option>
                        <option value="3">11:00</option>
                        <option value="4">12:00</option>
                        <option value="5">13:00</option>
                        <option value="6">14:00</option>
                        <option value="7">15:00</option>
                        <option value="8">16:00</option>
                        <option value="9">17:00</option>
                        <option value="10">18:00</option>
                    </select>
                </div>
     
            </div>             
                
                <button /*disabled={!formValid}  onClick={e => WriteInfHandler(e)} */ className="AddSchedule_Add_button" >
                    Добавить
                </button>

            </div>

        </div>
    )

    
}

export default AddSchedule;