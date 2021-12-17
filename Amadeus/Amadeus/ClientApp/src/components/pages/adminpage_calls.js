import React from 'react'
import Server_api from '../services/server_api';
import '../pages/adminpage_calls-style.css';


class AdminCalls extends React.Component{

    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            idCalls: 0
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
            <div className='AdminCalls_main'>
                <div>
                    <a className='Nav_link' href='/admin'>Вернуться</a>

                <div className='Calls_list'>

                </div>
                </div>
                    
                <div className='Calls_buttons'>

                    <button className='DeleteCalls_button'>
                            Удалить запись
                    </button>
                </div>

            </div>

        )
    }
}

export default AdminCalls;