import React, { Component } from 'react';
import { Container, Card, Button, Col, Form, Row, InputGroup, Image} from 'react-bootstrap';
import classes from './Login.module.css'
import { FaUserAlt, FaLock } from 'react-icons/fa';
import Background from '../../assets/images/background.jpg';

var sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: "url(" + { Background } + ")"
  };

class Login extends Component{
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
                                    <Form.Control type="text" placeholder="Username" className={classes.Input}/>
                                </InputGroup>
                            </Row>
                            <Row className={classes.Row}> 
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <span className={classes.Icon}>
                                            <FaLock />
                                        </span>
                                    </InputGroup.Prepend>
                                    <Form.Control type="password" placeholder="Password" className={classes.Input}/>
                                </InputGroup>
                            </Row>
                            </Form>
                        <Button variant="primary">Login</Button>
                    </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}

export default Login;
