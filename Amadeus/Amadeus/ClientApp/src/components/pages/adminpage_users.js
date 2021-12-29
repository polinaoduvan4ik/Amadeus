import React from 'react'
import Server_api from '../services/server_api';
import '../pages/adminpage_users-style.css';
import AddTrainer from './add_trainer';
import EditUser from './edit_user';

class AdminUsers extends React.Component {

    server_api = new Server_api();
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            show2: false,
            currentUserId: 0
        }
    }

    getAllUsers = () => {
        this.server_api.getAllUsers()
            .then((data) => {
                console.log()
                this.setState({
                    users: data
                })
            })
            .catch((error) => {
                console.log(`Error with fetch all usres:`, error)
            })
    }

    componentWillMount() {
        this.getAllUsers()
    }

    renderUsersList() {
        let { users,currentUserId } = this.state;

        if (users != null) {
            return (
                users.map((user, index) => {
                    return (
                        <div onClick={this._handleOnClick.bind(this,user.Id)} className={currentUserId==user.Id?('UserBlock Current'):('UserBlock')} >
                            <p>
                                {user.Name} {user.Surname}
                            </p>
                            <div>{user.LevelStatus!=null?(user.LevelStatus):("Уровень не назначен")}</div>
                        
                            <div>{user.Phone}</div>
                            <div>{user.Login}</div>


                            <div>Отмененные тренировки: {user.CanceledTraining!=null?user.CanceledTraining:0}</div>
                            <div>Завершенные тренировки: {user.AmountTraining!=null?user.AmountTraining:0}</div>
                        </div>
                    )
                })
            )
        }
        return null;
    }

    _handleOnClick = (id) =>{
        this.setState({
            currentUserId:id
        })
    }

    
    _handleOnDelete = ()=>{
        if(this.state.currentUserId!=null&&this.state.currentUserId!=0){
         this.server_api.deleteUser(this.state.currentUserId)
         .then((data)=>{
             this.getAllUsers();
         })
         .catch((error)=>{
             console.log(`Error with fetch deleteUser:`,error)
         }) 
        }
     }

    render() {
        return (
            <div className='AdminUsers_main'>
                <div>
                    <a className='Nav_link' href='/admin'>Вернуться</a>
                    <button className='AddUsers_button' onClick={() => this.setState({ show: true })}>
                        Добавить пользователя
                    </button>
                </div>
                <AddTrainer getAllUsers={this.getAllUsers} userAdd={true} onClose={() => this.setState({ show: false })} show={this.state.show} />
                <div className='Users_list'>
                    {this.renderUsersList()}
                </div>
                <div className='Users_buttons'>
                    <button className='EditUsers_button' onClick={() => this.setState({ show2: true })}>
                        Изменить данные пользователя
                    </button>
                    <EditUser getAllUsers={this.getAllUsers} currentUserId={this.state.currentUserId} onClose={() => this.setState({ show2: false })} show={this.state.show2} />

                    <button className='DeleteUsers_button' onClick={this._handleOnDelete}>
                        Удалить пользователя
                    </button>
                </div>




            </div>
        )
    }
}

export default AdminUsers;