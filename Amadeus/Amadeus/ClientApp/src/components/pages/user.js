
import React, { useEffect, useState } from 'react';
import Server_api from '../../components/services/server_api'

function User(props) {
    const server_api = new Server_api();
    const [status,setStatus] = useState(0);
    const [eq,setEq] = useState(0);

    useEffect(()=>{
        if(props.user){
            setStatus(props.user.Status)
            setEq(props.user.NeedEquipment)
        }
    },[])

    const _updateStatus = (e, user, scheduleId) => {
        let form = {
            scheduleId: scheduleId,
            userId: user.UserId,
            newStatus: e.target.value,
        }
        server_api.сhangeStatus(form)
            .then((data) => {
                if (data.error) { alert(data.error) }
                else {
                    alert(data);
                }
            })
            .catch((error) => {

            })
    }

    const _updateEqupment = (e, user, scheduleId) => {
        let form = {
            scheduleId: scheduleId,
            userId: user.UserId,
            newNeedEquipment: e.target.checked
        }
        server_api.changeEquipmentNecessity(form)
            .then((data) => {
                if (data.error) { alert(data.error) }
                else {
                    alert(data);
                }
            })
            .catch((error) => {

            })
    }

    const _delete = (user, scheduleId) => {
        console.log(user, scheduleId)
        let form = {
            scheduleId: scheduleId,
            userId: user.UserId,
        }
        server_api.deleteTrainingParticipant(form)
            .then((data) => {
                if (data.error) { alert(data.error) }
                else {
                    alert(data);
                }
            })
            .catch((error) => {

            })
        
    }
    return (
        <div className="User">
            {props.user.FullName} <br />
                                                    Снаряжение
            <input onChange={e => { _updateEqupment(e, props.user, props.training.ScheduleId) }} type='checkbox' value={eq} /><br />
                                                    Статус:
            <select value={status} onChange={(e) => {
                _updateStatus(e, props.user, props.training.ScheduleId)
            }}>
                <option value="Завершен">Завершен</option>
                <option value="Отменен">Отменен</option>
            </select>
            <button onClick={() => { _delete(props.user, props.training.ScheduleId) }}>Удалить</button>
        </div>
    )
}
export default User