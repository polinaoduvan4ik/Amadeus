import React from 'react'
import Server_api from '../services/server_api';
import '../pages/adminpage_trainers-style.css';
import AddTrainer from '../pages/add_trainer'
import EditTrainer from './edit_trainer';

class AdminTrainers extends React.Component{

    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            show: false,
            show2: false,
            idTrainer: 0
        }
    }

   /*  componentDidMount() {
        this.server.get_trainers()
        .then((data) => {
            console.log(data);
            this.setState({
                trainers: data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    } */

    render(){
        return(
            <div className='AdminTrainers_main'>
                <div>
                    <a className='Nav_link' href='/admin'>Вернуться</a>
                    <button className='AddTrainer_button' onClick={() => this.setState({show: true})}>
                        Добавить тренера
                    </button>
                </div>
                <AddTrainer onClose={() => this.setState({show: false})} show={this.state.show}/>
                <div className='Trainers_list'>
                    
                </div>
                <div className='Trainer_buttons'>
                    <button className='EditTrainer_button' onClick={() => this.setState({show2: true})}>
                            Изменить описание тренера
                    </button>
                    <EditTrainer onClose={() => this.setState({show2: false})} show={this.state.show2}/>

                    <button className='DeleteTrainer_button'>
                            Удалить тренера
                    </button>
                </div>
                
                
                

            </div>

        )
    }
}

export default AdminTrainers;