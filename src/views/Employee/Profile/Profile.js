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
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { profileEmployeeActions } from '../../../actions/employee/profile.action';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Sierra Brooks',
      // username: '',
      // phone: '',
      // email: '',
      // eslint-disable-next-line global-require
      avatar: require('../../../assets/img/brand/user.png'),
    };
  }
  componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    console.log("-----------"+accessToken);
    const { saveProfile } = this.props;
    saveProfile(accessToken);
  }
  handleUpdate = (e) => {
    e.preventDefault();
  };

  render() {
    const { avatar } = this.state;
    const { username, name, phone, email } = this.props;
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
                    //alt={name}
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
                        name="name"
                        autoFocus
                        value={name}
                        onChange={(event) => {
                          this.setState({ err: '' });
                          //this.setState({ name: event.target.value });
                        }}
                      />
                    </ListGroupItem>
                    <ListGroupItem className="">
                      <strong className="text-muted d-block mb-2">Email</strong>
                      <Input
                        type="text"
                        placeholder="Email"
                        // autoComplete="username"
                        name="email"
                        value={email}
                        autoFocus
                        onChange={(event) => {
                          this.setState({ err: '' });
                          //this.setState({ email: event.target.value });
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
                        // autoComplete="username"
                        name="phone"
                        autoFocus
                        value={phone}
                        onChange={(event) => {
                          this.setState({ err: '' });
                          //this.setState({ phone: event.target.value });
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

const mapStateToProps = (state) => {
  return {
    username: state.profileEmployee.username,
    name: state.profileEmployee.name,
    email: state.profileEmployee.email,
    phone: state.profileEmployee.phone,
  };
};

const actionCreators = {
  saveProfile: profileEmployeeActions.saveProfile,
};

export default connect(mapStateToProps, actionCreators)(Profile);
