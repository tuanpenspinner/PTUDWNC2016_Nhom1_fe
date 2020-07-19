import React, { Component } from 'react';
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  CardBody,
  Col,
  Row,
  TabContent,
  Collapse,
} from 'reactstrap';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { manageCustomersActions } from '../../../actions/employee/manageCustomers';
import FormAddCustomer from './AddCustomer';
import HistoryOfCustomer from './HistoryOfCustomer';
import CDataTable from '../../components/table/CDataTable';
import usersData1 from '../../components/table/UsersData';

class CustomerManage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      details: [],
      customerChose: null,
    };
  }
  UNSAFE_componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const { getAllAccounts } = this.props;
    getAllAccounts(accessToken);
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

  // click chọn tab
  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    Number.prototype.format = function (n, x, s, c) {
      var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace('.', c) : num).replace(
        new RegExp(re, 'g'),
        '$&' + (s || ',')
      );
    };
    const showDetailAccount = (item) => {
      const savingsAccount = item.savingsAccount;
      const checkingAccount = item.checkingAccount;
      const showSavingAccount = savingsAccount.map((savingAccount) => {
        return (
          <p>
            + Số tài khoản: {savingAccount.accountNumber}
          
            &nbsp;&nbsp;&nbsp;&nbsp; Số dư: {  parseInt(savingAccount.amount).format(0, 3, '.', ',')} đồng
          </p>
        );
      });
      return (
        <div>
          <p>- Tài khoản thanh toán:</p>
          <p>
            + Số tài khoản: {checkingAccount.accountNumber}
            &nbsp;&nbsp;&nbsp;&nbsp; Số dư:{' '}
            {parseInt(checkingAccount.amount).format(0, 3, '.', ',')} đồng
          </p>
          <p>- Tài khoản tiết kiệm:</p>
          {showSavingAccount}
        </div>
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
                  items={this.props.allAccounts}
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
                    id: (item, index) => {
                      return <td className="text-center">{index + 1}</td>;
                    },
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
                                this.setState({ customerChose: item });
                                const accessToken = localStorage.getItem(
                                  'accessToken'
                                );
                                this.props.getHistoryDeal(accessToken, item);
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
                          <CardBody>{showDetailAccount(item)}</CardBody>
                        </Collapse>
                      );
                    },
                  }}
                />
              </TabPane>
              {/*tab content lịch sử giao dịch của 1 tài khoản */}
              <TabPane tabId="2">
                <HistoryOfCustomer
                  customer={this.state.customerChose}
                  listAllCustomer={this.props.allAccounts}
                ></HistoryOfCustomer>
              </TabPane>
              {/*tab content tạo tài khoản */}
              <TabPane tabId="3">
                <FormAddCustomer></FormAddCustomer>
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
    allAccounts: state.manageCustomers.allAccounts,
    resultHistoryDeal: state.manageCustomers.resultHistoryDeal,
  };
};

const actionCreators = {
  getAllAccounts: manageCustomersActions.getListAccounts,
  getHistoryDeal: manageCustomersActions.getHistoryDeal,
};

export default connect(mapStateToProps, actionCreators)(CustomerManage);
