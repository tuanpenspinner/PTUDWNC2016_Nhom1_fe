import React, { Component } from 'react';
import {
  Button,
  Card,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  CardFooter,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
  Tooltip,
  Form,
  Input,
  InputGroupAddon,
  Row,
  InputGroup,
  FormGroup,
  CardHeader,
  ListGroup,
  ListGroupItem,
  TabContent,
  Collapse,
} from 'reactstrap';

import CDataTable from '../../components/table/CDataTable';
import usersData1 from '../../components/table/UsersData';
const usersData = [
  {
    id: 1,
    username: 'cus001',
    name: 'hoàng thị cát uyên',
    email: 'hoanguyen234@gmail.com',
    phone: '02124324134234',
    checkingAccount: { accountNumber: '23423432', amount: '23423' },
    savingsAccount: [{ accountNumber: '14323', amount: '234234' }],
  },
  {
    id: 2,
    username: 'cus002',
    name: 'hoàng thị cát uyên 2',
    email: 'hoanguyen4@gmail.com',
    phone: '12423523',
    checkingAccount: { accountNumber: '11111', amount: '2222' },
    savingsAccount: [{ accountNumber: '3333', amount: '44444' }],
  },
];
class CustomerManage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleHistory = this.toggleHistory.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      activeTabHistory: 0,
      details: [],
      detailsHistory: [],
    };
  }

  //xử lí click tab trong lịchh sử giao dịch
  // eslint-disable-next-line react/sort-comp
  toggleHistory(tab) {
    if (this.state.activeTabHistory !== tab) {
      this.setState({ detailsHistory: [] });
      this.setState({
        activeTabHistory: tab,
      });
    }
  }

  //hàm xử lí hiện detail trong list customer
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

  //hàm xử lí hiện detail trong history
  toggleDetailsHistory = (index) => {
    const position = this.state.detailsHistory.indexOf(index);
    let newDetails = this.state.detailsHistory.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...this.state.detailsHistory, index];
    }
    this.setState({ detailsHistory: newDetails });
  };

  // click chọn tab
  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => {
                    this.toggle(0, '1');
                  }}
                >
                  Danh sách tài khoản khách hàng
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  Lịch sử giao dịch của khách hàng
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => {
                    this.toggle(0, '3');
                  }}
                >
                  Tạo tài khoản
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {/*tab content danh sách tài khoản */}
              <TabPane tabId="1">
                <CDataTable
                  items={usersData}
                  tableFilter
                  itemsPerPage={10}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '3%' } },
                    {
                      key: 'username',
                      label: 'Tên dăng nhập',
                    },
                    {
                      key: 'name',
                      label: 'Họ và tên',
                    },
                    {
                      key: 'email',
                      label: 'Email',
                    },

                    {
                      key: 'phone',
                      label: 'Số điện thoại',
                    },
                    {
                      key: 'action',
                      label: '',
                      _style: { width: '170px' },
                      sorter: false,
                      filter: false,
                    },
                  ]}
                  scopedSlots={{
                    action: (item, index) => {
                      return (
                        <td>
                          <Row
                            inline
                            style={{
                              width: '170px',
                              justifyItems: 'center',
                              justifySelf: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Button
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              style={{ marginRight: 5 }}
                              onClick={() => {
                                this.toggleDetails(index);
                              }}
                            >
                              {this.state.details.includes(index)
                                ? 'Ẩn'
                                : 'Chi tiết'}
                            </Button>
                            <Button
                              color="success"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                this.toggle(0, '2');
                              }}
                            >
                              Lịch sử giao dịch
                            </Button>
                          </Row>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <Collapse isOpen={this.state.details.includes(index)}>
                          <CardBody>
                            <p>
                              chỗ này show chi tiết từng số tài khoản với số
                              tiền (tài khoản tiết kieemk và tài khoản thanh
                              toán)
                            </p>
                          </CardBody>
                        </Collapse>
                      );
                    },
                  }}
                />
              </TabPane>
              {/*tab content lịch sử giao dịch của 1 tài khoản */}
              <TabPane tabId="2">
                <div className="d-flex flex-row">
                  <Col md="3">
                    <ListGroup id="list-tab" role="tablist">
                      <ListGroupItem
                        onClick={() => this.toggleHistory(0)}
                        action
                        active={this.state.activeTabHistory === 0}
                      >
                        Nhận tiền
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => this.toggleHistory(1)}
                        action
                        active={this.state.activeTabHistory === 1}
                      >
                        Chuyển khoản
                      </ListGroupItem>
                      <ListGroupItem
                        onClick={() => this.toggleHistory(2)}
                        action
                        active={this.state.activeTabHistory === 2}
                      >
                        Thanh toán nợ
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col>
                    <TabContent activeTab={this.state.activeTabHistory}>
                      <TabPane tabId={0}>
                        <CDataTable
                          items={usersData1}
                          columnFilter
                          itemsPerPage={5}
                          hover
                          sorter
                          pagination
                          fields={[
                            { key: 'id', _style: { width: '1%' } },
                            { key: 'name', label: 'Tên người gửi' },
                            { key: 'accountNumber', label: 'STK người gửi' },
                            { key: 'amount', label: 'Số tiền gửi' },
                            { key: 'date', label: 'Ngày giao dịch' },
                            {
                              key: 'typePay',
                              label: 'Người trả phí',
                              filter: false,
                            },
                            {
                              key: 'showdetail',
                              label: '',
                              _style: { width: '1%' },
                              sorter: false,
                              filter: false,
                            },
                          ]}
                          scopedSlots={{
                            showdetail: (item, index) => {
                              return (
                                <td className="text-center">
                                  <Button
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => {
                                      this.toggleDetailsHistory(index);
                                    }}
                                  >
                                    {this.state.detailsHistory.includes(index)
                                      ? 'Hide'
                                      : 'Show'}
                                  </Button>
                                </td>
                              );
                            },
                            details: (item, index) => {
                              return (
                                <Collapse
                                  isOpen={this.state.detailsHistory.includes(
                                    index
                                  )}
                                >
                                  <CardBody>
                                    <p>Nội dung chuyển tiền: hiện ở đây</p>
                                  </CardBody>
                                </Collapse>
                              );
                            },
                          }}
                        />
                      </TabPane>
                      <TabPane tabId={1}>
                        <CDataTable
                          items={usersData1}
                          columnFilter
                          itemsPerPage={5}
                          hover
                          sorter
                          pagination
                          fields={[
                            { key: 'id', _style: { width: '1%' } },
                            { key: 'name', label: 'Tên người nhận' },
                            { key: 'accountNumber', label: 'STK người nhận' },
                            { key: 'amount', label: 'Số tiền gửi' },
                            { key: 'date', label: 'Ngày giao dịch' },
                            {
                              key: 'typePay',
                              label: 'Người trả phí',
                              filter: false,
                            },
                            {
                              key: 'showdetail',
                              label: '',
                              _style: { width: '1%' },
                              sorter: false,
                              filter: false,
                            },
                          ]}
                          scopedSlots={{
                            showdetail: (item, index) => {
                              return (
                                <td className="text-center">
                                  <Button
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => {
                                      this.toggleDetailsHistory(index);
                                    }}
                                  >
                                    {this.state.detailsHistory.includes(index)
                                      ? 'Hide'
                                      : 'Show'}
                                  </Button>
                                </td>
                              );
                            },
                            details: (item, index) => {
                              return (
                                <Collapse
                                  isOpen={this.state.detailsHistory.includes(
                                    index
                                  )}
                                >
                                  <CardBody>
                                    <p>Nội dung chuyển tiền: hiện ở đây</p>
                                  </CardBody>
                                </Collapse>
                              );
                            },
                          }}
                        />
                      </TabPane>
                      <TabPane tabId={2}>
                        <CDataTable
                          items={usersData1}
                          columnFilter
                          itemsPerPage={5}
                          hover
                          sorter
                          pagination
                          fields={[
                            { key: 'id', _style: { width: '1%' } },
                            { key: 'name', label: 'Tên người trả/ được trả' },
                            { key: 'accountNumber', label: 'STK người trả/ được trả' },
                            { key: 'amount', label: 'Số tiền nợ' },
                            { key: 'date', label: 'Ngày thanh toán' },
                            {key: 'type', label: 'Nhắc nợ tạo bởi'}, //'chủ tài khoản' or 'người khác' 
                            {
                              key: 'showdetail',
                              label: '',
                              _style: { width: '1%' },
                              sorter: false,
                              filter: false,
                            },
                          ]}
                          scopedSlots={{
                            showdetail: (item, index) => {
                              return (
                                <td className="text-center">
                                  <Button
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => {
                                      this.toggleDetailsHistory(index);
                                    }}
                                  >
                                    {this.state.detailsHistory.includes(index)
                                      ? 'Hide'
                                      : 'Show'}
                                  </Button>
                                </td>
                              );
                            },
                            details: (item, index) => {
                              return (
                                <Collapse
                                  isOpen={this.state.detailsHistory.includes(
                                    index
                                  )}
                                >
                                  <CardBody>
                                    <p>Nội dung chuyển tiền: hiện ở đây</p>
                                  </CardBody>
                                </Collapse>
                              );
                            },
                          }}
                        />{' '}
                      </TabPane>
                    </TabContent>
                  </Col>
                </div>
              </TabPane>
              {/*tab content tạo tài khoản */}
              <TabPane tabId="3">
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
                                placeholder="Nhập số điện thoại..."
                              />
                            </Col>
                          </FormGroup>

                          {/* phát sinh username */}
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="username">
                                Phát sinh tên đăng nhập
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
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CustomerManage;
