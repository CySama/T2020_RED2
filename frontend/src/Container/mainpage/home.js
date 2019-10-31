import React, { Component } from 'react';
import { Row, Tab, Col, Nav, Container } from 'react-bootstrap';
import Axios from 'axios';
import LeftSide from '../../Components/LeftSide/LeftSide';
import { Chart } from "react-google-charts";
class home extends Component {

  state = {
    customerDetail: {},
    fetched: false
  }

  componentDidMount() {

    Axios.get("http://127.0.0.1:5000/get_customer_details/marytan")
    .then(response => {
        this.setState({customerDetail: response.data});
        this.setState({fetched: true});
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.data);
      });
  }
    render(){
        return(
        <React.Fragment>
          <Container fluid>
            {this.state.fetched?
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
              <LeftSide imageLink={"https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg"} customerDetail={this.state.customerDetail}/>
              {/* Hi! {this.state.customerDetail.gender=="Female"? "Ms.": (this.state.customerDetail.gender=="Male"?"Mr.":" ")}{this.state.customerDetail.firstName} {this.state.customerDetail.lastName} */}
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">View Transaction</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Expenditure</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Balance</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Chart
                      width={'500px'}
                      height={'300px'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={[
                        ['Task', 'Hours per Day'],
                        ['Work', 11],
                        ['Eat', 2],
                        ['Commute', 2],
                        ['Watch TV', 2],
                        ['Sleep', 7],
                      ]}
                      options={{
                        title: 'Expenses',
                        // Just add this option
                        is3D: true,
                      }}
                      rootProps={{ 'data-testid': '2' }}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">

                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          :null}
          </Container>
        </React.Fragment>
        );
    }
}

export default home;

