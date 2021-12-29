import React from 'react'
import '../pages/add_schedule-style.css';
import { useState, useEffect } from 'react';
import Server_api from '../services/server_api';

const server_api = new Server_api();

const AddSchedule = props => {

    const [trainers, setTrainers] = useState(null);
    const [disable, setDisable] = useState(false);
    const [trainerId, setTrainerId] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(false);
    const [startTime, setStartTime] = useState("08:00:00");
    const [endTime, setEndTime] = useState("09:00:00");



    useEffect(() => {
        server_api.getTrainers()
            .then((data) => {
                setTrainers(data);
                setTrainerId(data[0].Id)
            })
            .catch((error) => {

            })
    }, [])


    const _handleTimeChange = (event) =>{
        let date = new Date();
        let currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        let date1= new Date(event.target.value);
        let date2= new Date(currentDate);
        if(date2>date1){
            alert("Нельзя выбрать прошлую дату")
            setDisable(false)
            setScheduleDate(currentDate)
        }else{
            setDisable(true)
            setScheduleDate(event.target.value)
        }
    }

    const _handleOnSubmit = (e) =>{
        let form = {
            IdTrainer:trainerId,
            Data:scheduleDate.replace(new RegExp('-', 'g'), '.'),
            HoursStart:startTime,
            HoursEnd:endTime
        }
        server_api.addSchedule(form)
        .then((data)=>{
            console.log(data)
            if(data.error) alert(data.error)
            else props.onClose()
        })
        .catch((error)=>{
            console.log(`Error with fetch addSchedule:`,error)
        })
    }

    if (!props.show) {
        return null
    }

    return (

        <div className='AddSchedule_Main' onClick={props.onClose}>
            <div className='AddSchedule_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
                <div className="AddSchedule_Info">
                    Тренер
                <div>
                        <select value={trainerId} name="trainer" id="trainer" onChange={(e)=>{setTrainerId(e.target.value)}}>
                            {/*                         надо сделать список тренеров тут(имя фамилия) */}

                            {
                                trainers!=null?(
                                    trainers.map((trainer,index)=>{
                                        return (
                                            <option value={trainer.Id}>
                                            {trainer.Name} {trainer.Surname}
                                        </option>)
                                    })
                                ):(null)
                            }
                        </select>
                    </div>
                Дата
                <div className='Date'>
                        <input value={scheduleDate} type="date" name="Calendar" onChange={_handleTimeChange}></input>
                    </div>
                Время начала работы
                <div className='BeginWork'>
                        <select name="from" id="from" value={startTime} onChange={(e)=>{setStartTime(e.target.value)}}>
                            <option value="08:00:00">8:00</option>
                            <option value="09:00:00">9:00</option>
                            <option value="10:00:00">10:00</option>
                            <option value="11:00:00">11:00</option>
                            <option value="12:00:00">12:00</option>
                            <option value="13:00:00">13:00</option>
                            <option value="14:00:00">14:00</option>
                            <option value="15:00:00">15:00</option>
                            <option value="16:00:00">16:00</option>
                            <option value="17:00:00">17:00</option>
                        </select>
                    </div>
                Время конца работы
                <div>
                        <select value={endTime} onChange={(e)=>{setEndTime(e.target.value)}} name="to" id="to">
                            <option value="09:00:00">9:00</option>
                            <option value="10:00:00">10:00</option>
                            <option value="11:00:00">11:00</option>
                            <option value="12:00:00">12:00</option>
                            <option value="13:00:00">13:00</option>
                            <option value="14:00:00">14:00</option>
                            <option value="15:00:00">15:00</option>
                            <option value="16:00:00">16:00</option>
                            <option value="17:00:00">17:00</option>
                            <option value="18:00:00">18:00</option>
                        </select>
                    </div>

                </div>

                <button onClick={_handleOnSubmit} disabled={!disable} /*disabled={!formValid}  onClick={e => WriteInfHandler(e)} */ className="AddSchedule_Add_button" >
                    Добавить
                </button>

            </div>

        </div>
    )


}

export default AddSchedule;