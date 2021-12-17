import React from 'react'
import '../pages/adminpage-style.css';

class Admin extends React.Component{
    render(){
        return(
            <div className="Admin_main">
                <nav className='Links'>
                <a className='Nav_link' href="/admin_trainers">Тренера</a>
                <a className='Nav_link' href="/admin_users">Пользователи</a>
                <a className='Nav_link' href="/admin_calls">Звонки</a>
                </nav>
                <div className='Trainings'>

                </div>
                



            </div>
        )
    }              
}

export default Admin;