import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
      userDetails: {
        name: 'Sierra Brooks',
        avatar: require('../../../assets/img/brand/user.png'),
        jobTitle: 'Project Manager',
        performanceReportTitle: 'Workload',
        performanceReportValue: 74,
        metaTitle: 'Description',
        metaValue:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?',
      },
    };
  }
  componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const { saveProfile } = this.props;
    saveProfile(accessToken);
  }
  handleUpdate = (e) => {
    e.preventDefault();
  };

  render() {
    const { userDetails } = this.state;
    const {
      username,
      name,
      phone,
      email,
      checkingAccount,
      savingsAccount,
    } = this.props;
    var usersData = [];
    var checkingAcc = {
      id: 0,
      accountNumber: checkingAccount.accountNumber,
      amount: checkingAccount.amount,
      type: 'Tài khoản thanh toán',
    };
    usersData.push(checkingAcc);
    if (savingsAccount.length > 0)
      for (let i = 0; i < savingsAccount.length; i++) {
        usersData.push({
          id: i + 1,
          accountNumber: savingsAccount[i].accountNumber,
          amount: savingsAccount[i].amount,
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
                  <img
                    className="rounded-circle"
                    src={userDetails.avatar}
                    alt={userDetails.name}
                    width="100"
                  />
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
                        value={name}
                        // autoComplete="username"
                        name="name"
                        autoFocus
                        onChange={(event) => {
                          // this.setState({ err: '' });
                          // this.setState({ username: event.target.value });
                        }}
                      />
                    </ListGroupItem>
                    <ListGroupItem className="">
                      <strong className="text-muted d-block mb-2">Email</strong>
                      <Input
                        type="text"
                        placeholder="Email"
                        value={email}
                        // autoComplete="username"
                        name="email"
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
                        value={phone}
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
                <h6 className="m-0">Account number</h6>
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
