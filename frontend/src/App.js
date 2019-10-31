import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import Login from './Container/Login/Login';

class App extends Component {
  state={
    login: false

  }
  setLogin = value => {
    this.setState({login: value});
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Login setLogin = {(value) => this.setLogin(value)}/>

        </header>
      </div>
    );
  }
}

export default App;
