import React from 'react'
import '../pages/homepage-style.css';
import Server_api from '../services/server_api';
import Modal from '../pages/call';


class Home extends React.Component {


    server_api = new Server_api();
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            currentPage: 0,
            currentNumberOnPage: 1,

        }
    }

    getNews = () => {
        this.server_api.get_news({ page: this.state.currentPage, limit: this.state.currentNumberOnPage })
            .then((data) => {
                this.setState({
                    data: data
                })
                console.log(data);
            })
            .catch((error) => {
                console.log(`Error fetch with getNews`, error)
            })
    }

    componentDidMount() {
        this.getNews();
    }

    renderNews() {
        let { data } = this.state;

        if (data != null && data.news_element != null && Array.isArray(data.news_element)) {
            return (
                data.news_element.map((item, index) => {
                    return (
                        <p key={index + item.Id} className="Home_head">
                            {item.NewsHeading}
                            <div>
                                {item.NewsElement}
                            </div>

                        </p>
                    )
                })
            )
        }
        return null;
    }




    _handleOnPageClick = (action) => {
        let { data, currentNumberOnPage } = this.state;
        let maxPage = 0, minPage = 0;
        maxPage = Math.trunc(data.news_count / currentNumberOnPage) - 1;


        switch (action) {
            case 'next': {
                if (this.state.currentPage < maxPage) {
                    this.setState({
                        currentPage: this.state.currentPage + 1
                    }, () => {
                        this.getNews();
                    })
                }

                break;
            }

            case 'prev': {
                if (this.state.currentPage > minPage) {
                    this.setState({
                        currentPage: this.state.currentPage - 1
                    }, () => {
                        this.getNews();
                    })
                }

                break;
            }
        }


    }

    _handleOnZakaz = () => {
        let { userInfo } = this.props;
        if (userInfo != null) {
            let form = {
                name: userInfo.name,
                surname: userInfo.surname,
                phone: userInfo.phone
            }
            this.server_api.addCall(form)
                .then((data) => {

                    alert(data);
                })
                .catch((error) => {
                    console.log(`Error fetch with _handleOnZakaz`, error)
                })
        }
    }




    render() {
        let {userInfo} = this.props;
        const arrow = require('../images/right-arrow.png');
        return (
            <div className="MainNews">
                {/* <p className="Home_head">
                    {this.state.data!=null?this.state.data[0].NewsHeading:null}
                
                </p>
                <p className="Home_text">
                    {this.state.data!=null?this.state.data[0].NewsElement:null}
    
                </p> */}
                {this.renderNews()}

                <div className="Buttons">
                    <div className="ButtonPagin">
                        <img src={arrow} onClick={this._handleOnPageClick.bind(this, 'prev')} className={'Rotate'} alt={''} />
                    </div>

                    <div className="ButtonPagin">
                        <img src={arrow} onClick={this._handleOnPageClick.bind(this, 'next')} alt={''} />
                    </div>
                </div>

                {userInfo!=null&&userInfo.role==1?(
                    <div className="Call_button" onClick={() => this._handleOnZakaz()}  >
                    <a className="Call_text">Заказать звонок</a>
                </div>
                ):(null)}
                {/* <Modal onClose={() => this.setState({ show: false })} show={this.state.show} /> */}
            </div>
        )

    }

}

export default Home;