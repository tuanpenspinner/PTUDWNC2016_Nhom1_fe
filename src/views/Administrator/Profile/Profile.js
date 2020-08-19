/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  ListGroup,
  Col,
  Row,
  Form,
  Input,
  CardHeader,
  ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      phone: '',
      avatar: require('../../../assets/img/brand/user.png'),
    };
  }
  componentWillMount = async () => {
    const info = JSON.parse(localStorage.getItem('info'));
    this.setState({
      username: info.username,
      name: info.name,
      email: info.email,
      phone: info.phone,
    });
  };
  handleUpdate = (e) => {
    e.preventDefault();
  };

  render() {
    const { name, avatar, username, email, phone } = this.state;

    return (
      <div className="animated fadeIn">
        <Row style={{ justifyContent: 'center' }}>
          <Col xl="6">
            <Card>
              <CardHeader
                className="border-bottom text-center"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div>
                  <img
                    className="rounded-circle"
                    src={avatar}
                    alt={name}
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
                        // autoComplete="username"
                        value={name}
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
                        name="email"
                        autoFocus
                        value={email}
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
                        value={phone}
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
                        <Button
                          onClick={() => {}}
                          color="link"
                          className="px-1"
                        >
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
        </Row>
      </div>
    );
  }
}

export default Profile;
