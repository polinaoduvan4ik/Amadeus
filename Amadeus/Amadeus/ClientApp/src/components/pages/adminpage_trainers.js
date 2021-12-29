import React from 'react'
import { Link } from 'react-router-dom'
import Server_api from '../services/server_api';
import '../pages/adminpage_trainers-style.css';
import AddTrainer from '../pages/add_trainer'
import EditTrainer from './edit_trainer';

class AdminTrainers extends React.Component {

    server_api = new Server_api();
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            show2: false,
            currentTrainer: 0,
            idTrainer: 0
        }
    }

    getTrainers = () =>{
        this.server_api.getTrainers()
        .then((data) => {
            console.log(data);
            this.setState({
                trainers: data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.getTrainers();
    }

    _handleOnClick = (id) => {
        this.setState({
            currentTrainer: id
        })
    }

    _handleOnDelete = ()=>{
       if(this.state.currentTrainer!=null&&this.state.currentTrainer!=0){
        this.server_api.deleteUser(this.state.currentTrainer)
        .then((data)=>{
            if (data.error) alert(data.error)
               
            this.getTrainers();
        })
        .catch((error)=>{
            console.log(`Error with fetch deleteUser:`,error)
        }) 
       }
    }

    renderList() {
        let { trainers, currentTrainer } = this.state;
        if (trainers != null) {
            return (
                trainers.map((item, index) => {
                    return (
                        <div key={item.Id + item.Name} onClick={() => { this._handleOnClick(item.Id) }} className={currentTrainer===item.Id ? ('CurrentTrainer TrainerBlockItem') : 'TrainerBlockItem'}>
                            <span>
                                {item.Name} {item.Surname}
                            </span>
                            <span>
                                {item.TrainerDiscription}
                            </span>
                            <span>
                                {item.Phone}
                            </span>
                        </div>
                    )
                })
            )
        }
        return null;
    }

    render() {
        return (
            <div className='AdminTrainers_main'>
                <div>
                    <Link className='Nav_link' to='/admin'>Вернуться</Link>
                    <button className='AddTrainer_button' onClick={() => this.setState({ show: true })}>
                        Добавить тренера
                    </button>
                </div>
                <AddTrainer
                    onClose={() => this.setState({ show: false })}
                     show={this.state.show} 
                     getTrainers={this.getTrainers}
                     />
                <div className='Trainers_list'>
                    {this.renderList()}
                </div>
                <div className='Trainer_buttons'>
                    <button className='EditTrainer_button' onClick={() => this.setState({ show2: true })}>
                        Изменить описание тренера
                    </button>
                    <EditTrainer
                     onClose={() => this.setState({ show2: false })}
                      show={this.state.show2}
                      id={this.state.currentTrainer}
                      getTrainers={this.getTrainers} />

                    <button className='DeleteTrainer_button' onClick={this._handleOnDelete}>
                        Удалить тренера
                    </button>
                </div>




            </div>

        )
    }
}

export default AdminTrainers;