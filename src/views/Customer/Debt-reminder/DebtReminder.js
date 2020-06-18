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
    };
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

  // get infor người nhận khi nhập stk thanh toán
  handleCommitAccountNumber = (e) => {
    this.setState({ collapse: !this.state.collapse });
    e.preventDefault();
  };

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
                  Tất cả nhắc nợ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  Tạo nhắc nợ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => {
                    this.toggle(0, '3');
                  }}
                >
                  Thanh toán nhắc nợ
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="1">
                <CDataTable
                  items={usersData}
                  columnFilter
                  tableFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '1%' } },
                    { key: 'name', label: 'Người gửi/ nhận nhắc nợ' },
                    { key: 'accountNumber', label: 'Số tài khoản' },
                    { key: 'type', label: 'Loại nhắc nợ' }, //gửi nhắc nợ hoặc nhận nhắc nợ
                    { key: 'date', label: 'Ngày tạo' },
                    { key: 'typePay', label: 'Trạng thái' }, //đã thanh toán/ chưa thanh toán, sửa key sau
                    {
                      key: 'showdetail',
                      label: '',
                      _style: {  },
                      sorter: false,
                      filter: false,
                    },
                  ]}
                  scopedSlots={{
                    showdetail: (item, index) => {
                      return (
                        <td>
                          <Row className="text-center" 
                            style={{ width: '100px' }}>
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
                              Số tiền :{' '}
                              {
                                usersData.filter((i) => i.id === item.id)[0]
                                  .amount
                              }
                            </p>

                            <p>
                              Nội dung nhắc nợ:{' '}
                              {
                                usersData.filter((i) => i.id === item.id)[0]
                                  .content
                              }
                            </p>
                          </CardBody>
                        </Collapse>
                      );
                    },
                  }}
                />
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col xs="12" xl="5">
                    <Card>
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
                                value="adfwetfwegggggggwagr"
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
                                <Input placeholder="Số tài khoản của người nhận..." />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    onClick={this.handleCommitAccountNumber}
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
                          {/* kết quả trả về khi nhập stk người nhận */}
                          <Collapse isOpen={this.state.collapse}>
                            <FormGroup row>
                              <Col md="4" />
                              <Col xs="12" md="8">
                                <label style={{ color: 'red' }}>
                                  err nè he...
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
                                  value="nguyễn văn a"
                                  disabled
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="4" style={{ alignSelf: 'center' }}>
                                <Label htmlFor="emailReceiver">
                                  Email người nhận
                                </Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input
                                  type="text"
                                  id="emailReceiver"
                                  name="emailReceiver"
                                  value="nva@gmail.com"
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
                                name="amount"
                                value="1000000"
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
                                name="contentTransfer"
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
                          onClick={this.toggleSmall}
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
                      <CardHeader>
                        <i className="fa fa-address-card-o" />
                        <strong>Danh sách người nhận</strong>
                      </CardHeader>
                      <CardBody>
                        <CDataTable
                          items={usersData}
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
                            action: (item, index) => {
                              return (
                                <td>
                                  <Col className="text-center">
                                    <Button
                                      size="sm"
                                      color="primary"
                                      className="btn-pill"
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
              <TabPane tabId="3">
                {' '}
                <Row>
                  <Col xs="12" xl="5">
                    <Card>
                      <CardHeader>
                        <strong>Thanh toán nợ</strong>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          {/* id phiếu nợ */}
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
                          </FormGroup>

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
                                value="adfwetfwegggggggwagr"
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
                              <Input placeholder="Số tài khoản của người nhận..." />
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
                                value="1000000"
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
                      <CardHeader>
                        <i className="fa fa-address-card-o" />
                        <strong>Danh sách nợ chưa thanh toán</strong>
                      </CardHeader>
                      <CardBody>
                        <CDataTable
                          items={usersData}
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
                              key: 'accountNumber',
                              _style: { width: '30%' },
                              label: 'Số tài khoản',
                            },
                            {
                              key: 'date',
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
                            action: (item, index) => {
                              return (
                                <td>
                                  <Row
                                    className="text-center"
                                    style={{ width: '100px', justifySelf:'center', justifyContent: 'center' }}
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
                                      Số tiền :{' '}
                                      {
                                        usersData.filter(
                                          (i) => i.id === item.id
                                        )[0].amount
                                      }
                                    </p>

                                    <p>
                                      Nội dung nhắc nợ:{' '}
                                      {
                                        usersData.filter(
                                          (i) => i.id === item.id
                                        )[0].content
                                      }
                                    </p>
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

export default DebtReminder;
