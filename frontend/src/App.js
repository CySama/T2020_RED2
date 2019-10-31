import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Button >Button</Button>
        </header>
      </div>
    );
  }
}

export default App;
