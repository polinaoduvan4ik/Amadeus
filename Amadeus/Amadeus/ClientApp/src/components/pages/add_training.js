import React from 'react'
import '../pages/add_training-style.css';
import { useState, useEffect } from 'react';
import Server_api from '../services/server_api';


const AddTraining = props => {
    const server_api = new Server_api();
    const [disable, setDisable] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(false);
    const [startTime, setStartTime] = useState(false);
    const [endTime, setEndTime] = useState(false);
    const [trainers, setTrainers] = useState(null);
    const [trainer, setTrainer] = useState(null);
    const [equpment, setEqupment] = useState(false);
    const [users,setUsers] = useState(null);
    const [currentUser,setCurrentUser] = useState(0);
    const [list, setList] = useState(null);

    const [currentScheduleId,setCurrentScheduleId]  = useState(0);

    const getAllUsers = () => {
        server_api.getAllUsers()
            .then((data) => {
                setUsers(data);
                setCurrentUser(data[0].Id)
            })
            .catch((error) => {
                console.log(`Error with fetch getAllTrainers`, error)
            })
    }

    const getAllTrainers = () => {
        server_api.getTrainers()
            .then((data) => {
                setTrainers(data);
                setTrainer(data[0].Id)
            })
            .catch((error) => {
                console.log(`Error with fetch getAllTrainers`, error)
            })
    }

    useEffect(() => {
       
        getAllTrainers();
        if(props.userInfo.role===2){
            setTrainer(props.userInfo.id)
            getAllUsers();
        }
    }, [])

    if (!props.show) {
        return null
    }



    const _handleTimeChange = (event) => {
        let date = new Date();
        let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let date1 = new Date(event.target.value);
        let date2 = new Date(currentDate);
        if (date2 > date1) {
            alert("Нельзя выбрать прошлую дату")
            setDisable(false)
            setScheduleDate(currentDate)
        } else {
            setDisable(true)
            setScheduleDate(event.target.value)
        }
    }

    const renderSelect = () => {
        if (props.userInfo != null && props.userInfo.role == 2) {
            return (
                <select name="select" size={3}> {/* Здесь нужны список пользователей */}
                    {users!=null?(
                        users.map((user,index)=>{
                            return(
                                <option value={user.Id}>{user.Name} {user.Surname}</option>
                            )
                        })
                    ):(null)}
                </select>
            )
        } else return null;
    }

    const _handleOnSearch = () => {
        if(scheduleDate!=null){
            let form = null;

            if(props.userInfo.role===1){
                form = {
                    data: scheduleDate.replace(new RegExp('-', 'g'), '.'),
                    trainerId: trainer,
                    searcherId: props.userInfo.id
                };
            }else{
                form = {
                    data: scheduleDate.replace(new RegExp('-', 'g'), '.'),
                    trainerId: props.userInfo.id,
                    searcherId: currentUser
                };
            }
    
    
            server_api.searchTrainings(form)
                .then((data) => {
                    if (data.error) alert(data.error)
                    else setList(data);
    
    
                   })
                .catch((error) => {
                    console.log(`Error with fetch getAllTrainers`, error)
                })
        }
        
    }

    const  _handleAdd = () =>{
        let form =null;

        if(props.userInfo.role===1){
            form = {
                scheduleId: currentScheduleId,
                userId: props.userInfo.id,
                needEquipment:equpment
            };
        }else{
            form = {
                scheduleId: currentScheduleId,
                userId: currentUser,
                needEquipment:equpment
            };
        }
        server_api.addTrainingParticipant(form)
            .then((data) => {
                if (data.error) alert(data.error)
                else {
                    alert(data);
                    _handleOnSearch();
                }
                
            })
            .catch((error) => {
                console.log(`Error with fetch getAllTrainers`, error)
            })
        
    }

    const renderList = () => {
        console.log(list)
        if (list != null&&list!==undefined) {
            return (
                list.map((item, index) => {
                    return (
                        <div className={currentScheduleId===item.ScheduleId?('ScheduleItem Current'):('ScheduleItem')} onClick={()=>{setCurrentScheduleId(item.ScheduleId)}}>
                            <div>
                                Начало: {item.HoursStart} - Конец: {item.HoursEnd}
                                <div>Имя: {item.TrainerFullName} Номер: {item.TrainerPhone}</div>
                            </div>
                        </div>
                    )
                })
            )
        } return null;
    }

    const renderTrainerList = () =>{
        if(props.userInfo.role===1){
            return(
                <select name="trainer" id="trainer" value={trainer} onChange={(e) => { setTrainer(e.target.value) }}>
                    {/*                         надо сделать список тренеров тут(имя фамилия) */}
                    {trainers != null ? (
                        trainers.map((trainer, index) => {
                            return (
                                <option value={trainer.Id}>{trainer.Surname}</option>
                            )
                        })
                    ) : (null)}
                </select>
            )
        }else return null;
    }
    return (

        <div className='AddTraining_main' onClick={props.onClose}>
            <div className='AddTraining_content' onClick={e => e.stopPropagation()}>
                <p className='Close_button' onClick={props.onClose}>Закрыть</p>
                {renderSelect()}
                <div className='Date'>
                    <input value={scheduleDate} type="date" name="Calendar" onChange={_handleTimeChange}></input>
                </div>
                {renderTrainerList()}
                <button className='TrainingSearch' onClick={_handleOnSearch}>
                    Поиск
                </button>
                Нужно ли снаряжение: 
                <input type='checkbox' value={equpment} onChange={(e)=>{setEqupment(e.target.checked)}}></input>
                <div className='TrainingList'>
                    {renderList()}
                </div>
                <button className='AddTraining' onClick={_handleAdd}>
                    Добавить
                </button>



            </div>

        </div>
    )


}

export default AddTraining;