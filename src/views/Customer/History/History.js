import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import CDataTable from '../../components/table/CDataTable';
import {
  historyDeal,
  historyDealCustomerActions,
} from '../../../actions/customer/historyDeal';
class History extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      details: [],
    };
  }
  componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const {
      getHistoryTransfer,
      getHistoryReceive,
      getHistoryPayDebt,
    } = this.props;
    getHistoryTransfer(accessToken);
    getHistoryReceive(accessToken);
    getHistoryPayDebt(accessToken);
  }
  //hàm xử lí hiện detail lịch sử giao diện
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
                  Lịch sử chuyển tiền
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  Lịch sử nhận tiền
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => {
                    this.toggle(0, '3');
                  }}
                >
                  Lịch sử thanh toán nhắc nợ
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {/*tab content lịch sử chuyển khoản */}
              <TabPane tabId="1">
                <CDataTable
                  items={this.props.historyTransfer}
                  columnFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '1%' } },
                    { key: 'receiverName', label: 'Tên người nhận' },
                    { key: 'receiverAccountNumber', label: 'STK người nhận' },
                    { key: 'amount', label: 'Số tiền gửi' },
                    { key: 'time', label: 'Ngày giao dịch' },
                    {
                      key: 'payFeeBy',
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
                    id: (item, index) => {
                      return <td className="text-center">{index + 1}</td>;
                    },
                    payFeeBy: (item, index) => {
                      if (item.payFeeBy === 'transferer')
                        return <td>Người gửi</td>;
                      else return <td>Người nhận</td>;
                    },
                    showdetail: (item, index) => {
                      return (
                        <td className="text-center">
                          <Button
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              this.toggleDetails(index);
                            }}
                          >
                            {this.state.details.includes(index)
                              ? 'Hide'
                              : 'Show'}
                          </Button>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <Collapse isOpen={this.state.details.includes(index)}>
                          <CardBody>
                            <p>Nội dung chuyển tiền: {item.content}</p>
                          </CardBody>
                        </Collapse>
                      );
                    },
                  }}
                />
              </TabPane>
              {/*tab content lịch sử nhận tiền */}
              <TabPane tabId="2">
                <CDataTable
                  items={this.props.historyReceive}
                  columnFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '1%' } },
                    { key: 'transfererName', label: 'Tên người gửi' },
                    { key: 'transfererAccountNumber', label: 'STK người gửi' },
                    { key: 'amount', label: 'Số tiền gửi' },
                    { key: 'time', label: 'Ngày giao dịch' },
                    {
                      key: 'payFeeBy',
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
                    id: (item, index) => {
                      return <td className="text-center">{index + 1}</td>;
                    },
                    payFeeBy: (item, index) => {
                      if (item.payFeeBy === 'transferer')
                        return <td>Người gửi</td>;
                      else return <td>Người nhận</td>;
                    },
                    showdetail: (item, index) => {
                      return (
                        <td className="text-center">
                          <Button
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              this.toggleDetails(index);
                            }}
                          >
                            {this.state.details.includes(index)
                              ? 'Hide'
                              : 'Show'}
                          </Button>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <Collapse isOpen={this.state.details.includes(index)}>
                          <CardBody>
                            <p>Nội dung chuyển tiền: {item.content}</p>
                          </CardBody>
                        </Collapse>
                      );
                    },
                  }}
                />
              </TabPane>
              {/*tab content lịch sử thanh toán nhắc nợ */}
              <TabPane tabId="3">
                <CDataTable
                  items={this.props.historyPayDebt}
                  columnFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '1%' } },
                    { key: 'name', label: 'Tên người trả/ được trả' },
                    {
                      key: 'accountNumber',
                      label: 'STK người trả/ được trả',
                    },
                    { key: 'debt', label: 'Số tiền nợ' },
                    { key: 'timePaid', label: 'Ngày thanh toán' },
                    { key: 'creator', label: 'Nhắc nợ tạo bởi' }, //'chủ tài khoản' or 'người khác'
                    {
                      key: 'showdetail',
                      label: '',
                      _style: { width: '1%' },
                      sorter: false,
                      filter: false,
                    },
                  ]}
                  scopedSlots={{
                    id: (item, index) => {
                      return <td className="text-center">{index + 1}</td>;
                    },
                    name: (item, index) => {
                      if (
                        item.creator ===
                        this.props.checkingAccount.accountNumber
                      )
                        return <td>{item.nameDebtor}</td>;
                      else return <td>{item.nameCreator}</td>;
                    },
                    accountNumber: (item, index) => {
                      if (
                        item.creator ===
                        this.props.checkingAccount.accountNumber
                      )
                        return <td>{item.debtor}</td>;
                      else return <td>{item.creator}</td>;
                    },
                    timePaid: (item, index) => {
                      return <td>{item.pay.timePay}</td>;
                    },
                    creator: (item, index) => {
                      if (
                        item.creator ===
                        this.props.checkingAccount.accountNumber
                      )
                        return <td>Tôi</td>;
                      else return <td>Người khác</td>;
                    },
                    showdetail: (item, index) => {
                      return (
                        <td className="text-center">
                          <Button
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              this.toggleDetails(index);
                            }}
                          >
                            {this.state.details.includes(index)
                              ? 'Hide'
                              : 'Show'}
                          </Button>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <Collapse isOpen={this.state.details.includes(index)}>
                          <CardBody>
                            <p>Nội dung chuyển tiền: {item.content}</p>
                          </CardBody>
                        </Collapse>
                      );
                    },
                  }}
                />
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
    historyTransfer: state.getHistoryDeal.historyTransfer,
    historyReceive: state.getHistoryDeal.historyReceive,
    historyPayDebt: state.getHistoryDeal.historyPayDebt,
    checkingAccount: state.profileCustomer.checkingAccount,
  };
};

const actionCreators = {
  getHistoryTransfer: historyDealCustomerActions.getHistoryTransfer,
  getHistoryReceive: historyDealCustomerActions.getHistoryReceive,
  getHistoryPayDebt: historyDealCustomerActions.getHistoryPayDebt,
};

export default connect(mapStateToProps, actionCreators)(History);
