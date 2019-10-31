import React, { Component } from 'react';
import { Row, Tab, Col, Nav, Container} from 'react-bootstrap';
import Axios from 'axios';
import LeftSide from '../../Components/LeftSide/LeftSide';
class home extends Component{

  state = {
    customerDetail: {}
  }
  
  componentDidMount(){

    Axios.get("http://127.0.0.1:5000/get_customer_details/marytan")
    .then(response => {
        this.setState({customerDetail: response.data});
        console.log(response.data);
    })
    .catch(error =>{
        console.log(error.data);
    });
  }
    render(){
        return(
        <React.Fragment>
          <Container fluid>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
              <LeftSide imageLink={"https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg"}/>
              Hi! {this.state.customerDetail.gender=="Female"? "Ms.": (this.state.customerDetail.gender=="Male"?"Mr.":" ")}{this.state.customerDetail.firstName} {this.state.customerDetail.lastName}
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">

                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          </Container>
        </React.Fragment>
        );
    }
}

export default home;

