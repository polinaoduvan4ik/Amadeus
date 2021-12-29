import React from 'react'
import Server_api from '../services/server_api';
import '../pages/adminpage_news-style.css';
import AddNews from './add_news';


class AdminNews extends React.Component {

    server_api = new Server_api();
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            news: null,
            currentNewsId: 0
        }
    }


    getNews =()=> {
        this.server_api.get_news({ page: 0, limit: 1000 })
            .then((data) => {
                if (data.error) { alert(data.error) }
                else {
                    this.setState({
                        news: data.news_element
                    })
                }
            })
            .catch((error) => {
                console.log(`Error with fetch get_news:`, error)
            })
    }

    componentWillMount() {
        this.getNews()
    }

    _handleOnClick = (id) => {
        this.setState({
            currentNewsId: id
        })
    }

    _handleDeleteNews = () => {
        this.server_api.deleteNews(this.state.currentNewsId)
            .then((data) => {
                if (data.error) alert(data.error)
                this.getNews();
            })
            .catch((error) => {
                console.log(`Error with fetch _handleDeleteNews:`, error)
            })
    }

    renderListOfNews() {
        let { news, currentNewsId } = this.state;
        
        if (news != null) {
            
            return (
                news.map((newsItem, index) => {
                   
                    return (
                        <div className={currentNewsId === newsItem.Id ? ('NewsItem Current') : ('NewsItem')} onClick={this._handleOnClick.bind(this, newsItem.Id)}>
                            <div>Заголовок: {newsItem.NewsHeading} </div>
                            <div>
                                 Содержание: {newsItem.NewsElement}
                            </div>
                        </div>
                    )
                })
            )
        }
        return null;
    }

    render() {
        return (
            <div className='AdminNews_main'>
                <div>
                    <a className='Nav_link' href='/admin'>Вернуться</a>
                    <button className='AddNews_button' onClick={() => this.setState({ show: true })}>
                        Добавить новость
                    </button>
                </div>
                <AddNews getNews={this.getNews} onClose={() => this.setState({ show: false })} show={this.state.show} />

                <div className='News_list'>
                    {this.renderListOfNews()}
                </div>

                <div className='News_buttons'>
                    <button className='DeleteNews_button' onClick={this._handleDeleteNews}>
                        Удалить новость
                    </button>
                </div>

            </div>


        )
    }

}

export default AdminNews;