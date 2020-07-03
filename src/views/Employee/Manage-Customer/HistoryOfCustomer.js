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
    };
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
              name="name"
              autoFocus
              onChange={(event) => {}}
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                }}
                color="primary"
              >
                <i className="fa fa-search" style={{ color: 'white' }} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
        <Col>
          <TabContent activeTab={this.state.activeTabHistory}>
            <TabPane tabId={0}>
              <CDataTable
                items={usersData1}
                columnFilter
                itemsPerPage={5}
                hover
                sorter
                pagination
                fields={[
                  { key: 'id', _style: { width: '1%' } },
                  { key: 'name', label: 'Tên người gửi' },
                  { key: 'accountNumber', label: 'STK người gửi' },
                  { key: 'amount', label: 'Số tiền gửi' },
                  { key: 'date', label: 'Ngày giao dịch' },
                  {
                    key: 'typePay',
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
                          <p>Nội dung chuyển tiền: hiện ở đây</p>
                        </CardBody>
                      </Collapse>
                    );
                  },
                }}
              />
            </TabPane>
            <TabPane tabId={1}>
              <CDataTable
                items={usersData1}
                columnFilter
                itemsPerPage={5}
                hover
                sorter
                pagination
                fields={[
                  { key: 'id', _style: { width: '1%' } },
                  { key: 'name', label: 'Tên người nhận' },
                  { key: 'accountNumber', label: 'STK người nhận' },
                  { key: 'amount', label: 'Số tiền gửi' },
                  { key: 'date', label: 'Ngày giao dịch' },
                  {
                    key: 'typePay',
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
                          <p>Nội dung chuyển tiền: hiện ở đây</p>
                        </CardBody>
                      </Collapse>
                    );
                  },
                }}
              />
            </TabPane>
            <TabPane tabId={2}>
              <CDataTable
                items={usersData1}
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
                  { key: 'amount', label: 'Số tiền nợ' },
                  { key: 'date', label: 'Ngày thanh toán' },
                  { key: 'type', label: 'Nhắc nợ tạo bởi' }, //'chủ tài khoản' or 'người khác'
                  {
                    key: 'showdetail',
                    label: '',
                    _style: { width: '1%' },
                    sorter: false,
                    filter: false,
                  },
                ]}
                scopedSlots={{
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
                          <p>Nội dung chuyển tiền: hiện ở đây</p>
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
  return {};
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(HistoryOfCustomer);
