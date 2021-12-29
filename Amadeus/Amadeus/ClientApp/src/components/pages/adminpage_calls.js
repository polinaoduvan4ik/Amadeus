import React from 'react'
import Server_api from '../services/server_api';
import '../pages/adminpage_calls-style.css';


class AdminCalls extends React.Component{

    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            calls:null,
            currentCallId:0
        }
    }

    getAllCalls(){
        this.server_api.getCalls()
        .then((data)=>{
            if(data.error){alert(data.error)}
            else{   
                this.setState({
                    calls:data
                })
            }
        })
        .catch((error)=>{
            console.log(`Error with fetch getCalls:`,error)
        })
    }

    componentWillMount(){
        this.getAllCalls()
    }

    _handleOnClick =(id)=>{
        this.setState({
            currentCallId:id
        })
    }

    _handleDeleteCall = () =>{
        this.server_api.deleteCall(this.state.currentCallId)
        .then((data)=>{
            if(data.error) alert(data.error)
            this.getAllCalls();
        })
        .catch((error)=>{
            console.log(`Error with fetch deleteCall:`,error)
        })
    }

    rnderListOfCalls(){
        let {calls,currentCallId} = this.state;
        if(calls!=null){
            return(
                calls.map((call,index)=>{
                    return(
                        <div className={currentCallId===call.Id?('CallItem Current'):('CallItem')} onClick={this._handleOnClick.bind(this,call.Id)}>
                            <div>{call.Name} {call.Surname}</div>
                            <div>{call.Phone}</div>
                        </div>
                    )
                })
            )
        }
        return null;
    }

    render(){
        return(
            <div className='AdminCalls_main'>
                <div>
                    <a className='Nav_link' href='/admin'>Вернуться</a>

                <div className='Calls_list'>
                    {this.rnderListOfCalls()}
                </div>
                </div>
                    
                <div className='Calls_buttons'>

                    <button className='DeleteCalls_button' onClick={this._handleDeleteCall}>
                            Удалить запись
                    </button>
                </div>

            </div>

        )
    }
}

export default AdminCalls;