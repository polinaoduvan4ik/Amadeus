import React from 'react'
import Server_api from '../services/server_api';
import '../pages/adminpage_users-style.css';
import AddTrainer from './add_trainer';
import EditUser from './edit_user';

class AdminUsers extends React.Component{

    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            show: false,
            show2: false
        }
    }

    render(){
        return(
            <div className='AdminUsers_main'>
                <div>
                    <a className='Nav_link' href='/admin'>Вернуться</a>
                    <button className='AddUsers_button' onClick={() => this.setState({show: true})}>
                        Добавить пользователя
                    </button>
                </div>
                <AddTrainer onClose={() => this.setState({show: false})} show={this.state.show}/>
                <div className='Users_list'>
                    
                </div>
                <div className='Users_buttons'>
                    <button className='EditUsers_button' onClick={() => this.setState({show2: true})}>
                            Изменить данные пользователя
                    </button>
                    <EditUser onClose={() => this.setState({show2: false})} show={this.state.show2}/>

                    <button className='DeleteUsers_button'>
                            Удалить пользователя
                    </button>
                </div>
                
                
                

            </div>
        )
    }
}

export default AdminUsers;