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
  CardHeader,
  Collapse,
  Label,
  InputGroup,
  InputGroupAddon,
  CardFooter,
} from 'reactstrap';

import CDataTable from '../../components/table/CDataTable';
import usersData from '../../components/table/UsersData';

class EmployeeManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      collapse: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  //toggle thêm employee
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  //hàm xử lí hiện detail trong list employee
  toggleDetails = (index) => {
    const position = this.state.details.indexOf(index);
    let newDetails = this.state.details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...this.state.details, index];
    }
    this.setState({ details: newDetails });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Danh sách tài khoản nhân viên</CardHeader>
          <CardBody>
            <Col xl='8'>
              <Button color="link" onClick={this.toggle} style={{marginBottom: '10px'}} id="toggleCollapse1">
                Thêm tài khoản nhân viên
              </Button>

              <Collapse isOpen={this.state.collapse}>
                <Form style={{marginTop: '10px', marginBottom: '10px'}}>
                  <FormGroup row>
                    <Col md="3" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="nameCre">Họ và tên</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="nameCre"
                        name="nameCre"
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
                        name="emailCre"
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
                        name="phoneCre"
                        //value="00080800"
                        placeholder="Nhập số điện thoại nhân viên..."
                      />
                    </Col>
                  </FormGroup>
                  {/* phát sinh username */}
                  <FormGroup row>
                    <Col md="3" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="usernameCre">
                        Phát sinh tên đăng nhập
                      </Label>
                    </Col>
                    <Col xs="12" md="8">
                      <InputGroup>
                        <Input placeholder="Tên đăng nhập..." readOnly />
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
                        <Row>
                          <Button color='primary' style={{marginRight: '15px', marginLeft: '15px'}}>Tạo tài khoản</Button>
                          <Button color='warning'>Reset</Button>
                        </Row>
                </Form>
              </Collapse>
            </Col>
            <Col>
              <CDataTable
                items={usersData}
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
                      <td>
                        <Row
                          className="text-center"
                          style={{
                            minWidth: '70px',
                            justifySelf: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Button
                            size="sm"
                            color="danger"
                            className="btn-pill"
                            style={{ marginRight: 10 }}
                          >
                            <i className="fa fa-trash-o" />
                          </Button>
                          <Button
                            size="sm"
                            color="success"
                            className="btn-pill"
                            onClick={(e) => {
                              this.toggleDetails(index);
                            }}
                          >
                            <i
                              className="fa fa-info"
                              style={{
                                paddingRight: 3,
                                paddingLeft: 3,
                              }}
                            />
                          </Button>
                        </Row>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <Collapse
                        isOpen={this.state.details.includes(index)}
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
                                        value="tên gì đó"
                                        placeholder="Nhập tên nhân viên..."
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
                                        value="email@gmail.com"
                                        placeholder="Nhập email nhân viên..."
                                      />
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row>
                                    <Col md="4" style={{ alignSelf: 'center' }}>
                                      <Label htmlFor="phone">
                                        Số điện thoại
                                      </Label>
                                    </Col>
                                    <Col xs="12" md="8">
                                      <Input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value="00080800"
                                        placeholder="Nhập số điện thoại nhân viên..."
                                      />
                                    </Col>
                                  </FormGroup>
                                </Form>
                              </CardBody>
                              <CardFooter>
                                <Button color="primary">Lưu</Button>
                              </CardFooter>
                            </Card>
                          </Col>
                        </Row>
                      </Collapse>
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

export default EmployeeManage;
