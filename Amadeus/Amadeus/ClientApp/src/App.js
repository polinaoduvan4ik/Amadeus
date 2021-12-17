import React, { Component } from 'react';
import AppClass from './components/app/app';




import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <AppClass/>
    );
  }
}
