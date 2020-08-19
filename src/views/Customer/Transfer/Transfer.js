/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Button,
  Card,
  Label,
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
  FormGroup,
  CardHeader,
  InputGroup,
  Collapse,
  CardFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import CDataTable from '../../components/table/CDataTable';
import { transferCustomerActions } from '../../../actions/customer/transfer';

import axios from 'axios';
import connector from '../../../constants/connector';

class Transfer extends Component {
  API = {
    partnerBankDetail:
      'https://great-banking.herokuapp.com/api/partner-bank-detail',
    local: 'https://great-banking.herokuapp.com/api',
  };
  constructor(props) {
    super(props);
    this.state = {
      switchPartnerBank: false, //state chọn gửi liên ngân hàng hoặc nội bộ
      collapse: true, //state collapse open khi tồn tại số tài khoản người nhận
      modal: false, //state modal open khi nhấn chuyển tiền, yêu cầu người dùng nhập code từ email
      tooltipOpen: [false, false],
      nameReceiver: '',
      partnerCode: 'PPNBank',
      loadingBankDetail: false,
      loadingTransfer: false,
      errorTransfer: null,
      payFee: 'transferer',
      contentTransfer: '',
      accountNumberReceiver: '',
      newReceiver: {
        name: '',
        accountNumber: '',
        bankCode: '',
      },
      index: '',
      transferAmount: null,
      otp: null,
    };
    this.toggleSmall = this.toggleSmall.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  UNSAFE_componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const { getListReceivers, connectSocketIoHost } = this.props;
    getListReceivers(accessToken);
 
  }

  reset = () => {
    this.setState({
      contentTransfer: '',
      accountNumberReceiver: '',
      nameReceiver: '',
      otp: null,
      loadingBankDetail: false,
      loadingTransfer: false,
      errorTransfer: null,
    });
  };

  // chọn chuyển khoản nội bộ hay liên ngân hàng
  handleSwitchChange = (ischecked) => {
    this.setState({
      switchPartnerBank: ischecked,
      nameReceiver: '',
      contentTransfer: '',
      accountNumberReceiver: '',
      payFee: 'transferer',
      transferAmount: '',
      newReceiver: {
        name: '',
        accountNumber: '',
        bankCode: '',
      },
    });
  };
  // get infor người nhận khi nhập stk thanh toán
  handleCommitAccountNumber = (e) => {
    this.setState({ nameReceiver: '', loadingBankDetail: true });
    e.preventDefault();

    if (this.state.switchPartnerBank) {
      const body = {
        bank_code: this.state.partnerCode,
        account_number: this.state.accountNumberReceiver,
      };
      axios
        .post(`${this.API.local}/partner-bank-detail`, body, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'access-token': localStorage.getItem('accessToken'),
          },
        })
        .then((res) => {
          console.log('result', res);
          this.setState({
            nameReceiver: res.data.name,
            errorTransfer: null,
            loadingBankDetail: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errorTransfer: 'Không tìm thấy tài khoản ở ngân hàng đối tác',
            loadingBankDetail: false,
          });
        });
    } else {
      axios
        .post(
          `${this.API.local}/internal-bank-detail`,
          { account_number: this.state.accountNumberReceiver },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'access-token': localStorage.getItem('accessToken'),
            },
          }
        )
        .then((res) => {
          this.setState({
            nameReceiver: res.data.name,
            errorTransfer: null,
            loadingBankDetail: false,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            errorTransfer: 'Không tìm thấy tài khoản!',
            loadingBankDetail: false,
          });
        });
    }
  };
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const r = this.state.newReceiver;
    this.setState({
      newReceiver: {
        ...r,
        [name]: value,
      },
    });
  };

  // show tooltip input thêm người nhận
  // eslint-disable-next-line react/sort-comp
  toggle(i) {
    const newArray = this.state.tooltipOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      tooltipOpen: newArray,
    });
  }

  // đóng modal
  toggleSmall = (e) => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  // hàm khi click button Chuyển tiền
  transfering = async (e) => {
    const { transferAmount, accountNumberReceiver, nameReceiver } = this.state;
    if (transferAmount && accountNumberReceiver && nameReceiver) {
      const { username, email } = this.props;
      const body = {
        username,
        email,
      };
      const accessToken = localStorage.getItem('accessToken');
      const ret = await axios.post(
        'https://great-banking.herokuapp.com/customers/saveAndSendOTP',
        body,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'access-token': accessToken,
          },
        }
      );
      this.toggleSmall();
    } else alert('Vui lòng điền đầy đủ thông tin chuyển tiền.');
  };

  // hàm xác nhận chuyển khoản trên modal
  confirmTransfer = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const {
      transferAmount,
      contentTransfer,
      payFee,
      accountNumberReceiver,
      nameReceiver,
      otp,
    } = this.state;
    if (!otp) {
      alert("Vui lòng nhập OTP đã được gửi email của bạn");
      return;
    }
    const body = {
      bank_code: '',
      amount: transferAmount,
      content: contentTransfer,
      transferer: this.props.checkingAccountNumber,
      receiver: accountNumberReceiver,
      nameReceiver: nameReceiver,
      nameTransferer: this.props.name,
      payFee: payFee,
      otp,
    };
    if (!this.state.switchPartnerBank) {
      body.bank_code = 'TUB';
    } else {
      body.bank_code = this.state.partnerCode;
    }

    this.state.loadingTransfer = true;
    try {
      await axios.post(`${this.API.local}/internal-money-transfer`, body, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      });

      alert('Chuyển tiền thành công!');
      this.saveReceiverAfterTransfer();

      const { getListReceivers } = this.props;
      getListReceivers(accessToken);
      this.toggleSmall();
    } catch (e) {
      if (e.message === 'Tài khoản người gửi không đủ tiền.') alert('Tài khoản người gửi không đủ tiền.')
      else {
        alert('Mã OTP chưa chính xác!');
      }
    }
    this.state.loadingTransfer = false;
  };
  saveReceiverAfterTransfer = async () => {
    const { nameReceiver, accountNumberReceiver } = this.state;
    const accessToken = localStorage.getItem('accessToken');
    var newReceiver = {
      name: nameReceiver,
      accountNumber: accountNumberReceiver,
      bankCode: '',
    };
    const { partnerCode, switchPartnerBank } = this.state;
    var { listReceivers } = this.props;
    var found = '';
    if (switchPartnerBank) {
      listReceivers = listReceivers.filter(
        (receiver) => receiver.bankCode === partnerCode
      );
      found = listReceivers.find(
        (receiver) => receiver.accountNumber === newReceiver.accountNumber
      );
    } else {
      listReceivers = listReceivers.filter(
        (receiver) => receiver.bankCode === 'TUB'
      );
      found = listReceivers.find(
        (receiver) => receiver.accountNumber === newReceiver.accountNumber
      );
    }

    if (!found) {
      if (!switchPartnerBank) {
        const ret = await axios.get(
          `https://great-banking.herokuapp.com/customers/nameCustomer/${newReceiver.accountNumber}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'access-token': accessToken,
            },
          }
        );
        if (ret.data.status) {
          if (!newReceiver.name) newReceiver.name = ret.data.customer.name;
          const { updateListReceivers } = this.props;
          listReceivers = this.props.listReceivers;
          newReceiver.bankCode = 'TUB';

          listReceivers.push(newReceiver);
          updateListReceivers(listReceivers, accessToken);
        }
      } else {
        try {
          const body = {
            bank_code: this.state.partnerCode,
            account_number: this.state.accountNumberReceiver,
          };

          const ret = await axios.post(
            `${this.API.local}/partner-bank-detail`,
            body,
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'access-token': localStorage.getItem('accessToken'),
              },
            }
          );

          if (!newReceiver.name) newReceiver.name = ret.data.name;
          const { updateListReceivers } = this.props;
          listReceivers = this.props.listReceivers;
          newReceiver.bankCode = this.state.partnerCode;

          listReceivers.push(newReceiver);
          updateListReceivers(listReceivers, accessToken);
        } catch (e) {}
      }
    }
  };

  addReceiver = async () => {
    const accessToken = localStorage.getItem('accessToken');
    var newReceiver = this.state.newReceiver;
    const { partnerCode, switchPartnerBank } = this.state;
    if (newReceiver.accountNumber === '')
      alert('Không được để trống số tài khoản!');
    var { listReceivers } = this.props;
    var found = '';
    if (switchPartnerBank) {
      listReceivers = listReceivers.filter(
        (receiver) => receiver.bankCode === partnerCode
      );
      found = listReceivers.find(
        (receiver) => receiver.accountNumber === newReceiver.accountNumber
      );
    } else {
      listReceivers = listReceivers.filter(
        (receiver) => receiver.bankCode === 'TUB'
      );
      found = listReceivers.find(
        (receiver) => receiver.accountNumber === newReceiver.accountNumber
      );
    }

    if (found) alert('Số tài khoản đã được thêm trước đó');
    else {
      if (!switchPartnerBank) {
        const ret = await axios.get(
          `https://great-banking.herokuapp.com/customers/nameCustomer/${newReceiver.accountNumber}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'access-token': accessToken,
            },
          }
        );
        if (ret.data.status) {
          if (!newReceiver.name) newReceiver.name = ret.data.customer.name;
          const { updateListReceivers } = this.props;
          listReceivers = this.props.listReceivers;
          newReceiver.bankCode = 'TUB';

          listReceivers.push(newReceiver);
          updateListReceivers(listReceivers, accessToken);
          alert('Thêm người gửi thành công vào danh sách!');
        } else {
          alert('Số tài khoản không tồn tại trong hệ thống!');
        }
      } else {
        try {
          const body = {
            bank_code: this.state.partnerCode,
            account_number: this.state.newReceiver.accountNumber,
          };

          const ret = await axios.post(
            `${this.API.local}/partner-bank-detail`,
            body,
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'access-token': localStorage.getItem('accessToken'),
              },
            }
          );

          if (!newReceiver.name) newReceiver.name = ret.data.name;
          const { updateListReceivers } = this.props;
          listReceivers = this.props.listReceivers;
          newReceiver.bankCode = this.state.partnerCode;

          listReceivers.push(newReceiver);
          updateListReceivers(listReceivers, accessToken);
          alert('Thêm người gửi thành công vào danh sách!');
        } catch (e) {
          alert('Số tài khoản không tồn tại trong hệ thống!');
        }
      }
    }
  };

  editReceiver = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const { index } = this.state;
    let { listReceivers } = this.props;
    var newReceiver = this.state.newReceiver;
    const { updateListReceivers } = this.props;
    const i = listReceivers.findIndex(
      (receiver) => receiver.accountNumber === newReceiver.accountNumber
    );
    if (!this.state.switchPartnerBank) {
      const ret = await axios.get(
        `https://great-banking.herokuapp.com/customers/nameCustomer/${newReceiver.accountNumber}`,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'access-token': accessToken,
          },
        }
      );
      newReceiver.bankCode = 'TUB';
      if (i >= 0) {
        if (!newReceiver.name) newReceiver.name = ret.data.customer.name;
        listReceivers[i] = newReceiver;
        updateListReceivers(listReceivers, accessToken);
        alert('Sửa người gửi thành công vào danh sách!');
      } else {
        if (ret.data.status) {
          if (!newReceiver.name) newReceiver.name = ret.data.customer.name;

          listReceivers.push(newReceiver);
          updateListReceivers(listReceivers, accessToken);
          alert('Thêm thành công vào danh sách!');
        } else {
          alert('Số tài khoản không tồn tại trong hệ thống!');
        }
      }
    } else {
      try {
        const body = {
          bank_code: this.state.partnerCode,
          account_number: this.state.newReceiver.accountNumber,
        };

        const ret = await axios.post(
          `${this.API.local}/partner-bank-detail`,
          body,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'access-token': localStorage.getItem('accessToken'),
            },
          }
        );
        newReceiver.bankCode = this.state.partnerCode;
        if (i >= 0) {
          if (!newReceiver.name) newReceiver.name = ret.data.customer.name;
          listReceivers[i] = newReceiver;

          updateListReceivers(listReceivers, accessToken);
          alert('Sửa người gửi thành công vào danh sách!');
        } else {
          if (!newReceiver.name) newReceiver.name = ret.data.name;

          listReceivers.push(newReceiver);
          updateListReceivers(listReceivers, accessToken);
          alert('Thêm người gửi thành công vào danh sách!');
        }
      } catch (e) {
        alert('Số tài khoản không tồn tại trong hệ thống!');
      }
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

    var { amountCheckingAccount } = this.props;
    amountCheckingAccount = parseInt(amountCheckingAccount).format(
      0,
      3,
      '.',
      ','
    );

    const { newReceiver, switchPartnerBank, partnerCode } = this.state;
    var { listReceivers } = this.props;
    if (switchPartnerBank)
      listReceivers = listReceivers.filter(
        (receiver) => receiver.bankCode === partnerCode
      );
    else
      listReceivers = listReceivers.filter(
        (receiver) => receiver.bankCode === 'TUB'
      );
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="5">
            <Card>
              <CardHeader>
                <i className="fa fa-location-arrow" />
                <strong>Chuyển khoản</strong>
              </CardHeader>
              <CardBody>
                <Form>
                  {/* xác nhận gửi liên ngân hàng hoặc nội bộ */}
                  <FormGroup className="">
                    <Row>
                      <Col xs="6" md="6">
                        <Input
                          type="select"
                          name="selectLg"
                          id="selectLg"
                          style={{ textJustify: 'right' }}
                          onChange={(e) =>
                            this.setState({ partnerCode: e.target.value })
                          }
                          disabled={this.state.switchPartnerBank === false}
                        >
                          <option value="0" disabled>
                            Chọn ngân hàng liên kết
                          </option>
                          <option value="PPNBank">PPN Bank</option>
                          <option value="tckbank">TCK Bank</option>
                        </Input>
                      </Col>
                      <Col style={{ alignSelf: 'center' }}>
                        <div className="custom-control custom-switch">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitchesChecked"
                            onChange={(e) =>
                              this.handleSwitchChange(e.target.checked)
                            }
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customSwitchesChecked"
                          >
                            Liên ngân hàng
                          </label>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="checkingAccountNumber">Họ và tên</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="accountNumber"
                        name="checkingAccountNumber"
                        value={this.props.name}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  {/* số tài khoản thanh toán của bạn */}
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="checkingAccountNumber">STK của bạn</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="accountNumber"
                        name="checkingAccountNumber"
                        value={this.props.checkingAccountNumber}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="checkingAccountNumber">
                        Số dư hiện tại
                      </Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="accountNumber"
                        name="checkingAccountNumber"
                        value={amountCheckingAccount + ' đồng'}
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
                          value={this.state.accountNumberReceiver}
                          onChange={(e) => {
                            this.setState({
                              accountNumberReceiver: e.target.value,
                              nameReceiver: '',
                            });
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          <Button
                            onClick={this.handleCommitAccountNumber}
                            color="primary"
                          >
                            <i
                              className={`fa fa-refresh ${
                                this.state.loadingBankDetail ? 'fa-spin' : ''
                              }`}
                              style={{ color: 'white' }}
                            />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/* kết quả trả về khi nhập stk người nhận */}
                  <Collapse isOpen={this.state.collapse}>
                    <FormGroup
                      className={{ 'd-none': !this.state.errorTransfer }}
                      row
                    >
                      <Col md="4" />
                      <Col xs="12" md="8">
                        <label style={{ color: 'red' }}>
                          {this.state.errorTransfer}
                        </label>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="4" style={{ alignSelf: 'center' }}>
                        <Label htmlFor="nameReceiver">Tên người nhận</Label>
                      </Col>
                      <Col xs="12" md="8">
                        <Input
                          type="text"
                          id="nameReceiver"
                          name="nameReceiver"
                          value={this.state.nameReceiver}
                          disabled
                        />
                      </Col>
                    </FormGroup>
                  </Collapse>
                  {/* số tiền cần chuyển */}
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="amount">Số tiền gửi</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="number"
                        id="amount"
                        name="amount"
                        value={this.state.transferAmount}
                        onChange={(e) =>
                          this.setState({ transferAmount: e.target.value })
                        }
                      />
                    </Col>
                  </FormGroup>
                  {/* nội dung chuyển tiền */}
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="contentTransfer">
                        Nội dung chuyển tiền
                      </Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="textarea"
                        name="contentTransfer"
                        id="textarea-input"
                        rows="3"
                        style={{ minHeight: '40px', maxHeight: '100px' }}
                        placeholder="Nội dung..."
                        value={this.state.contentTransfer}
                        onChange={(e) =>
                          this.setState({ contentTransfer: e.target.value })
                        }
                      />
                    </Col>
                  </FormGroup>
                  {/* hình thức trả phí */}
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="typePay">Hình thức trả phí</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="select"
                        name="typePay"
                        id="typePay"
                        onChange={(e) =>
                          this.setState({ payFee: e.target.value })
                        }
                        value={this.state.payFee}
                      >
                        <option value="0" disabled>
                          Chọn hình thức trả phí
                        </option>
                        <option value="transferer">Người gửi</option>
                        <option value="receiver">Người nhận</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  style={{ marginRight: '15px' }}
                  type="submit"
                  onClick={this.transfering}
                >
                  Chuyển tiền
                </Button>
                <Button color="warning" onClick={this.reset}>
                  Đặt lại
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggleSmall}
                  className="modal-sm"
                >
                  <ModalHeader toggle={this.toggleSmall}>Xác nhận</ModalHeader>
                  <ModalBody>
                    <Label>
                      Vui lòng kiểm tra email và nhập mã code được gủi tại đây
                      để hoàn tất chuyển khoản.
                    </Label>
                    <Input
                      type="text"
                      placeholder="Nhập mã OTP code trong email"
                      name="otp"
                      onChange={(e) => {
                        this.setState({
                          otp: e.target.value,
                        });
                      }}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.confirmTransfer}>
                      Xác nhận
                      {this.state.loadingTransfer && (
                        <i
                          className="fa fa-spinner fa-spin ml-1"
                          aria-hidden="true"
                        />
                      )}
                    </Button>{' '}
                    <Button color="secondary" onClick={this.toggleSmall}>
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
                <Form>
                  <FormGroup row>
                    <Col md="3" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="nameReceiverOfList">Tên người nhận</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <span>
                        <Input
                          type="text"
                          id="nameReceiverOfList"
                          name="name"
                          value={newReceiver.name}
                          placeholder="Nhập tên thay thế..."
                          onChange={this.onChange}
                        />
                        <Tooltip
                          placement="top"
                          isOpen={this.state.tooltipOpen[0]}
                          target="nameReceiverOfList"
                          toggle={() => {
                            this.toggle(0);
                          }}
                        >
                          Đặt tên thay thế hoặc để trống (mặc định là tên chủ
                          tài khoản)!
                        </Tooltip>
                      </span>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="numberReceiverOfList">Số tài khoản</Label>
                    </Col>
                    <Col xs="12" md="6">
                      <Input
                        type="text"
                        id="numberReceiverOfList"
                        name="accountNumber"
                        value={newReceiver.accountNumber}
                        placeholder="Nhập số tài khoản..."
                        onChange={this.onChange}
                      />
                    </Col>
                  </FormGroup>
                  <Button
                    color="primary"
                    key="btnAdd"
                    style={{ marginRight: '15px', width: ' 90px' }}
                    onClick={this.addReceiver}
                  >
                    <i className="fa fa-plus" /> Thêm
                  </Button>
                  <Button
                    color="primary"
                    key="btnSave"
                    style={{ marginRight: '15px', width: ' 90px' }}
                    onClick={this.editReceiver}
                  >
                    <i className="fa fa-save" /> Lưu
                  </Button>
                </Form>
                <hr
                  style={{
                    color: 'grey',
                    height: 2,
                  }}
                />
                <CDataTable
                  items={listReceivers}
                  tableFilter
                  itemsPerPage={8}
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
                            style={{ width: '100px' }}
                          >
                            <Button
                              size="sm"
                              color="danger"
                              className="btn-pill"
                              style={{ marginRight: '5px' }}
                              onClick={(e) => {
                                const accessToken = localStorage.getItem(
                                  'accessToken'
                                );
                                var { listReceivers } = this.props;
                                listReceivers.splice(parseInt(item.id) - 1, 1);
                                const { updateListReceivers } = this.props;
                                alert('Xóa thành công');

                                updateListReceivers(listReceivers, accessToken);
                              }}
                            >
                              <i className="fa fa-trash-o" />
                            </Button>
                            <Button
                              size="sm"
                              color="success"
                              className="btn-pill"
                              style={{ marginRight: '5px' }}
                              onClick={(e) => {
                                this.setState({
                                  newReceiver: {
                                    name: item.name,
                                    accountNumber: item.accountNumber,
                                  },
                                  index: index,
                                });
                              }}
                            >
                              <i className="fa fa-pencil" />
                            </Button>
                            <Button
                              size="sm"
                              color="primary"
                              className="btn-pill"
                              onClick={(e) => {
                                this.setState({
                                  nameReceiver: item.name,
                                  accountNumberReceiver: item.accountNumber,
                                });
                              }}
                            >
                              <i className="fa fa-ticket" />
                            </Button>
                          </Row>
                        </td>
                      );
                    },
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listReceivers: state.transferCustomer.listReceivers,
    checkingAccountNumber: state.transferCustomer.checkingAccountNumber,
    amountCheckingAccount: state.transferCustomer.amountCheckingAccount,
    name: state.transferCustomer.name,
    email: state.transferCustomer.email,
    username: state.transferCustomer.username,
  };
};

const actionCreators = {
  getListReceivers: transferCustomerActions.getListReceivers,
  updateListReceivers: transferCustomerActions.updateListReceivers,

  // requestResetPassword: memberActions.requestResetPassword
};

export default connect(mapStateToProps, actionCreators)(Transfer);
