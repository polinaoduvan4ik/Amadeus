import React from 'react'
import '../pages/trainerpage-style.css';
import Server_api from '../services/server_api';
import AddTraining from './add_training';




class TrainerPage extends React.Component{

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
            <div className='Trainer_main'>
                 <div>
                    <button className='AddTraining_button' onClick={() => this.setState({show: true})}>
                        Добавить тренировку
                    </button>
                    <AddTraining onClose={() => this.setState({show: false})} show={this.state.show}/>
                </div>
                <div className='Training_list'>
                    
                </div>
                <div className='Training_buttons'>
                    <button className='EditTraining_button' onClick={() => this.setState({show2: true})}>
                            Изменить запись 
                    </button>

                    <button className='DeleteTraining_button'>
                            Удалить запись
                    </button>
                </div>

            </div>
        )
    }
}

export default TrainerPage;