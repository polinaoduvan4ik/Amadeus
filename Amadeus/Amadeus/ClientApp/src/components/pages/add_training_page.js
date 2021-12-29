import React from 'react'
import '../pages/add_training_page-style.css';
import Server_api from '../services/server_api';
import AddTraining from './add_training';
import EditTraining from './edit_training';




class AddTrainingPage extends React.Component {

    server_api = new Server_api();
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            trainings: null
        }
    }


    getTrainings = () => {
        this.server_api.getTraining()
            .then((data) => {
                if (data.error) { alert(data.error) }
                else {
                    this.setState({
                        trainings: data
                    })
                }
            })
            .catch((error) => {
                console.log(`Error with fetch getTrainings:`, error)
            })
    }

    componentWillMount() {
        this.getTrainings()
    }
    
    _updateStatus =(e,user,scheduleId)=>{
        let form ={
            scheduleId:scheduleId,
            userId:user.UserId,
            newStatus:e.target.value,
        }
        this.server_api.сhangeStatus(form)
        .then((data)=>{
            if (data.error) { alert(data.error) }
            else {
                alert(data);
                this.getTrainings()
            }
        })
        .catch((error)=>{

        })
    }

    _updateEqupment = (e,user,scheduleId)=>{
        let form ={
            scheduleId:scheduleId,
            userId:user.UserId,
            newNeedEquipment:e.target.checked
        }
        this.server_api.changeEquipmentNecessity(form)
        .then((data)=>{
            if (data.error) { alert(data.error) }
            else {
                alert(data);
                this.getTrainings()
            }
        })
        .catch((error)=>{
            
        })
    }

    _delete = (user,scheduleId)=>{
        console.log(user,scheduleId)
        let form ={
            scheduleId:scheduleId,
            userId:user.UserId,
        }
        this.server_api.deleteTrainingParticipant(form)
        .then((data)=>{
            if (data.error) { alert(data.error) }
            else {
                alert(data);
                this.getTrainings()
            }
        })
        .catch((error)=>{
            
        })
    }

    renderListOTrainings() {
        let { trainings } = this.state;
        let { userInfo } = this.props;

        if (trainings != null) {

            return (
                trainings.map((training, index) => {
                    let status ='';
                    for(let i = 0;i<training.Participants.length;i++){
                        if(training.Participants[i].UserId===userInfo.id){
                            status = training.Participants[i].Status;
                        }
                    }
                    if (userInfo.role===1) {
                        return (
                            <div className={'TrainingItem'}>
                                <div>
                                    Дата: {training.Data} <br />
                                Начало: {training.HoursStart}<br />
                                Конец: {training.HoursEnd}<br />
                                </div>
                                <div>
                                    Тренер: {training.TrainerFullName}<br />
                                    Номер тренера: {training.TrainerPhone}<br />
                                    Статус: {status}
                                </div>
                            </div>
                        )
                    }else{
                        return (
                            <div  className={'TrainingItemAdmin'}>

                                <div className="TopLine">
                                    <div>
                                        {training.ScheduleId}
                                    </div>
                                    <div>
                                        {training.Data}
                                        <br/>
                                        {training.HoursStart} - {training.HoursEnd}
                                    </div>
                                </div>

                                <div className="MidleLine">
                                    <div className="UsersList">
                                        {training.Participants!=null?(
                                            training.Participants.map((user,id)=>{
                                                var status = JSON.parse(JSON.stringify(user.Status));
                                                var eq = JSON.parse(JSON.stringify(user.NeedEquipment));
                                                return(
                                                    <div className="User">
                                                        {user.FullName} <br/>
                                                        Снаряжение
                                                        <input onChange={e=>{this._updateEqupment(e,user,training.ScheduleId)}} type='checkbox' checked={eq}/><br/>
                                                        Статус: 
                                                        <select value = {status} onChange={(e)=>{
                                                            this._updateStatus(e,user,training.ScheduleId)
                                                            }}>
                                                            <option value="Завершен">Завершен</option>
                                                            <option value="Отменен">Отменен</option>
                                                        </select>
                                                        <button onClick={()=>{this._delete(user,training.ScheduleId)}}>Удалить</button>
                                                    </div>
                                                )
                                            })
                                        ):(null)}
                                    </div>
                                </div>

                                <div className="BottomLine">
                                    <button> Обновить</button>
                                </div>
                            </div>
                        )
                    }

                })
            )
        }
        return null;
    }

    render() {
        let { userInfo } = this.props;
        return (
            <div className='Trainer_main'>
                <div>
                    <button className='AddTraining_button' onClick={() => this.setState({ show: true })}>
                        Добавить тренировку
                    </button>
                    <AddTraining userInfo={userInfo} onClose={() => this.setState({ show: false })} show={this.state.show} />
                </div>
                <div className='Training_list'>
                    {this.renderListOTrainings()}
                </div>


            </div>
        )
    }
}

export default AddTrainingPage;