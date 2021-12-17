import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
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

    





class App extends React.Component {


  render () {
    return (
      <div className="Main">
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path='/'>
                            <Home/>
                        </Route>
                        <Route exact path='/trainers'>
                            <Trainers/>
                        </Route>
                        <Route exact path='/photos'>
                            <Photos/>
                        </Route>
                        <Route exact path='/prices'>
                            <Prices/>
                        </Route>
                        <Route exact path='/enter'>
                            <Enter/>
                        </Route>
                        <Route exact path='/admin'>
                            <Admin/>
                        </Route>
                        <Route exact path='/admin_trainers'>
                            <AdminTrainers/>
                        </Route>
                        <Route exact path='/admin_users'>
                            <AdminUsers/>
                        </Route>
                        <Route exact path='/admin_calls'>
                            <AdminCalls/>
                        </Route>
                    </Switch>
                </Router>
            </div>
    );
  }
}

export default App;

