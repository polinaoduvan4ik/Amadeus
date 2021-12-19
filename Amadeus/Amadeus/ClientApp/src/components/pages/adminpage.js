import React from 'react'
import '../pages/adminpage-style.css';
import Server_api from '../services/server_api';
import AddSchedule from './add_schedule';

class Admin extends React.Component{
    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            show: false
        }
    }

    render(){
        return(
            <div className="Admin_main">
                <nav className='Links'>
                <a className='Nav_link' href="/admin_trainers">Тренера</a>
                <a className='Nav_link' href="/admin_users">Пользователи</a>
                <a className='Nav_link' href="/admin_calls">Звонки</a>
                <button className='EditUsers_button' onClick={() => this.setState({show: true})}>
                            Добавить расписание
                    </button>
                    <AddSchedule onClose={() => this.setState({show: false})} show={this.state.show}/>
                </nav>
                <div className='Trainings'>

                </div>
                



            </div>
        )
    }              
}

export default Admin;