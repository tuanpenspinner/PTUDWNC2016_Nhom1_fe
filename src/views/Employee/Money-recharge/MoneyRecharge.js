/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
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
  Alert,
  Row,
  FormGroup,
  CardHeader,
  Toast,
  ToastBody,
  ToastHeader,
  CardFooter,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { manageCustomersActions } from '../../../actions/employee/manageCustomers';
import CDataTable from '../../components/table/CDataTable';

const usersData = [
  {
    id: 1,
    username: 'cus001',
    name: 'hoàng thị cát uyên',
    email: 'hoanguyen234@gmail.com',
    phone: '02124324134234',
    checkingAccount: { accountNumber: '23423432', amount: '23423' },
    savingsAccount: [
      { accountNumber: '14323', amount: '234234' },
      { accountNumber: '55555', amount: '6666' },
    ],
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
// eslint-disable-next-line consistent-return

class MoneyRecharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      name: '',
      username: '',
      email: '',
      amount: '',
      modal: false,
      type: '',
      err: '',
      visible: false, //state hide/show alert
      colorAlert: '',
      contentAlertAfterRecharge: '',
    };
    this.toggleSmall = this.toggleSmall.bind(this);
  }
  componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const { getAllAccounts } = this.props;
    getAllAccounts(accessToken);
  }
  // eslint-disable-next-line consistent-return
  parseData = (data) => {
    let resParse = [];
    if (Array.isArray(data) && data.length > 0) {
      let _id = 1;
      // eslint-disable-next-line array-callback-return
      data.map((item, index) => {
        resParse = [
          ...resParse,
          {
            id: _id++,
            username: item.username,
            accountNumber: item.checkingAccount.accountNumber,
            type: 'thanh toán',
          },
        ];

        if (item.savingsAccount.length > 0)
          item.savingsAccount.map((i) => {
            const x = {
              id: _id++,
              username: item.username,
              accountNumber: i.accountNumber,
              type: 'tiết kiệm',
            };
            resParse = [...resParse, x];
          });
      });
    } else {
      return resParse;
    }
    return resParse;
  };
  toggleSmall = async (e) => {
    await this.setState({
      modal: !this.state.modal,
    });
  };

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 3000);
    });
  };

  // hàm xác nhận nạp tiền trên modal
  comfirmRecharge = async (e) => {
    this.toggleSmall();
    const accessToken = localStorage.getItem('accessToken');
    const { rechargeMoney } = this.props;
    await rechargeMoney(
      accessToken,
      this.state.username,
      this.state.accountNumber,
      this.state.amount,
      this.state.type
    );
    const { resultRechargeMoney } = this.props;
    if (resultRechargeMoney === 'success') {
      this.setState({
        colorAlert: '#dff2e3',
        contentAlertAfterRecharge: 'Nạp tiền thành công!',
        name: '',
        username: '',
        email: '',
        accountNumber: '',
        amount: '',
      });
    } else {
      this.setState({
        colorAlert: '#fae1e3',
        contentAlertAfterRecharge: 'Có lỗi xảy ra. Vui lòng thực hiện lại!',
      });
    }
    this.onShowAlert();
  };
  handleClickSenderIcon = (data) => {
    const { allAccounts } = this.props;
    const result = allAccounts.filter(
      (item) => data.username === item.username
    )[0];

    this.setState({
      err: '',
      name: result.name,
      username: result.username,
      email: result.email,
      accountNumber: data.accountNumber,
    });
    if (data.type === 'thanh toán') this.setState({ type: 'checking' });
    else this.setState({ type: 'saving' });
  };
  render() {
    const { allAccounts } = this.props;
    const {
      username,
      name,
      email,
      accountNumber,
      amount,
      err,
      type,
    } = this.state;
    const data = this.parseData(allAccounts);
    return (
      <div className="animated fadeIn">
        <Row style={{ position: '' }}>
          <Col xs="12" xl="5">
            <Card>
              <CardHeader>
                <i className="fa fa-location-arrow" />
                <strong>Nạp tiền</strong>
              </CardHeader>
              <CardBody>
                <Form>
                  {/* số tài khoản của bạn */}
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="accountNumber">STK của bạn</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={accountNumber}
                        placeholder="Số tài khoản nạp tiền"
                        readOnly
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="username">Tên đăng nhập</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        placeholder="Tên đăng nhập..."
                        readOnly
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="name">Họ và tên</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        readOnly
                        placeholder="Họ và tên..."
                        value={name}
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
                        value={email}
                        placeholder="Email tài khoản..."
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                  {/* số tiền cần chuyển */}
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="amount">Số tiền nạp vào</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) =>
                          this.setState({ amount: e.target.value, err: '' })
                        }
                        placeholder="Nhập số tiền nạp vào tài khoản..."
                      />
                    </Col>
                  </FormGroup>
                  <div>
                    <p style={{ color: 'red' }}>{err}</p>
                  </div>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  style={{ marginRight: '15px' }}
                  type="submit"
                  onClick={(e) => {
                    if (username === '') {
                      this.setState({
                        err: 'Vui lòng truy vấn tài khoản cần nạp để tiếp tục!',
                      });
                    } else if (amount === '') {
                      this.setState({ err: 'Vui lòng nhập số tiền cần nạp!' });
                    } else if (parseInt(amount, 10) <= 0) {
                      this.setState({
                        err: 'Số tiền nạp vào là số nguyên dương!',
                      });
                    } else {
                      this.toggleSmall();
                    }
                  }}
                >
                  Nạp tiền
                </Button>
                <Button
                  color="warning"
                  onClick={(e) => {
                    this.setState({
                      name: '',
                      username: '',
                      email: '',
                      accountNumber: '',
                      amount: '',
                      err: '',
                    });
                  }}
                >
                  Reset
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggleSmall}
                  className="modal-sm"
                >
                  <ModalHeader toggle={this.toggleSmall}>Xác nhận</ModalHeader>
                  <ModalBody>
                    <Label>
                      Bạn xác nhận nạp số tiền {amount} VND vào số tài khoản{' '}
                      {accountNumber}?
                    </Label>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.comfirmRecharge}>
                      Xác nhận
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
                <strong>Danh sách tài khoản khách hàng</strong>
              </CardHeader>
              <CardBody>
                <CDataTable
                  items={data}
                  columnFilter
                  itemsPerPage={8}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', filter: false },
                    {
                      key: 'username',
                      label: 'Tên đăng nhập',
                    },
                    {
                      key: 'accountNumber',
                      label: 'Số tài khoản',
                    },
                    {
                      key: 'type',
                      label: 'Loại tài khoản',

                      filter: false,
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
                          <Col className="text-center">
                            <Button
                              size="sm"
                              color="primary"
                              className="btn-pill"
                              onClick={(e) => {
                                this.handleClickSenderIcon(item);
                              }}
                            >
                              <i className="fa fa-credit-card" />
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
        <div style={{ position: '', marginTop: 0 }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: '5px',
              width: '300px',
            }}
          >
            <Toast isOpen={this.state.visible}>
              <ToastHeader toggle={(e) => this.setState({ visible: false })}>
                Thông báo
              </ToastHeader>
              <ToastBody style={{ backgroundColor: this.state.colorAlert }}>
                {this.state.contentAlertAfterRecharge}
              </ToastBody>
            </Toast>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allAccounts: state.manageCustomers.allAccounts,
    resultRechargeMoney: state.manageCustomers.resultRechargeMoney,
  };
};

const actionCreators = {
  getAllAccounts: manageCustomersActions.getListAccounts,
  rechargeMoney: manageCustomersActions.moneyRecharge,
};

export default connect(mapStateToProps, actionCreators)(MoneyRecharge);
