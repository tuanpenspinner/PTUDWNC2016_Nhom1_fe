/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
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
  TabContent,
  Collapse,
} from 'reactstrap';

import CDataTable from '../../components/table/CDataTable';
import usersData from '../../components/table/UsersData';
import { connect } from 'react-redux';
import { manageDebtRemindersActions } from '../../../actions/customer/manageDebtReminders';
import axios from 'axios';

class DebtReminder extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      details: [],
      detailsPayDebt: [], //chi tiết nhắc nợ
      collapse: false,
      modal: false, //modal xác nhận tạo nhắc nợ
      modalPayDebt: false, //modal xác nhận thanh toán nợ
      listDebtNotPaid: [], //Danh sách nợ chưa thanh toán
      newDebt: {
        creator: null,
        nameCreator: null,
        debtor: null,
        nameDebtor: null,
        debt: null,
        content: null,
      },
      payDebt: {},
      err: '',
    };
  }
  UNSAFE_componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    console.log('++++' + accessToken);
    const { getAllDebtReminders, getListReceiver } = this.props; //test lấy tất cả nhắc nợ, f12 để xem kết quả
    getAllDebtReminders(accessToken);
    getListReceiver(accessToken);
  }

  // đóng modal tạo nhắc nợ
  toggleSmall = async (e) => {
    await this.setState({
      modal: !this.state.modal,
    });
  };

  // đóng modal thanh toán nợ
  toggleSmallPayDebt = async (e) => {
    await this.setState({
      modalPayDebt: !this.state.modalPayDebt,
    });
  };

  //hàm xử lí hiện detail trong list nhắc nợ
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

  //hàm xử lí hiện detail trong list nhắc nợ chưa thanh toán
  toggleDetailsPayDebt = (index) => {
    const position1 = this.state.detailsPayDebt.indexOf(index);
    let newDetails1 = this.state.detailsPayDebt.slice();
    if (position1 !== -1) {
      newDetails1.splice(position1, 1);
    } else {
      newDetails1 = [...this.state.detailsPayDebt, index];
    }
    this.setState({ detailsPayDebt: newDetails1 });
  };

  // hàm khi click button Chuyển tiền
  transfering = (e) => {
    this.toggleSmall();
  };

  // hàm xác nhận tạo nhắc nợ trên modal
  comfirmSend = (e) => {
    this.toggleSmall();
  };

  // hàm xác nhận thanh toán nợ trên modal
  comfirmPayDebt = (e) => {
    this.toggleSmallPayDebt();
  };

  //click chọn tab
  // eslint-disable-next-line react/sort-comp
  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  //Tìm tên người nhận theo SKT
  findNameDebtor = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const ret = await axios.get(
      `http://localhost:3001/customers/nameCustomer/${this.state.newDebt.debtor}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      }
    );
    if (ret.data.status) {
      this.setState({
        newDebt: {
          ...this.state.newDebt,
          nameDebtor: ret.data.customer.name,
          err: '',
        },
      });
    } else {
      this.setState({
        err: 'Không tìm thấy tài khoản!',
      });
    }
  };

  // get infor người nhận khi nhập stk thanh toán
  handleCommitAccountNumber = (e) => {
    this.setState({ collapse: !this.state.collapse });
    e.preventDefault();
  };
  creteDebt = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const newDebt = {
      creator: this.props.accountNumber,
      nameCreator: this.props.name,
      nameDebtor: this.state.newDebt.nameDebtor,
      debtor: this.state.newDebt.debtor,
      debt: this.state.newDebt.debt,
      content: this.state.newDebt.content,
    };
    try {
      const ret = await axios.post(
        `http://localhost:3001/api/debt-reminders`,
        newDebt,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'access-token': accessToken,
          },
        }
      );
      const { getAllDebtReminders, getListReceiver } = this.props; //test lấy tất cả nhắc nợ, f12 để xem kết quả
      getAllDebtReminders(accessToken);
      getListReceiver(accessToken);
      alert(ret.data.message);
    } catch (e) {
      alert('Thêm thất bại!');
    }
  };
  onChangeNewDebt = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'debtor')
      this.setState({
        newDebt: {
          ...this.state.newDebt,
          [name]: value,
          nameDebtor: '',
        },
      });
    else {
      this.setState({
        newDebt: {
          ...this.state.newDebt,
          [name]: value,
        },
      });
    }
  };
  render() {
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace('.', c) : num).replace(
        new RegExp(re, 'g'),
        '$&' + (s || ',')
      );
    };
    // console.log('Mình tạo' + JSON.stringify(this.props.listOfMe));
    // console.log('Danh sách người nhân', this.props.listOfOthers);
    // console.log('Chua thanh toán', this.props.listDebtNotPaid);
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace('.', c) : num).replace(
        new RegExp(re, 'g'),
        '$&' + (s || ',')
      );
    };
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
                  Người khác nhắc nợ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  Bản thân tạo nhắc nợ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => {
                    this.toggle(0, '3');
                  }}
                >
                  Tạo nhắc nợ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '4'}
                  onClick={() => {
                    this.toggle(0, '4');
                  }}
                >
                  Thanh toán nhắc nợ
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="1">
                <CDataTable
                  items={this.props.listOfOthers}
                  columnFilter
                  tableFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '1%' } },
                    { key: 'nameCreator', label: 'Tên người nhắc nợ' },
                    { key: 'creator', label: 'Số tài khoản' },
                    { key: 'timeCreate', label: 'Ngày tạo' },
                    { key: 'typePay', label: 'Trạng thái' }, //đã thanh toán/ chưa thanh toán, sửa key sau
                    {
                      key: 'showdetail',
                      label: '',
                      _style: {},
                      sorter: false,
                      filter: false,
                    },
                  ]}
                  scopedSlots={{
                    id: (item, index) => {
                      return <td className="text-center">{index + 1}</td>;
                    },
                    typePay: (item, index) => {
                      return (
                        <td>
                          {item.pay.isPaid === true ? 'Đã trả' : 'Chưa trả'}
                        </td>
                      );
                    },

                    showdetail: (item, index) => {
                      return (
                        <td>
                          <Row
                            className="text-center"
                            style={{ width: '100px' }}
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
                                ? 'Hide'
                                : 'Show'}
                            </Button>
                            <Button
                              color="danger"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                //hủy nhắc nợ
                              }}
                            >
                              Hủy
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
                              Số tiền :
                              {'  ' +
                                parseInt(item.debt).format(0, 3, '.', ',')}
                              đồng
                            </p>

                            <p>Nội dung nhắc nợ :{'  ' + item.content}</p>
                          </CardBody>
                        </Collapse>
                      );
                    },
                  }}
                />
              </TabPane>
              <TabPane tabId="2">
                <CDataTable
                  items={this.props.listOfMe}
                  columnFilter
                  tableFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '1%' } },
                    { key: 'nameDebtor', label: 'Tên người nhận nợ' },
                    { key: 'debtor', label: 'Số tài khoản' },
                    { key: 'timeCreate', label: 'Ngày tạo' },
                    { key: 'typePay', label: 'Trạng thái' }, //đã thanh toán/ chưa thanh toán, sửa key sau
                    {
                      key: 'showdetail',
                      label: '',
                      _style: {},
                      sorter: false,
                      filter: false,
                    },
                  ]}
                  scopedSlots={{
                    id: (item, index) => {
                      return <td className="text-center">{index + 1}</td>;
                    },
                    typePay: (item, index) => {
                      return (
                        <td>
                          {item.pay.isPaid === true ? 'Đã trả' : 'Chưa trả'}
                        </td>
                      );
                    },

                    showdetail: (item, index) => {
                      return (
                        <td>
                          <Row
                            className="text-center"
                            style={{ width: '100px' }}
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
                                ? 'Hide'
                                : 'Show'}
                            </Button>
                            <Button
                              color="danger"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                //hủy nhắc nợ
                              }}
                            >
                              Hủy
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
                              Số tiền :
                              {'  ' +
                                parseInt(item.debt).format(0, 3, '.', ',') +
                                ' '}
                              đồng
                            </p>

                            <p>Nội dung nhắc nợ :{'  ' + item.content}</p>
                          </CardBody>
                        </Collapse>
                      );
                    },
                  }}
                />
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col xs="12" xl="5">
                    <Card>
                      <CardHeader className="text-center">
                        <strong className="text-center">Tạo nhắc nợ</strong>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          {/* số tài khoản thanh toán của bạn */}

                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="checkingAccountNumber">
                                STK của bạn
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                type="text"
                                id="accountNumber"
                                name="checkingAccountNumber"
                                value={this.props.accountNumber}
                                disabled
                              />
                            </Col>
                          </FormGroup>
                          {/* số tài khoản thanh toán của người nhận */}
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="accountNumberReceiver">
                                STK người nhận
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <InputGroup>
                                <Input
                                  placeholder="Số tài khoản của người nhận..."
                                  name="debtor"
                                  onChange={this.onChangeNewDebt}
                                  value={this.state.newDebt.debtor}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    onClick={this.handleCommitAccountNumber}
                                    color="primary"
                                    onClick={this.findNameDebtor}
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
                          {/* kết quả trả về khi nhập stk người nhận */}
                          <Collapse isOpen={true}>
                            <FormGroup row>
                              <Col md="4" />
                              <Col xs="12" md="8">
                                <label style={{ color: 'red' }}>
                                  {this.state.err}
                                </label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="4" style={{ alignSelf: 'center' }}>
                                <Label htmlFor="nameReceiver">
                                  Tên người nhận
                                </Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input
                                  type="text"
                                  id="nameReceiver"
                                  name="nameReceiver"
                                  value={this.state.newDebt.nameDebtor}
                                  disabled
                                />
                              </Col>
                            </FormGroup>
                          </Collapse>
                          {/* số tiền nhắc nợ */}
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="amount">Số tiền nhắc nợ</Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                type="number"
                                id="amount"
                                name="debt"
                                onChange={this.onChangeNewDebt}
                              />
                            </Col>
                          </FormGroup>
                          {/* nội dung chuyển tiền */}
                          <FormGroup row>
                            <Col md="4">
                              <Label htmlFor="contentTransfer">
                                Nội dung nhắc nợ
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                type="textarea"
                                name="content"
                                onChange={this.onChangeNewDebt}
                                id="textarea-input"
                                rows="3"
                                style={{
                                  minHeight: '40px',
                                  maxHeight: '100px',
                                }}
                                placeholder="Nội dung..."
                              />
                            </Col>
                          </FormGroup>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button
                          color="primary"
                          style={{ marginRight: '15px' }}
                          type="submit"
                          onClick={this.creteDebt}
                        >
                          Tạo nhắc nợ
                        </Button>
                        <Button color="warning">Reset</Button>
                        <Modal
                          isOpen={this.state.modal}
                          toggle={this.toggleSmall}
                          className="modal-sm"
                        >
                          <ModalHeader toggle={this.toggleSmall}>
                            Xác nhận
                          </ModalHeader>
                          <ModalBody>
                            <Label>Bạn chắn chắn muốn gửi nhắc nợ này?</Label>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.comfirmSend}>
                              Gửi
                            </Button>{' '}
                            <Button
                              color="secondary"
                              onClick={this.toggleSmall}
                            >
                              Hủy
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col xs="12" xl="7">
                    <Card>
                      <CardHeader className="text-center">
                        <i className="fa fa-address-card-o" />
                        <strong>Danh sách người nhận</strong>
                      </CardHeader>
                      <CardBody>
                        <CDataTable
                          items={this.props.listReceiver}
                          tableFilter
                          itemsPerPage={5}
                          hover
                          sorter
                          pagination
                          fields={[
                            { key: 'id', _style: { width: '3%' } },
                            {
                              key: 'name',
                              _style: { width: '35%' },
                              label: 'Họ và tên',
                            },
                            {
                              key: 'accountNumber',
                              _style: { width: '35%' },
                              label: 'Số tài khoản',
                            },
                            {
                              key: 'action',
                              label: '',
                              _style: { width: '3%' },
                              sorter: false,
                              filter: false,
                            },
                          ]}
                          scopedSlots={{
                            id: (item, index) => {
                              return (
                                <td className="text-center">{index + 1}</td>
                              );
                            },
                            action: (item, index) => {
                              return (
                                <td>
                                  <Col className="text-center">
                                    <Button
                                      size="sm"
                                      color="primary"
                                      className="btn-pill"
                                      onClick={() => {
                                        this.setState({
                                          newDebt: {
                                            ...this.state.newDebt,
                                            debtor: item.accountNumber,
                                            nameDebtor: item.name,
                                          },
                                        });
                                      }}
                                    >
                                      <i className="fa fa-send" />
                                    </Button>
                                  </Col>
                                </td>
                              );
                            },
                          }}
                        />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col xs="12" xl="5">
                    <Card>
                      <CardHeader className="text-center">
                        <strong className="text-center">Thanh toán nợ</strong>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          {/* id phiếu nợ
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="idDebtReminder">
                                ID phiếu nợ
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                type="text"
                                id="IDDebtReminder"
                                name="IDDebtReminder"
                                value="1234132"
                                disabled
                              />
                            </Col>
                          </FormGroup> */}

                          {/* số tài khoản thanh toán của bạn */}
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="checkingAccountNumberPayDebt">
                                STK của bạn
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                type="text"
                                id="accountNumberPayDebt"
                                name="checkingAccountNumberPayDebt"
                                value={this.props.accountNumber}
                                disabled
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="checkingAccountNumberPayDebt">
                                Số dư hiện tại
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                type="text"
                                id="accountNumberPayDebt"
                                name="checkingAccountNumberPayDebt"
                                value={
                                  parseInt(this.props.amount).format(
                                    0,
                                    3,
                                    '.',
                                    ','
                                  ) + ' đồng'
                                }
                                disabled
                              />
                            </Col>
                          </FormGroup>
                          {/* số tài khoản thanh toán của người nhận */}
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="accountNumberReceiverPayDebt">
                                STK người nhận
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                placeholder="Số tài khoản của người nhận..."
                                disabled
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="accountNumberReceiverPayDebt">
                                Họ tên người nhận
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                placeholder="Họ tên của người nhận..."
                                disabled
                              />
                            </Col>
                          </FormGroup>
                          {/* số tiền thanh toán nợ */}
                          <FormGroup row>
                            <Col md="4" style={{ alignSelf: 'center' }}>
                              <Label htmlFor="amountDebt">
                                Số tiền thanh toán
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                type="number"
                                id="amountDebt"
                                name="amountDebt"
                                value={this.state.amountDebt}
                                readOnly
                              />
                            </Col>
                          </FormGroup>
                          {/* nội dung chuyển tiền */}
                          <FormGroup row>
                            <Col md="4">
                              <Label htmlFor="contentPayDebt">
                                Nội dung thanh toán
                              </Label>
                            </Col>
                            <Col xs="12" md="8">
                              <Input
                                type="textarea"
                                name="contentPayDebt"
                                id="textarea-input"
                                rows="3"
                                style={{
                                  minHeight: '40px',
                                  maxHeight: '100px',
                                }}
                                readOnly
                                placeholder="Nội dung..."
                              />
                            </Col>
                          </FormGroup>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <Button
                          color="primary"
                          style={{ marginRight: '15px' }}
                          type="submit"
                          onClick={this.toggleSmallPayDebt}
                        >
                          Thanh toán nợ
                        </Button>
                        <Button color="warning">Reset</Button>
                        <Modal
                          isOpen={this.state.modalPayDebt}
                          toggle={this.toggleSmallPayDebt}
                          className="modal-sm"
                        >
                          <ModalHeader toggle={this.toggleSmallPayDebt}>
                            Xác nhận
                          </ModalHeader>
                          <ModalBody>
                            <Label>
                              Bạn chắn chắn muốn thanh toán khoản nợ này?
                            </Label>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="primary"
                              onClick={this.comfirmPayDebt}
                            >
                              Gửi
                            </Button>{' '}
                            <Button
                              color="secondary"
                              onClick={this.toggleSmallPayDebt}
                            >
                              Hủy
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col xs="12" xl="7">
                    <Card>
                      <CardHeader className="text-center">
                        <i className="fa fa-address-card-o" />
                        <strong>Danh sách nợ chưa thanh toán</strong>
                      </CardHeader>
                      <CardBody>
                        <CDataTable
                          items={this.props.listDebtNotPaid}
                          tableFilter
                          itemsPerPage={5}
                          hover
                          sorter
                          pagination
                          fields={[
                            { key: 'id', _style: { width: '1%' } },
                            {
                              key: 'name',
                              label: 'Họ và tên',
                            },
                            {
                              key: 'creator',
                              _style: { width: '30%' },
                              label: 'Số tài khoản',
                            },
                            {
                              key: 'timeCreate',
                              _style: { width: '20%' },
                              label: 'Ngày tạo',
                            },
                            {
                              key: 'action',
                              label: '',
                              sorter: false,
                              filter: false,
                            },
                          ]}
                          scopedSlots={{
                            id: (item, index) => {
                              return (
                                <td className="text-center">{index + 1}</td>
                              );
                            },
                            action: (item, index) => {
                              return (
                                <td>
                                  <Row
                                    className="text-center"
                                    style={{
                                      width: '100px',
                                      justifySelf: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Button
                                      size="sm"
                                      color="primary"
                                      className="btn-pill"
                                      style={{ marginRight: 5 }}
                                    >
                                      <i className="fa fa-send" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      color="warning"
                                      className="btn-pill"
                                      onClick={(e) => {
                                        this.toggleDetailsPayDebt(index);
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
                                  isOpen={this.state.detailsPayDebt.includes(
                                    index
                                  )}
                                >
                                  <CardBody>
                                    <p>
                                      Số tiền :
                                      {parseInt(item.debt).format(
                                        0,
                                        3,
                                        '.',
                                        ','
                                      ) + ' đồng'}
                                    </p>

                                    <p>Nội dung nhắc nợ: {item.content}</p>
                                  </CardBody>
                                </Collapse>
                              );
                            },
                          }}
                        />
                      </CardBody>
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
const mapStateToProps = (state) => {
  return {
    listOfMe: state.manageDebtReminders.allDebtReminders.listOfMe,
    listOfOthers: state.manageDebtReminders.allDebtReminders.listOfOthers,
    listReceiver: state.manageDebtReminders.listReceiver,
    info: state.manageDebtReminders.info,
    listDebtNotPaid: state.manageDebtReminders.listDebtNotPaid,
    name: state.manageDebtReminders.name,
    accountNumber: state.manageDebtReminders.accountNumber,
    amount: state.manageDebtReminders.amount,
  };
};

const actionCreators = {
  getAllDebtReminders: manageDebtRemindersActions.getAllDebtReminders,
  getListReceiver: manageDebtRemindersActions.getListReceiver,
  // requestResetPassword: memberActions.requestResetPassword
};

export default connect(mapStateToProps, actionCreators)(DebtReminder);
