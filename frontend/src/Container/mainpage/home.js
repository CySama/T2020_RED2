import React, { Component } from 'react';
import { Row, Tab, Col, Nav, Container, Card, ListGroup } from 'react-bootstrap';
import Axios from 'axios';
import LeftSide from '../../Components/LeftSide/LeftSide';
import { Chart } from "react-google-charts";
class home extends Component {

  state = {
    customerDetail: {},
    customerAccDetail: {},
    transaction: {},
    marketingmsg: [],
    personalmsg: [],
    fetched: false
  }

  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    Axios.get(`http://127.0.0.1:5000/get_customer_details/${this.props.userName}`)
      .then(response => {

        this.setState({ customerDetail: response.data });
        this.setState({ fetched: true });
        
        Axios.get(`http://127.0.0.1:5000/get_customer_deposit_account/${this.props.userName}`)
          .then(response => {
            this.setState({ customerAccDetail: response.data[0] });
            console.log(response.data[0]);
          }).catch(error => {
            console.log(error.data);
          });

          Axios.get(`http://127.0.0.1:5000/get_transaction/${this.props.userName}`)
          .then(response => {
            this.setState({ transaction: response.data });
            console.log(response.data);
          }).catch(error => {
            console.log(error.data);
          });

          Axios.get(`http://127.0.0.1:5000/get_marketing_msg`)
          .then(response => {
            this.setState({ marketingmsg: response.data });
            console.log(response.data);
          }).catch(error => {
            console.log(error.data);
          });
          Axios.get(`http://127.0.0.1:5000/get_personal_message/${this.props.userName}`)
          .then(response => {
            this.setState({ personalmsg: response.data });
            console.log(response.data);
          }).catch(error => {
            console.log(error.data);
          });


        console.log(response.data);


      })
      .catch(error => {
        console.log(error.data);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Container fluid>
          {this.state.fetched ?
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={{ span: 12 }} md={{ span: 3 }}>
                  <LeftSide imageLink={"https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg"} customerDetail={this.state.customerDetail} customerAccDetail={this.state.customerAccDetail} />
                  {/* Hi! {this.state.customerDetail.gender=="Female"? "Ms.": (this.state.customerDetail.gender=="Male"?"Mr.":" ")}{this.state.customerDetail.firstName} {this.state.customerDetail.lastName} */}
                </Col>
                <Col sm={{ span: 12 }} md={{ span: 6 }}>
                  <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Tag', 'Amount'],
                      ['Transport', 50.60],
                      ['Atm', 300],
                      ['F&B', 150.50],
                      ['Entertainment', 230.40],
                      ['Invest', 700.50],
                    ]}
                    options={{
                      title: 'Expenses',
                      // Just add this option
                      is3D: true,
                    }}
                    rootProps={{ 'data-testid': '2' }}
                  />
                  <br/>
                 <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Month', 'Amount'],
                      ['Jan', 8175000],
                      ['Feb', 3792000],
                      ['March', 2695000],
                      ['Apr', 2099000],
                    ]}
                    options={{
                      title: 'Monthly Expenses',
                      chartArea: { width: '50%' },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                  />
                </Col>
                <Col sm={{ span: 12 }} md={{ span: 3 }}>
                <Card style={{display: 'flex', flexFlow:'column'}}>
                  <ListGroup variant="flush">

                    {
                      this.state.marketingmsg.map(element => {
                      console.log(element);
                      return (
                        <ListGroup.Item style={{color:"black"}}>{element.summary}</ListGroup.Item>    
                      );
                    })}
                  </ListGroup>
                </Card>
                <Card>
                  <ListGroup variant="flush">

                    {
                      this.state.personalmsg.map(element => {
                      console.log(element);
                      return (
                        <ListGroup.Item style={{color:"black"}}>{element.body}</ListGroup.Item>    
                      );
                    })}
                  </ListGroup>
                </Card>
                </Col>
              </Row>
            </Tab.Container>
            : "Loading!!! Please Wait!!"}
        </Container>
      </React.Fragment>
    );
  }
}

export default home;

