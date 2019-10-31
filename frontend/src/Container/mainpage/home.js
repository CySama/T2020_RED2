import React, { Component } from 'react';
import { Row, Tab, Col, Nav, Container } from 'react-bootstrap';
import Axios from 'axios';
import LeftSide from '../../Components/LeftSide/LeftSide';
import { Chart } from "react-google-charts";
class home extends Component {

  state = {
    customerDetail: {},
    customerAccDetail: {},
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
                <Col sm={{ span: 12 }} md={{ span: 9 }}>
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
                  <br/>
                  <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Histogram"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Quarks', 'Leptons', 'Gauge Bosons', 'Scalar Bosons'],
                      [2 / 3, -1, 0, 0],
                      [2 / 3, -1, 0, null],
                      [2 / 3, -1, 0, null],
                      [-1 / 3, 0, 1, null],
                      [-1 / 3, 0, -1, null],
                      [-1 / 3, 0, null, null],
                      [-1 / 3, 0, null, null],
                    ]}
                    options={{
                      title: 'Monthly expenses',
                      legend: { position: 'top', maxLines: 2 },
                      colors: ['#5C3292', '#1A8763', '#871B47', '#999999'],
                      interpolateNulls: false,
                    }}
                    rootProps={{ 'data-testid': '5' }}
                  />
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

