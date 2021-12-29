import React from 'react'
import '../pages/adminpage-style.css';
import Server_api from '../services/server_api';
import AddSchedule from '../pages/add_schedule';

class Admin extends React.Component{

    server_api = new Server_api();
    constructor(props) {
        super(props);
        this.state={
            show:false,
            schedule: null,
            currentScheduleItemId:0
        }
    }

    getAllSchedule(){
        this.server_api.getSchedule()
        .then((data)=>{
            if(data.error){alert(data.error)}
            else{   
                this.setState({
                    schedule:data
                })
            }
        })
        .catch((error)=>{
            console.log(`Error with fetch getSchedule:`,error)
        })
    }

    componentWillMount(){
        this.getAllSchedule()
    }

    _handleOnClick =(id)=>{
        this.setState({
            currentScheduleItemId:id
        })
    }

    _handleDeleteScheduleItem = () =>{
        this.server_api.deleteScheduleItem(this.state.currentScheduleItemId)
        .then((data)=>{
            if(data.error) alert(data.error)
            this.getAllSchedule();
        })
        .catch((error)=>{
            console.log(`Error with fetch deleteScheduleItem:`,error)
        })
    }

    rnderListOfSchedule(){
        let {schedule,currentScheduleItemId} = this.state;
        console.log(schedule);

        if(schedule!=null){
            return(
                schedule.map((scheduleItem,index)=>{
                    return(
                        <div className={currentScheduleItemId===scheduleItem.Id?('ScheduleItemItem Current'):('ScheduleItem')} onClick={this._handleOnClick.bind(this,scheduleItem.Id)}>
                            <div>{scheduleItem.Name} {scheduleItem.Surname}</div>
                            <div>{scheduleItem.Data}</div>
                            <div>{scheduleItem.HoursStart}</div>
                            <div>{scheduleItem.HoursEnd}</div>

                        </div>
                    )
                })
            )
        }
        return null;
    }


    

    render(){
        return(
            <div className="Admin_main">
                <nav className='Links'>
                <a className='Nav_link' href="/admin_trainers">Тренера</a>
                <a className='Nav_link' href="/admin_users">Пользователи</a>
                <a className='Nav_link' href="/admin_calls">Звонки</a>
                <a className='Nav_link' href="/admin_news">Новости</a>
                <button className='EditUsers_button' onClick={() => this.setState({show: true})}>
                            Добавить расписание
                </button>
                </nav>
               
                <AddSchedule onClose={() => this.setState({show: false})} show={this.state.show}/>

                <div className='Schedule_list'>
                    {this.rnderListOfSchedule()}
                </div>

                <div className='Schedule_buttons'>

                    <button className='DeleteScheduleItem_button' onClick={this._handleDeleteScheduleItem}>
                            Удалить запись расписания
                    </button>
                </div>
                



            </div>
        )
    }              
}

export default Admin;