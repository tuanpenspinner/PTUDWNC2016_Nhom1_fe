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
    this.state = {
      activeTab: new Array(4).fill('1'),
      details: [],
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
                      return <td className="text-center">{index+1}</td>;
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
                <HistoryOfCustomer></HistoryOfCustomer>
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
  };
};

const actionCreators = {
  getAllAccounts: manageCustomersActions.getListAccounts,
};

export default connect(mapStateToProps, actionCreators)(CustomerManage);
