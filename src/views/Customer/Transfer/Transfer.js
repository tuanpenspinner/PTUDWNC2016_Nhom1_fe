/* eslint-disable lines-between-class-members */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
  Button,
  Card,
  Label,
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
  InputGroupAddon,
  Row,
  FormGroup,
  CardHeader,
  InputGroup,
} from 'reactstrap';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
const accountData = [
  { id: 0, accountNumber: 'John Doe', amount: '2018/01/01', role: 'Guest' },
  { id: 1, accountNumber: 'Samppa Nori', amount: '2018/01/01', role: 'Member' },
  {
    id: 2,
    accountNumber: 'Estavan Lykos',
    amount: '2018/02/01',
    role: 'Staff',
  },
  {
    id: 3,
    accountNumber: 'Chetan Mohamed',
    amount: '2018/02/01',
    role: 'Admin',
  },
  {
    id: 4,
    accountNumber: 'Derick Maximinus',
    amount: '2018/03/01',
    role: 'Member',
  },
  {
    id: 5,
    accountNumber: 'Friderik Dávid',
    amount: '2018/01/21',
    role: 'Staff',
  },
  {
    id: 6,
    accountNumber: 'Yiorgos Avraamu',
    amount: '2018/01/01',
    role: 'Member',
  },
  {
    id: 7,
    accountNumber: 'Avram Tarasios',
    amount: '2018/02/01',
    role: 'Staff',
  },
  { id: 8, accountNumber: 'Quintin Ed', amount: '2018/02/01', role: 'Admin' },
  {
    id: 9,
    accountNumber: 'Enéas Kwadwo',
    amount: '2018/03/01',
    role: 'Member',
  },
  {
    id: 10,
    accountNumber: 'Agapetus Tadeáš',
    amount: '2018/01/21',
    role: 'Staff',
  },
  {
    id: 11,
    accountNumber: 'Carwyn Fachtna',
    amount: '2018/01/01',
    role: 'Member',
  },
  {
    id: 12,
    accountNumber: 'Nehemiah Tatius',
    amount: '2018/02/01',
    role: 'Staff',
  },
  {
    id: 13,
    accountNumber: 'Ebbe Gemariah',
    amount: '2018/02/01',
    role: 'Admin',
  },
  {
    id: 14,
    accountNumber: 'Eustorgios Amulius',
    amount: '2018/03/01',
    role: 'Member',
  },
  {
    id: 15,
    accountNumber: 'Leopold Gáspár',
    amount: '2018/01/21',
    role: 'Staff',
  },
  {
    id: 16,
    accountNumber: 'Pompeius René',
    amount: '2018/01/01',
    role: 'Member',
  },
  { id: 17, accountNumber: 'Paĉjo Jadon', amount: '2018/02/01', role: 'Staff' },
  {
    id: 18,
    accountNumber: 'Micheal Mercurius',
    amount: '2018/02/01',
    role: 'Admin',
  },
  {
    id: 19,
    accountNumber: 'Ganesha Dubhghall',
    amount: '2018/03/01',
    role: 'Member',
  },
  {
    id: 20,
    accountNumber: 'Hiroto Šimun',
    amount: '2018/01/21',
    role: 'Staff',
  },
  {
    id: 21,
    accountNumber: 'Vishnu Serghei',
    amount: '2018/01/01',
    role: 'Member',
  },
  {
    id: 22,
    accountNumber: 'Zbyněk Phoibos',
    amount: '2018/02/01',
    role: 'Staff',
  },
  {
    id: 23,
    accountNumber: 'Einar Randall',
    amount: '2018/02/01',
    role: 'Admin',
  },
  {
    id: 24,
    accountNumber: 'Félix Troels',
    amount: '2018/03/21',
    role: 'Staff',
  },
  {
    id: 25,
    accountNumber: 'Aulus Agmundr',
    amount: '2018/01/01',
    role: 'Member',
  },
  { id: 0, accountNumber: 'John Doe', amount: '2018/01/01', role: 'Guest' },
  { id: 1, accountNumber: 'Samppa Nori', amount: '2018/01/01', role: 'Member' },
  {
    id: 2,
    accountNumber: 'Estavan Lykos',
    amount: '2018/02/01',
    role: 'Staff',
  },
  {
    id: 3,
    accountNumber: 'Chetan Mohamed',
    amount: '2018/02/01',
    role: 'Admin',
  },
  {
    id: 4,
    accountNumber: 'Derick Maximinus',
    amount: '2018/03/01',
    role: 'Member',
  },
  {
    id: 5,
    accountNumber: 'Friderik Dávid',
    amount: '2018/01/21',
    role: 'Staff',
  },
  {
    id: 6,
    accountNumber: 'Yiorgos Avraamu',
    amount: '2018/01/01',
    role: 'Member',
  },
  {
    id: 7,
    accountNumber: 'Avram Tarasios',
    amount: '2018/02/01',
    role: 'Staff',
  },
  { id: 8, accountNumber: 'Quintin Ed', amount: '2018/02/01', role: 'Admin' },
  {
    id: 9,
    accountNumber: 'Enéas Kwadwo',
    amount: '2018/03/01',
    role: 'Member',
  },
  {
    id: 10,
    accountNumber: 'Agapetus Tadeáš',
    amount: '2018/01/21',
    role: 'Staff',
  },
  {
    id: 11,
    accountNumber: 'Carwyn Fachtna',
    amount: '2018/01/01',
    role: 'Member',
  },
  {
    id: 12,
    accountNumber: 'Nehemiah Tatius',
    amount: '2018/02/01',
    role: 'Staff',
  },
  {
    id: 13,
    accountNumber: 'Ebbe Gemariah',
    amount: '2018/02/01',
    role: 'Admin',
  },
  {
    id: 14,
    accountNumber: 'Eustorgios Amulius',
    amount: '2018/03/01',
    role: 'Member',
  },
  {
    id: 15,
    accountNumber: 'Leopold Gáspár',
    amount: '2018/01/21',
    role: 'Staff',
  },
  {
    id: 16,
    accountNumber: 'Pompeius René',
    amount: '2018/01/01',
    role: 'Member',
  },
  { id: 17, accountNumber: 'Paĉjo Jadon', amount: '2018/02/01', role: 'Staff' },
  {
    id: 18,
    accountNumber: 'Micheal Mercurius',
    amount: '2018/02/01',
    role: 'Admin',
  },
  {
    id: 19,
    accountNumber: 'Ganesha Dubhghall',
    amount: '2018/03/01',
    role: 'Member',
  },
  {
    id: 20,
    accountNumber: 'Hiroto Šimun',
    amount: '2018/01/21',
    role: 'Staff',
  },
  {
    id: 21,
    accountNumber: 'Vishnu Serghei',
    amount: '2018/01/01',
    role: 'Member',
  },
  {
    id: 22,
    accountNumber: 'Zbyněk Phoibos',
    amount: '2018/02/01',
    role: 'Staff',
  },
  {
    id: 23,
    accountNumber: 'Einar Randall',
    amount: '2018/02/01',
    role: 'Admin',
  },
];
class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchBankCode: false,
    };
  }
  handleSwitchChange = async (ischecked) => {
    await this.setState({ switchBankCode: ischecked });
  };
  handleCommitAccountNumber = (e) =>{
    e.preventDefault();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-location-arrow"></i>
                <strong>Chuyển khoản</strong>
              </CardHeader>
              <CardBody>
                <Form>
                  {/*xác nhận gửi liên ngân hàng hoặc nội bộ */}
                  <FormGroup className="">
                    <Row>
                      <Col xs="6" md="6">
                        <Input
                          type="select"
                          name="selectLg"
                          id="selectLg"
                          style={{ textJustify: 'right' }}
                          disabled={this.state.switchBankCode === false}
                        >
                          <option value="0">Chọn ngân hàng liên kết</option>
                          <option value="1">Option #1</option>
                          <option value="2">Option #2</option>
                          <option value="3">Option #3</option>
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
                  {/*số tài khoản thanh toán của bạn */}
                  <FormGroup row>
                    <Col md="3" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="checkingAccountNumber">STK của bạn</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="accountNumber"
                        name="checkingAccountNumber"
                        value="adfwetfwegggggggwagr"
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  {/*số tài khoản thanh toán của người nhận */}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="contentTransfer">
                        STK người nhận
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <InputGroup>
                        <Input placeholder="Số tài khoản thanh toán của người nhận..."/>
                        <InputGroupAddon addonType="append">
                          <Button onClick={this.handleCommitAccountNumber}>hehe</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  {/*số tiền cần chuyển */}
                  <FormGroup row>
                    <Col md="3" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="disabled-input">Số tiền gửi</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="number"
                        id="amount"
                        name="amount"
                        value="1000000"
                      />
                    </Col>
                  </FormGroup>
                  {/*nội dung chuyển tiền */}
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="contentTransfer">
                        Nội dung chuyển tiền
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="textarea"
                        name="contentTransfer"
                        id="textarea-input"
                        rows="3"
                        style={{ minHeight: '40px' }}
                        placeholder="Nội dung..."
                      />
                    </Col>
                  </FormGroup>
               </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-address-card-o"></i>
                <strong>Danh sách người nhận</strong>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>Lịch sử giao dịch</CardHeader>
              <CardBody>
                <Table
                  hover
                  responsive
                  className="table-outline mb-0 d-sm-table"
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">
                        <i className="icon-people"></i>
                      </th>
                      <th>User</th>
                      <th className="text-center">Country</th>
                      <th>Usage</th>
                      <th className="text-center">Payment Method</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src="assets/img/avatars/1.jpg"
                            className="img-avatar"
                            alt="admin@bootstrapmaster.com"
                          />
                          <span className="avatar-status badge-success"></span>
                        </div>
                      </td>
                      <td>
                        <div>Yiorgos Avraamu</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="flag-icon flag-icon-us h4 mb-0"
                          title="us"
                          id="us"
                        ></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>50%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Jun 11, 2015 - Jul 10, 2015
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="fa fa-cc-mastercard"
                          style={{ fontSize: `${24}px` }}
                        ></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>10 sec ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src="assets/img/avatars/2.jpg"
                            className="img-avatar"
                            alt="admin@bootstrapmaster.com"
                          />
                          <span className="avatar-status badge-danger"></span>
                        </div>
                      </td>
                      <td>
                        <div>Avram Tarasios</div>
                        <div className="small text-muted">
                          <span>Recurring</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="flag-icon flag-icon-br h4 mb-0"
                          title="br"
                          id="br"
                        ></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>10%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Jun 11, 2015 - Jul 10, 2015
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="fa fa-cc-visa"
                          style={{ fontSize: `${24}px` }}
                        ></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>5 minutes ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src="assets/img/avatars/3.jpg"
                            className="img-avatar"
                            alt="admin@bootstrapmaster.com"
                          />
                          <span className="avatar-status badge-warning"></span>
                        </div>
                      </td>
                      <td>
                        <div>Quintin Ed</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="flag-icon flag-icon-in h4 mb-0"
                          title="in"
                          id="in"
                        ></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>74%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Jun 11, 2015 - Jul 10, 2015
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="fa fa-cc-stripe"
                          style={{ fontSize: `${24}px` }}
                        ></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>1 hour ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src="assets/img/avatars/4.jpg"
                            className="img-avatar"
                            alt="admin@bootstrapmaster.com"
                          />
                          <span className="avatar-status badge-secondary"></span>
                        </div>
                      </td>
                      <td>
                        <div>Enéas Kwadwo</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="flag-icon flag-icon-fr h4 mb-0"
                          title="fr"
                          id="fr"
                        ></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>98%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Jun 11, 2015 - Jul 10, 2015
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="fa fa-paypal"
                          style={{ fontSize: `${24}px` }}
                        ></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last month</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src="assets/img/avatars/5.jpg"
                            className="img-avatar"
                            alt="admin@bootstrapmaster.com"
                          />
                          <span className="avatar-status badge-success"></span>
                        </div>
                      </td>
                      <td>
                        <div>Agapetus Tadeáš</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="flag-icon flag-icon-es h4 mb-0"
                          title="es"
                          id="es"
                        ></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>22%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Jun 11, 2015 - Jul 10, 2015
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="fa fa-google-wallet"
                          style={{ fontSize: `${24}px` }}
                        ></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last week</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img
                            src="assets/img/avatars/6.jpg"
                            className="img-avatar"
                            alt="admin@bootstrapmaster.com"
                          />
                          <span className="avatar-status badge-danger"></span>
                        </div>
                      </td>
                      <td>
                        <div>Friderik Dávid</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="flag-icon flag-icon-pl h4 mb-0"
                          title="pl"
                          id="pl"
                        ></i>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>43%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">
                              Jun 11, 2015 - Jul 10, 2015
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <i
                          className="fa fa-cc-amex"
                          style={{ fontSize: `${24}px` }}
                        ></i>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Yesterday</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Transfer;
