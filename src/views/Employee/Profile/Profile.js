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
  Toast,
  ToastBody,
  ToastHeader,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { profileEmployeeActions } from '../../../actions/employee/profile.action';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      phone: '',
      email: '',
      contentAlertAfterRecharge: '',
      colorAlert: '',
      visible: false,
      avatar: require('../../../assets/img/brand/user.png'),
      err: '',
    };
  }
  componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    console.log('-----------' + accessToken);
    const { saveProfile } = this.props;
    saveProfile(accessToken);
  }
  componentWillReceiveProps(nextProps) {
    const { username, name, phone, email } = nextProps;
    this.setState({
      username: username,
      name: name,
      email: email,
      phone: phone,
    });
  }

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 3000);
    });
  };

  handleUpdate = async (e) => {
    const accessToken = localStorage.getItem('accessToken');
    const { updateProfile } = this.props;
    await updateProfile(
      accessToken,
      this.state.name,
      this.state.email,
      this.state.phone
    );
    const { resultUpdate } = this.props;
    if (resultUpdate === 'success') {
      this.setState({
        colorAlert: '#dff2e3',
        contentAlertAfterRecharge: 'Cập nhật thông tin thành công!',
      });
    } else {
      this.setState({
        colorAlert: '#fae1e3',
        contentAlertAfterRecharge: 'Có lỗi xảy ra. Vui lòng thực hiện lại!',
      });
    }
    this.onShowAlert();
  };

  render() {
    const { avatar } = this.state;
    const { username, name, phone, email } = this.state;
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
                <Form>
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
                          this.setState({ name: event.target.value });
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
                          this.setState({ email: event.target.value });
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
                          console.log(event.target.value);
                          this.setState({ err: '' });
                          this.setState({ phone: event.target.value });
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
                    <div>
                      <p style={{ color: 'red', marginLeft: '20px' }}>
                        {this.state.err}
                      </p>
                    </div>
                    <Button
                      style={{ marginTop: '10px' }}
                      type="submit"
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        if (email === '' || name === '' || phone === '') {
                          this.setState({
                            err: 'Các trường không được để trống!',
                          });
                        } else {
                          this.handleUpdate(e);
                        }
                      }}
                    >
                      Update Account
                    </Button>
                  </ListGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div style={{ position: '', marginTop: 0 }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: '5px',
              width: '300px',
            }}
          >
            <Toast isOpen={this.state.visible}>
              <ToastHeader toggle={(e) => this.setState({ visible: false })}>
                Thông báo
              </ToastHeader>
              <ToastBody style={{ backgroundColor: this.state.colorAlert }}>
                {this.state.contentAlertAfterRecharge}
              </ToastBody>
            </Toast>
          </div>
        </div>
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
    resultUpdate: state.profileEmployee.resultUpdate,
  };
};

const actionCreators = {
  saveProfile: profileEmployeeActions.saveProfile,
  updateProfile: profileEmployeeActions.updateProfile,
};

export default connect(mapStateToProps, actionCreators)(Profile);
