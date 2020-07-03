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
} from 'reactstrap';
import { adminListEmployeeActions } from '../../../actions/admin/listEmployee.action';
import { connect } from 'react-redux';
class FormAddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      phone: '',
      email: '',
      password: '123456',
    };
  }
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  createEmployee = () => {
    const { name, phone, email, username, password } = this.state;
    const newEmployee = {
      name,
      phone,
      email,
      username,
      password,
    };
    if (name === '' || phone === '' || email === '' || username === '')
      alert('Không được bỏ trống thông tin');
    else {
      axios
        .post(
          'http://localhost:3001/administrator/register-employee',
          newEmployee
        )
        .then((data) => {
          this.setState({
            name: '',
            phone: '',
            email: '',
            username: '',
          });
          const { loadListEmployee } = this.props;
         alert(`Thêm tài khoản nhân viên ${newEmployee.username} thành công!`);
          loadListEmployee();
        });
    }
  };

  render() {
     const { name, phone, email, username, password } = this.state;
    return (
      <Form style={{ marginTop: '10px', marginBottom: '10px' }}>
        <FormGroup row>
          <Col md="3" style={{ alignSelf: 'center' }}>
            <Label htmlFor="nameCre">Họ và tên</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="text"
              id="nameCre"
              name="name"
              value={name}
              onChange={this.onChange}
              //value="tên gì đó"
              placeholder="Nhập tên nhân viên..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3" style={{ alignSelf: 'center' }}>
            <Label htmlFor="emailCre">Email</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="text"
              id="emailCre"
              name="email"
              onChange={this.onChange}
              value={email}
              //value="email@gmail.com"
              placeholder="Nhập email nhân viên..."
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3" style={{ alignSelf: 'center' }}>
            <Label htmlFor="phoneCre">Số điện thoại</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="text"
              id="phoneCre"
              name="phone"
              onChange={this.onChange}
              value={phone}
              //value="00080800"
              placeholder="Nhập số điện thoại nhân viên..."
            />
          </Col>
        </FormGroup>
        {/* phát sinh username */}
        <FormGroup row>
          <Col md="3" style={{ alignSelf: 'center' }}>
            <Label htmlFor="usernameCre">Phát sinh tên đăng nhập</Label>
          </Col>
          <Col xs="12" md="8">
            <InputGroup>
              <Input
                placeholder="Tên đăng nhập..."
                value={this.state.username}
                readOnly
              />
              <InputGroupAddon addonType="append">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      username: 'nv' + this.props.listEmployee.length,
                    });
                  }}
                  color="primary"
                >
                  <i className="fa fa-refresh" style={{ color: 'white' }} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
        <Row>
          <Button
            onClick={this.createEmployee}
            color="primary"
            style={{ marginRight: '15px', marginLeft: '15px' }}
          >
            Tạo tài khoản
          </Button>
          <Button color="warning">Reset</Button>
        </Row>
      </Form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listEmployee: state.employeeManage.listEmployee,
  
  };
};

const actionCreators = {
  loadListEmployee: adminListEmployeeActions.loadListEmployee,
};

export default connect(mapStateToProps, actionCreators)(FormAddEmployee);
