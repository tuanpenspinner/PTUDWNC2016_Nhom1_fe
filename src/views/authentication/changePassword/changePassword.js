/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmPassword: '',
      err: '',
    };
  }
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  changePassword = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const { newPassword, confirmPassword, password } = this.state;
    const { username } = this.props;
    if (newPassword === confirmPassword) {
      const entity = {
        username,
        password,
        newPassword,
      };
      const result = await axios.post(
        'http://localhost:3001/customers/changePassword',
        entity,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'access-token': accessToken,
          },
        }
      );
      this.setState({ err: '' });
      alert(result.data.message);
    } else {
      this.setState({ err: 'Mật khẩu xác nhận chưa khớp!' });
    }
  };

  render() {
    const { newPassword, confirmPassword, err } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Đổi mật khẩu</h1>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Mật khẩu hiện tại"
                        autoComplete="new-password"
                        name="password"
                        onChange={this.onChange}
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="newPassword"
                        placeholder="Mật khẩu mới"
                        autoComplete="new-password"
                        onChange={this.onChange}
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
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu "
                        autoComplete="new-password"
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <div>
                      <p style={{ color: 'red' }}>{err}</p>
                    </div>
                    <Button color="primary" block onClick={this.changePassword}>
                      Đổi mật khẩu
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.profileCustomer.username,
  };
};

const actionCreators = {};

export default connect(mapStateToProps, actionCreators)(ChangePassword);
