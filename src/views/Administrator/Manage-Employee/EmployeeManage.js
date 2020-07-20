import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Card,
  CardBody,
  Input,
  Form,
  FormGroup,
  Col,
  Row,
  CardHeader,
  Collapse,
  Label,
  CardFooter,
} from 'reactstrap';

import { adminListEmployeeActions } from '../../../actions/admin/listEmployee.action';
import CDataTable from '../../components/table/CDataTable';
import usersData from '../../components/table/UsersData';
import FormAddEmployee from './FormAddEmployee';
import RowEmployee from './RowEmployee';
import DetailsEmployee from './DetailsEmployee';

class EmployeeManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      collapse: false,
      listEmployees: [],
      tempListEmployees: [],
    };
    this.toggle = this.toggle.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { loadListEmployee } = this.props;
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    loadListEmployee(accessToken);
  }

  //toggle thêm employee
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Danh sách tài khoản nhân viên</CardHeader>
          <CardBody>
            <Col xl="8">
              <Button
                color="link"
                onClick={this.toggle}
                style={{ marginBottom: '10px' }}
                id="toggleCollapse1"
              >
                Thêm tài khoản nhân viên
              </Button>

              <Collapse isOpen={this.state.collapse}>
                <FormAddEmployee></FormAddEmployee>
                {/* phát sinh mật khẩu */}
                {/* <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="password">
                                Phát sinh mật khẩu
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <InputGroup>
                                <Input
                                  placeholder="Tên đăng nhập..."
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
                        */}
              </Collapse>
            </Col>
            <Col>
              <CDataTable
                items={this.props.listEmployee}
                columnFilter
                itemsPerPage={5}
                hover
                sorter
                pagination
                fields={[
                  { key: 'id', _style: { width: '1%' } },
                  { key: 'username', label: 'Tên đăng nhập' },
                  { key: 'name', label: 'Họ và tên' },
                  {
                    key: 'showdetail',
                    label: '',
                    sorter: false,
                    filter: false,
                  },
                ]}
                scopedSlots={{
                  showdetail: (item, index) => {
                    return (
                      <RowEmployee index={index} item={item}></RowEmployee>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <DetailsEmployee
                        item={item}
                        index={index}
                      ></DetailsEmployee>
                    );
                  },
                }}
              />
            </Col>
          </CardBody>
        </Card>
      </div>
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
  loadListEmployee: adminListEmployeeActions.loadListEmployee,
};

export default connect(mapStateToProps, actionCreators)(EmployeeManage);
// export default Login;
