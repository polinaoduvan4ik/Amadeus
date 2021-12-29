import React from 'react'
import '../pages/edit_training-style.css';
import { useState} from 'react';


const EditTraining = props => {   

    if(!props.show){
        return null
    }

    return(
        
        <div className='EditTraining_Main' onClick={props.onClose}>
            <div className='EditTraining_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
            <div className="EditTraining_info">
                <input type="radio" id="NeedEq"
                name="NeedEq" value="true">
                </input>
                <label for="NeedEq">Требуется предоставление снаряжения</label>
                <input type="radio" id="NoNeedEq"
                name="NoNeedEq" value="false">
                </input>
                <label for="NoNeedEq">НЕ требуется предоставление снаряжения</label>
                
             </div>             
                
                <button className="EditTraining_button" >
                    Изменить
                </button>

            </div>

        </div>
    )

    
}

export default EditTraining;