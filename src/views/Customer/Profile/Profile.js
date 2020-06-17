/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
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
      paginationDetail: {
        pageSize: 10,
        pagesCount: Math.ceil(accountData.length / 10),
        currentPage: 1,
        indexPage: 2,
      },
    };
  }
  handleUpdate = (e) => {
    e.preventDefault();
  };
  //hàm khi click phân trang
  handleClick = async (e, index) => {
    e.preventDefault();
    console.log(this.state.paginationDetail.pagesCount);
    await this.setState({
      paginationDetail: { ...this.state.paginationDetail, currentPage: index },
    });
    if (index > 1 && index <= this.state.paginationDetail.pagesCount - 1)
      await this.setState({
        paginationDetail: { ...this.state.paginationDetail, indexPage: index },
      });
  };
  render() {
    const { userDetails } = this.state;
    const {
      currentPage,
      indexPage,
      pagesCount,
      pageSize,
    } = this.state.paginationDetail;
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
                    username
                  </strong>
                </div>
              </CardHeader>
              <CardBody>
                {/*thông tin cá nhân*/}
                <Form onSubmit={this.handleUpdate}>
                  <ListGroup flush>
                    <ListGroupItem className="">
                      <strong className="text-muted d-block mb-2">
                        Họ và tên
                      </strong>
                      <Input
                        type="text"
                        placeholder="Họ và tên"
                        //autoComplete="username"
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
                        //autoComplete="username"
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
                        placeholder="Số điện thoại"
                        //autoComplete="username"
                        name="phone"
                        autoFocus
                        onChange={(event) => {
                          // this.setState({ err: '' });
                          // this.setState({ username: event.target.value });
                        }}
                      />
                    </ListGroupItem>
                    <Col xs="6" className="text-left">
                      <Button onClick={() => {}} color="link" className="px-1">
                        Reset mật khẩu
                      </Button>
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
                {/*table thông tin tài khoản ngân hàng */}
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Số tài khoản</th>
                      <th scope="col">Số tiền</th>
                      <th scope="col">type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountData
                      .slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )
                      .map((item, index) => (
                        <tr key={item.id.toString()}>
                          <th scope="row">{item.id}</th>
                          <td>{item.accountNumber}</td>
                          <td>{item.amount}</td>
                          <td>{item.role}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              
                {/*phân trang  */}
                <Pagination>
                  <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink
                      previous
                      tag="button"
                      onClick={(e) => this.handleClick(e, indexPage - 1)}
                    />
                  </PaginationItem>
                  <PaginationItem active={currentPage === 1}>
                    <PaginationLink
                      onClick={(e) => this.handleClick(e, indexPage - 1)}
                    >
                      {indexPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem
                    active={currentPage !== 1 && currentPage !== pagesCount}
                  >
                    <PaginationLink
                      tag="button"
                      onClick={(e) => this.handleClick(e, indexPage)}
                    >
                      {indexPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active={currentPage === pagesCount}>
                    <PaginationLink
                      tag="button"
                      onClick={(e) => this.handleClick(e, indexPage + 1)}
                    >
                      {indexPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={currentPage >= pagesCount}>
                    <PaginationLink
                      next
                      tag="button"
                      onClick={(e) => this.handleClick(e, currentPage + 1)}
                    />
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
