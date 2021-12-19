import React from 'react'
import '../pages/add_training-style.css';
import { useState, useEffect } from 'react';


const AddTraining = props => {
 

    
    if(!props.show){
        return null
    }

    return(

        <div className='AddTraining_main' onClick={props.onClose}>
            <div className='AddTraining_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
                <select name="select"> 
                    <option value="value1">Значение 1</option>
                    <option value="value2" selected>Значение 2</option>
                    <option value="value3">Значение 3</option>
                </select>


            </div>

        </div>
    )


}

export default AddTraining;