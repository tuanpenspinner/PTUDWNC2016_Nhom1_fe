/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { authenticationCustomerActions } from '../../../actions/customer/authentication';
import { authenticationEmployeeActions } from '../../../actions/employee/authentication';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      checkRole: 'customer',
      err: '',
      reCaptcha: false,
    };
  }
  onChange = (value) => {
    this.setState({
      reCaptcha: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.username === '' || this.state.password === '') {
      this.setState({ err: 'Vui lòng nhập username hoặc password còn trống!' });
    } else if (this.state.reCaptcha === null) {
      this.setState({
        err: 'Captcha không đúng!',
      });
    } else {
      this.setState({
        err: '',
      });
      const { loginCustomer, loginEmployee } = this.props;
      switch (this.state.checkRole) {
        case 'customer': {
          await loginCustomer(
            this.state.username,
            this.state.password,
            this.state.checkRole
          );
          const st = this.props;
          if (st.accessToken === 'err') {
            this.setState({ err: 'Email hoặc mật khẩu không chính xác !' });
            window.grecaptcha.reset();
            this.setState({
              reCaptcha: null,
            });
          }
          if (st.isLogin === true) {
            localStorage.setItem('accessToken', st.accessToken);
            localStorage.setItem('refreshToken', st.refreshToken);
            window.location.href = './customer/transfer';
          }
          break;
        }
        case 'employee': {
          await loginEmployee(
            this.state.username,
            this.state.password,
            this.state.checkRole
          );
          const stEmp = this.props;
          if (stEmp.accessToken === 'err') {
            this.setState({ err: 'Email hoặc mật khẩu không chính xác !' });
            window.grecaptcha.reset();
            this.setState({
              reCaptcha: null,
            });
          }
          if (stEmp.isLogin === true) {
            localStorage.setItem('accessToken', stEmp.accessToken);
            window.location.href = './employee/manage-customer';
          }
          break;
        }
        case 'administrator':
          break;
        default:
          break;
      }
    }
  };
  handleOptionChange = async (e) => {
    await this.setState({
      checkRole: e.target.value,
    });
    console.log(this.state.checkRole);
  };
  render() {
    const { username, password, err } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={this.state.username}
                          name="username"
                          autoFocus
                          onChange={(event) => {
                            this.setState({ err: '' });
                            this.setState({ username: event.target.value });
                          }}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          value={this.state.password}
                          onChange={(event) => {
                            this.setState({ err: '' });
                            this.setState({ password: event.target.value });
                          }}
                        />
                      </InputGroup>
                      <div>
                        <p style={{ color: 'red' }}>{err}</p>
                      </div>
                      <ReCAPTCHA
                        className="mb-3"
                        onChange={this.onChange}
                        sitekey="6LfYuqkZAAAAAI0aPad73yuIsMgRd_BJ0iR3uwru"
                      />
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            type="submit"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link to="/reset-password">
                            <Button color="link" className="px-0">
                              Forgot password?
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: '44%' }}
                >
                  <CardBody>
                    <div>
                      <h2 className="text-center">Sign in with role</h2>
                      <div
                        className="custom-controls-stacked"
                        style={{ paddingLeft: '75px', paddingTop: '15px' }}
                      >
                        <label className="custom-control custom-radio">
                          <input
                            id="radioStacked1"
                            name="radio-stacked"
                            value="customer"
                            type="radio"
                            className="custom-control-input"
                            checked={this.state.checkRole === 'customer'}
                            onChange={this.handleOptionChange}
                          />
                          <span className="custom-control-indicator" />
                          <span className="custom-control-description">
                            Customer
                          </span>
                        </label>
                        <label className="custom-control custom-radio">
                          <input
                            id="radioStacked2"
                            name="radio-stacked"
                            value="employee"
                            type="radio"
                            className="custom-control-input"
                            checked={this.state.checkRole === 'employee'}
                            onChange={this.handleOptionChange}
                          />
                          <span className="custom-control-indicator" />
                          <span className="custom-control-description">
                            Employee
                          </span>
                        </label>
                        <label className="custom-control custom-radio">
                          <input
                            id="radioStacked2"
                            name="radio-stacked"
                            value="administrator"
                            type="radio"
                            className="custom-control-input"
                            checked={this.state.checkRole === 'administrator'}
                            onChange={this.handleOptionChange}
                          />
                          <span className="custom-control-indicator" />
                          <span className="custom-control-description">
                            Administrator
                          </span>
                        </label>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  if (state.authenticationCustomer.role === 'customer')
    return {
      username: state.authenticationCustomer.username,
      name: state.authenticationCustomer.name,
      email: state.authenticationCustomer.email,
      isLogin: state.authenticationCustomer.isLogin,
      accessToken: state.authenticationCustomer.accessToken,
      refreshToken: state.authenticationCustomer.refreshToken,
    };
  if (state.authenticationEmployee.role === 'employee')
    return {
      username: state.authenticationEmployee.username,
      name: state.authenticationEmployee.name,
      email: state.authenticationEmployee.email,
      isLogin: state.authenticationEmployee.isLogin,
      accessToken: state.authenticationEmployee.accessToken,
    };
};

const actionCreators = {
  loginCustomer: authenticationCustomerActions.login,
  loginEmployee: authenticationEmployeeActions.login,
  // requestResetPassword: memberActions.requestResetPassword
};

export default connect(mapStateToProps, actionCreators)(Login);
// export default Login;
