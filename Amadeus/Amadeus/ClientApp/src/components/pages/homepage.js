import React from 'react'
import '../pages/homepage-style.css';
import Server_api from '../services/server_api';
import Modal from '../pages/call';


class Home extends React.Component{


    server_api = new Server_api();
    constructor(props){
        super(props)
        this.state={
            show: false
        }
    }

    componentDidMount(){
        this.server_api.get_news().then((data)=>{
            this.setState({
                data: data
            })
            console.log(data);
        })
    }

    



    render(){

        return(
            <div className="MainNews">
                <p className="Home_head">
                    {this.state.data!=null?this.state.data[0].NewsHeading:null}
                
                </p>
                <p className="Home_text">
                    {this.state.data!=null?this.state.data[0].NewsElement:null}
    
                </p>
                <div className="Call_button" onClick={() => this.setState({show: true})}  >
                        <a className="Call_text">Заказать звонок</a>
                </div>
                 <Modal onClose={() => this.setState({show: false})} show={this.state.show}/>
                </div>
        )

    }
    
}

export default Home;