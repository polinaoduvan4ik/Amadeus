import React from 'react'
import '../pages/trainers-style.css';
import Server_api from '../services/server_api'


class Trainers extends React.Component{

    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            trainers:[],
            trainers_inf:[]
        }
    }

    componentDidMount(){
        this.server_api.get_trainers().then((data)=>{
            this.setState({
                ...this.state,
                trainers: data
            })
            console.log(data);
        })

        this.server_api.get_trainersinf().then((data)=>{
            this.setState({
                ...this.state,
                trainers_inf: data
            })
            console.log(data);
        })
    }

    render(){
        return(
            <div className="Trainers_main">
                <div className="Trainers">
                <div className="Trainer">
                    <p className="Trainer_name">
                    {this.state.trainers.length!==0?this.state.trainers[0].Name:null} {this.state.trainers.length!==0?this.state.trainers[0].Surname:null}

                    </p>
                    <p className="Trainer_description">
                    {this.state.trainers_inf.length!==0?this.state.trainers_inf[0].TrainerDiscription:null}

                    </p>

                </div>
                <div className="Trainer">
                    <p className="Trainer_name">
                        вукпк

                    </p>
                    <p className="Trainer_description">
                        
                    </p>

                </div>

                </div>
                
            </div>
        )
    }
}

export default Trainers;