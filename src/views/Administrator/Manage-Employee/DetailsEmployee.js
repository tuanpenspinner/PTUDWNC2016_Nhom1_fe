import React, { Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  Input,
  Form,
  FormGroup,
  Col,
  Row,
  Collapse,
  Label,
  CardFooter,
} from 'reactstrap';

import { adminListEmployeeActions } from '../../../actions/admin/listEmployee.action';
import { connect } from 'react-redux';
import axios from 'axios';

class RowEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      username: '',
    };
  }
  UNSAFE_componentWillMount() {
    const { item } = this.props;
    this.setState({
      username: item.username,
      name: item.name,
      phone: item.phone,
      email: item.email,
    });
  }

  saveEmployee = async () => {
    const { name, phone, email, username } = this.state;
    const result = await axios.post(
      'http://localhost:3001/administrator/update-employee',
      { name, phone, email, username }
    );
    alert(result.data.message);
  };
  changeInfoEmployee = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { index, item } = this.props;
    return (
      <Collapse
        isOpen={this.props.details.includes(index)}
        style={{ backgroundColor: '#e4e5e6' }}
      >
        <Row
          style={{
            justifyContent: 'center',
            backgroundColor: '#e4e5e6',
            paddingTop: '25px',
          }}
        >
          <Col xl="5">
            <Card>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="name">Họ và tên</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        index={index}
                        defaultValue={item.name}
                        placeholder="Nhập tên nhân viên..."
                        onChange={this.changeInfoEmployee}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="email">Email</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={item.email}
                        placeholder="Nhập email nhân viên..."
                        onChange={this.changeInfoEmployee}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="phone">Số điện thoại</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="phone"
                        name="phone"
                        defaultValue={item.phone}
                        placeholder="Nhập số điện thoại nhân viên..."
                        onChange={this.changeInfoEmployee}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.saveEmployee}>
                  Lưu
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Collapse>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listEmployee: state.employeeManage.listEmployee,
    details: state.employeeManage.details,
  };
};

const actionCreators = {
  toggleDetails: adminListEmployeeActions.toggleDetails,
  loadListEmployee: adminListEmployeeActions.loadListEmployee,
};

export default connect(mapStateToProps, actionCreators)(RowEmployee);
