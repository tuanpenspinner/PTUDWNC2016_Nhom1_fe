import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Input,
  Form,
  FormGroup,
  Col,
  Row,
  Label,
  InputGroup,
  InputGroupAddon,
  Card,
  CardBody,
  CardFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import { manageCustomersActions } from '../../../actions/employee/manageCustomers';
class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      phone: '',
      email: '',
      checkingAccountNumber: '',
    };
  }
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { name, phone, email, username, checkingAccountNumber } = this.state;
    return (
      <Row style={{ justifyContent: 'center' }}>
        <Col xs="12" xl="8">
          <Card>
            <CardBody>
              <Form>
                {/* họ và tên tài khoản */}
                <FormGroup row>
                  <Col md="4" style={{ alignSelf: 'center' }}>
                    <Label htmlFor="name">Họ và tên khách hàng</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={this.onChange}
                      placeholder="Nhập họ và tên..."
                    />
                  </Col>
                </FormGroup>
                {/*email tài khoản */}
                <FormGroup row>
                  <Col md="4" style={{ alignSelf: 'center' }}>
                    <Label htmlFor="email">Email</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                      placeholder="Nhập email..."
                    />
                  </Col>
                </FormGroup>
                {/* số điện thoại tài khoản */}
                <FormGroup row>
                  <Col md="4" style={{ alignSelf: 'center' }}>
                    <Label htmlFor="phone">Số điện thoại</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input
                      type="text"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={this.onChange}
                      placeholder="Nhập số điện thoại..."
                    />
                  </Col>
                </FormGroup>

                {/* phát sinh username */}
                <FormGroup row>
                  <Col md="4" style={{ alignSelf: 'center' }}>
                    <Label htmlFor="username">Phát sinh tên đăng nhập</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <InputGroup>
                      <Input
                        placeholder="Tên đăng nhập..."
                        value={username}
                        onChange={this.onChange}
                        readOnly
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          color="primary"
                        >
                          <i
                            className="fa fa-refresh"
                            style={{ color: 'white' }}
                          />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>
                {/* số tài khoản thanh toán */}
                <FormGroup row>
                  <Col md="4" style={{ alignSelf: 'center' }}>
                    <Label htmlFor="accountNumber">
                      Phát sinh STK thanh toán
                    </Label>
                  </Col>
                  <Col xs="12" md="8">
                    <InputGroup>
                      <Input
                        placeholder="Số tài khoản thanh toán..."
                        value={checkingAccountNumber}
                        onChange={this.onChange}
                        readOnly
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          color="primary"
                        >
                          <i
                            className="fa fa-refresh"
                            style={{ color: 'white' }}
                          />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                style={{ marginRight: '15px' }}
                type="submit"
                onClick={{}}
              >
                Tạo tài khoản
              </Button>
              <Button color="warning">Reset</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(AddCustomer);
