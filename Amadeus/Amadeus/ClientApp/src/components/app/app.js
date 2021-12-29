import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    withRouter,
    Route,
    Link
} from "react-router-dom";
import Home from '../pages/homepage';
import Header from '../header/header';
import Trainers from '../pages/trainers';
import Photos from '../pages/photos';
import Prices from '../pages/prices';
import Enter from '../pages/enter';
import Admin from '../pages/adminpage'
import AdminTrainers from '../pages/adminpage_trainers'
import AdminUsers from '../pages/adminpage_users'
import AdminCalls from '../pages/adminpage_calls'
import TrainerPage from '../pages/trainerpage';
import AddSchedule from '../pages/add_schedule';
import AdminNews from '../pages/adminpage_news';
import AddTrainingPage from '../pages/add_training_page';


import Server_api from '../services/server_api';
import Global_variables from '../services/global_variables';
import Cookie_manager from '../services/cookie_manager';






class App extends React.Component {
    server_api = new Server_api();
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            // userInfo: {
            //     role:3
            // },
            isVisibleHeader: true,
        }
    }

    componentWillMount() {
        if (Cookie_manager.get(Global_variables.loginCookieName) != null) {
            this.getUserInfo();
            this.setState({ isVisibleHeader: true })
        } else if (document.location.pathname !== '/enter'&&document.location.pathname !== '/trainers'
        &&document.location.pathname !== '/photos'&&document.location.pathname !== '/prices') {
            this.props.history.push('/enter')
        }
    }


    componentWillUpdate() {
        if (Cookie_manager.get(Global_variables.loginCookieName) != null) {
        } else if (document.location.pathname !== '/enter'&&document.location.pathname !== '/trainers'
        &&document.location.pathname !== '/photos'&&document.location.pathname !== '/prices') {
            this.props.history.push('/enter')
        }
    }

    componentWillUnmount() {

    }

    getUserInfo = () => {
        this.server_api.getUserInfo()
            .then((data) => {
                if (data.StatusCode === 400) {
                    Cookie_manager.clearAll();
                    this.props.history.push('/enter')
                } else {
                    this.setState({ userInfo: data })
                }
            })
            .catch((error) => {
                console.log(`error with fetch userInfo:`, error)
            })
    }

    insertRoutes() {
        let { userInfo } = this.state;
        if (userInfo != null) {
            switch (userInfo.role) {
                case 1: {
                    return (
                        <>
                            <Route path='/trainings'>
                                <AddTrainingPage  userInfo={userInfo}/>
                            </Route>
                            
                        </>
                    )
                    break;
                }

                case 2: {
                    return (
                        <>
                           <Route path='/trainings'>
                                <AddTrainingPage  userInfo={userInfo}/>
                            </Route>
                        </>
                    )
                    break;
                }

                case 3: {
                    return (
                        <>
                            <Route path='/admin'>
                                <Admin />
                            </Route>

                            <Route path='/admin_trainers'>
                                <AdminTrainers />
                            </Route>

                            <Route path='/admin_users'>
                                <AdminUsers />
                            </Route>

                            <Route path='/admin_calls'>
                                <AdminCalls />
                            </Route>

                            <Route path='/admin_schedule'>
                                <AddSchedule />
                            </Route>

                            <Route path='/admin_news'>
                                <AdminNews />
                            </Route>
                        </>
                    )
                    break;
                }
                default: { return null; }
            }
        }
        return null;
    }

    saveState = (obj) => {
        this.setState({ obj })
    }

    handleOnLogin = (data) => {
        this.getUserInfo();
        this.setState(data)
    }


    handleOnLogOut = (data) => {
        this.getUserInfo();
        this.setState(data)
    }

    render() {
        let { userInfo, isVisibleHeader } = this.state;
        return (
            <div className="Main">
                {isVisibleHeader &&
                    <Header
                        userInfo={userInfo}
                        saveState={this.saveState}
                        handleOnLogOut={this.handleOnLogOut}
                    />}
                <React.StrictMode>

                    <Switch>

                        <Route exact path='/'>
                            <Home userInfo={userInfo}/>
                        </Route>


                        <Route path='/trainers'>
                            <Trainers />
                        </Route>

                        <Route path='/photos'>
                            <Photos />
                        </Route>

                        <Route path='/prices'>
                            <Prices />
                        </Route>


                        {this.insertRoutes()}
                        <Route path='/enter'>
                            <Enter
                                getUserInfo={this.getUserInfo}
                                saveState={this.saveState}
                                handleOnLogin={this.handleOnLogin}
                            />
                        </Route>


                    </Switch>
                </React.StrictMode>
            </div>
        );
    }
}

export default withRouter(App);

