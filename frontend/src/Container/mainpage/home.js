import React, { Component } from 'react';
import { Row, Tab, Col, Nav, Container} from 'react-bootstrap';
class home extends Component{

    render(){
        return(
        <React.Fragment>
          <Container fluid>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
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

