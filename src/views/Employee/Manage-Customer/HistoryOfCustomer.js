import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  TabPane,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  TabContent,
  Collapse,
  Label,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { connect } from 'react-redux';
import { manageCustomersActions } from '../../../actions/employee/manageCustomers';
import CDataTable from '../../components/table/CDataTable';
import usersData1 from '../../components/table/UsersData';
class HistoryOfCustomer extends Component {
  constructor(props) {
    super(props);

    this.toggleHistory = this.toggleHistory.bind(this);
    this.state = {
      activeTabHistory: 0,
      detailsHistory: [],
      usernameChose: '',
      historyReceive: [],
      historyTransfer: [],
      historyPayDebt: [],
      err: '',
    };
  }
  componentWillReceiveProps(next) {
    if (next.customerChose)
      this.setState({
        usernameChose: next.customerChose.username, //truyền username dược chọn từ tab list customers
      });
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
  //hàm truy vấn lịch sử giao dịch
  handleGetHistory = (username) => {
    const accessToken = localStorage.getItem('accessToken');
    const { getHistoryDeal, listAllCustomer } = this.props;
    const customer = listAllCustomer.filter(
      (element) => element.username === username
    )[0];
    if (customer) getHistoryDeal(accessToken, customer);
    else this.setState({ err: 'Tài khoản không tồn tại!' });
  };
  render() {
    return (
      <div className="d-flex flex-row">
        <Col md="3" style={{ minWidth: '200px' }}>
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
          <div style={{ margin: '5px' }}>
            <strong className="text-muted" style={{}}>
              Lịch sử giao dịch của username:
            </strong>
          </div>

          <InputGroup>
            <Input
              type="text"
              placeholder="Nhập username..."
              // autoComplete="username"
              value={this.state.usernameChose}
              name="name"
              onChange={(event) => {
                this.setState({ err: '' });
                this.setState({ usernameChose: event.target.value });
                console.log(this.state.usernameChose);
              }}
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  if (this.state.usernameChose !== '')
                    this.handleGetHistory(this.state.usernameChose);
                  else this.setState({ err: 'Vui lòng nhập username!' });
                }}
                color="primary"
              >
                <i className="fa fa-search" style={{ color: 'white' }} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div>
            <p style={{ color: 'red' }}>{this.state.err}</p>
          </div>
        </Col>
        <Col>
          <TabContent activeTab={this.state.activeTabHistory}>
            <TabPane tabId={0}>
              <CDataTable
                items={this.props.resultHistoryDeal.historyReceive}
                columnFilter
                itemsPerPage={5}
                hover
                sorter
                pagination
                fields={[
                  { key: 'id', _style: { width: '1%' } },
                  // { key: 'name', label: 'Tên người gửi' },
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
                      return <td>người gửi</td>;
                    else return <td>người nhận</td>;
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
                        isOpen={this.state.detailsHistory.includes(index)}
                      >
                        <CardBody>
                          <p>Nội dung chuyển tiền: {item.content}</p>
                        </CardBody>
                      </Collapse>
                    );
                  },
                }}
              />
            </TabPane>
            <TabPane tabId={1}>
              <CDataTable
                items={this.props.resultHistoryDeal.historyTransfer}
                columnFilter
                itemsPerPage={5}
                hover
                sorter
                pagination
                fields={[
                  { key: 'id', _style: { width: '1%' } },
                  // { key: 'name', label: 'Tên người nhận' },
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
                      return <td>người gửi</td>;
                    else return <td>người nhận</td>;
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
                        isOpen={this.state.detailsHistory.includes(index)}
                      >
                        <CardBody>
                          <p>Nội dung chuyển tiền: {item.content}</p>
                        </CardBody>
                      </Collapse>
                    );
                  },
                }}
              />
            </TabPane>
            <TabPane tabId={2}>
              <CDataTable
                items={this.props.resultHistoryDeal.historyPayDebt}
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
                      this.props.customerChose.checkingAccount.accountNumber
                    )
                      return <td>{item.nameDebtor}</td>;
                    else return <td>{item.nameCreator}</td>;
                  },
                  accountNumber: (item, index) => {
                    if (
                      item.creator ===
                      this.props.customerChose.checkingAccount.accountNumber
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
                      this.props.customerChose.checkingAccount.accountNumber
                    )
                      return <td>chủ tài khoản</td>;
                    else return <td>đối tác</td>;
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
                        isOpen={this.state.detailsHistory.includes(index)}
                      >
                        <CardBody>
                          <p>Nội dung chuyển tiền: {item.content}</p>
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    resultHistoryDeal: state.manageCustomers.resultHistoryDeal,
    customerChose: state.manageCustomers.customerChose,
    allAccounts: state.manageCustomers.allAccounts,
  };
};

const actionCreators = {
  getHistoryDeal: manageCustomersActions.getHistoryDeal,
};

export default connect(mapStateToProps, actionCreators)(HistoryOfCustomer);
