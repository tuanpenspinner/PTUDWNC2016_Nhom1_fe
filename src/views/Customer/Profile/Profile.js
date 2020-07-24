import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  Button,
  Card,
  CardBody,
  ListGroup,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  CardHeader,
  ListGroupItem,
} from 'reactstrap';

import CDataTable from '../../components/table/CDataTable';
import { profileCustomerActions } from '../../../actions/customer/profile.action';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: require('../../../assets/img/brand/user.png'),
      nameCustomer: '',
    };
  }
  UNSAFE_componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const { saveProfile } = this.props;
    saveProfile(accessToken);
  }
  handleUpdate = (e) => {
    e.preventDefault();
  };
  changeNameCustomer = async () => {
    const { nameCustomer } = this.state;
    const accessToken = localStorage.getItem('accessToken');
    const { username } = this.props;
    const ret = await axios.post(
      'http://localhost:3001/customers/updateNameCustomer',

      {
        username,
        name: nameCustomer,
      },
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      }
    );
    if (ret.data.status) {
      const { saveProfile } = this.props;
      saveProfile(accessToken);
      alert('Đổi tên thành công');
    } else alert('Đổi tên thất bại');
  };

  render() {
    const { avatar, nameCustomer } = this.state;

    const {
      username,
      name,
      phone,
      email,
      checkingAccount,
      savingsAccount,
    } = this.props;
    var usersData = [];
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace('.', c) : num).replace(
        new RegExp(re, 'g'),
        '$&' + (s || ',')
      );
    };

    var checkingAcc = {
      id: 0,
      accountNumber: checkingAccount.accountNumber,
      amount: parseInt(checkingAccount.amount).format(0, 3, '.', ',') + ' đồng',
      type: 'Tài khoản thanh toán',
    };
    usersData.push(checkingAcc);
    if (savingsAccount.length > 0)
      for (let i = 0; i < savingsAccount.length; i++) {
        usersData.push({
          id: i + 1,
          accountNumber: savingsAccount[i].accountNumber,
          amount:
            parseInt(savingsAccount[i].amount).format(0, 3, '.', ',') + ' đồng',
          type: 'Tài khoản tiết kiệm',
        });
      }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="4">
            <Card small className="">
              <CardHeader
                className="border-bottom text-center"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div>
                  <img className="rounded-circle" src={avatar} width="100" />
                </div>
                <div style={{}}>
                  <strong className="text-muted" style={{}}>
                    {username}
                  </strong>
                </div>
              </CardHeader>
              <CardBody>
                {/* thông tin cá nhân */}
                <Form onSubmit={this.handleUpdate}>
                  <ListGroup flush>
                    <ListGroupItem className="">
                      <strong className="text-muted d-block mb-2">
                        Họ và tên
                      </strong>
                      <Input
                        type="text"
                        placeholder="Họ và tên"
                        defaultValue={name}
                        // autoComplete="username"
                        name="nameCustomer"
                        autoFocus
                        onChange={(event) => {
                          // this.setState({ err: '' });
                          this.setState({ nameCustomer: event.target.value });
                        }}
                      />
                    </ListGroupItem>
                    <ListGroupItem className="">
                      <strong className="text-muted d-block mb-2">Email</strong>
                      <Input
                        type="text"
                        placeholder="Email"
                        defaultValue={email}
                        // autoComplete="username"
                        name="email"
                        disabled
                        autoFocus
                        onChange={(event) => {
                          // this.setState({ err: '' });
                          // this.setState({ username: event.target.value });
                        }}
                      />
                    </ListGroupItem>
                    <ListGroupItem className="">
                      <strong className="text-muted d-block mb-2">
                        Số điện thoại
                      </strong>
                      <Input
                        type="text"
                        defaultValue={phone}
                        disabled
                        placeholder="Số điện thoại"
                        // autoComplete="username"
                        name="phone"
                        autoFocus
                        onChange={(event) => {
                          // this.setState({ err: '' });
                          // this.setState({ username: event.target.value });
                        }}
                      />
                    </ListGroupItem>
                    <Col xs="6" className="text-left">
                      <Link to="/change-password">
                        <Button color="link" className="px-1">
                          Đổi mật khẩu
                        </Button>
                      </Link>
                    </Col>
                    <Button
                      style={{ marginTop: '10px' }}
                      type="submit"
                      color="primary"
                      onClick={this.changeNameCustomer}
                    >
                      Update Account
                    </Button>
                  </ListGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" lg="8">
            <Card small className="">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Thông tin tài khoản</h6>
              </CardHeader>
              <CardBody>
                {/* table thông tin tài khoản ngân hàng */}
                <CDataTable
                  items={usersData}
                  itemsPerPage={10}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '1%' } },
                    {
                      key: 'accountNumber',
                      label: 'Số tài khoản',
                      _style: { width: '35%' },
                    },
                    { key: 'amount', label: 'Số tiền' },
                    {
                      key: 'type',
                      label: 'Loại tài khoản',
                      _style: { width: '20%' },
                    },
                  ]}
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
    username: state.profileCustomer.username,
    name: state.profileCustomer.name,
    email: state.profileCustomer.email,
    phone: state.profileCustomer.phone,
    checkingAccount: state.profileCustomer.checkingAccount,
    savingsAccount: state.profileCustomer.savingsAccount,
  };
};

const actionCreators = {
  saveProfile: profileCustomerActions.saveProfile,
  // requestResetPassword: memberActions.requestResetPassword
};

export default connect(mapStateToProps, actionCreators)(Profile);
// export default Login;
