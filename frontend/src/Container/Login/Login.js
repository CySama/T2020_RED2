import React, { Component } from 'react';
import { Container, Card, Button, Col, Form, Row, InputGroup, Image} from 'react-bootstrap';
import classes from './Login.module.css'
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Background from '../../assets/images/background.jpg';
import Axios from 'axios';

var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + { Background } + ")"
  };



class Login extends Component{
    state= {
        "user":{
            "name": "",
            "password": ""
        }
    }
    changePassword = event => {
        console.log(event.target.value);
        let temp = this.state.user;
        temp.password = event.target.value;
        this.setState(temp);
    }
    changeUserName = event => {
        console.log(event.target.value);
        let temp = this.state.user;
        temp.name = event.target.value;
        this.setState(temp);
    }

    login = event => {
        Axios.post("http://127.0.0.1:5000/login", this.state.user)
        .then(response => {
            if(response.data!=="invalid inputs"){
                console.log(response.data);
                this.props.setLogin(true, response.data);
            }
            else{
                alert("Invalid Credentials!!");
            }
            
        })
        .catch(error =>{
            console.log(error.data);
        });
    }

    render(){
        return(
            <Container fluid >
                <Image src="./assets/images/background.jpg" fluid className={classes.Background}/>
                <Col md={{offset: 9, span:3}} sm={{span: 12}}>
                    <Card>
                    <Card.Img variant="top" src="./assets/images/logo.png" className={classes.Logo}/>
                    <Card.Body>
                        {/* <Card.Title>Card Title</Card.Title> */}
                        <Form>
                            <Row className={classes.Row}> 
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <span className={classes.Icon}>
                                            <FaUserAlt />
                                        </span>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" placeholder="Username" className={classes.Input} value={this.state.user.name} onChange={(event) => this.changeUserName(event)}/>
                                </InputGroup>
                            </Row>
                            <Row className={classes.Row}> 
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <span className={classes.Icon}>
                                            <FaLock />
                                        </span>
                                    </InputGroup.Prepend>
                                    <Form.Control type="password" placeholder="Password" className={classes.Input} value={this.state.user.password} onChange={(event) => this.changePassword(event)}/>
                                </InputGroup>
                            </Row>
                            </Form>
                        <Button variant="primary" onClick={(event)=>this.login(event)}>Login</Button>
                    </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}

export default Login;
