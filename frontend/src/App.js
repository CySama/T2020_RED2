import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import MainPage from './Container/mainpage/home';
import Login from './Container/Login/Login';

class App extends Component {
  state={
    login: false,
    userName: ""

  }
  setLogin = (value,userNameValue) => {
    console.log(userNameValue);
    this.setState({login: value, userName: userNameValue});
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          {
            !this.state.login?<Login setLogin = {(value) => this.setLogin(value)}/>: 
            <MainPage userName={this.state.userName}/>
        }
          

        </header>
      </div>
    );
  }
}

export default App;
