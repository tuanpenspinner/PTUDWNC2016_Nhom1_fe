/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import axios from 'axios';
import {
  Label,
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false, //modal xác nhận reset
      username: '',
      email: '',
      OTP: null,
      newPassword: '',
      confirmPassword: '',
    };
  }
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  // đóng modal
  toggleSmall = (e) => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  generateOTP = async () => {
    const { email, username } = this.state;
    const checkEmail = await axios.post(
      'http://localhost:3001/customers/saveAndSendOTP',
      { email, username }
    );
    if (!checkEmail.data.status)
      alert('Thông tin username hoặc email chưa chính xác');
    else {
      this.setState({
        modal: true,
      });
    }
  };
  // hàm xác nhận reset trên modal
  confirmReset = async (e) => {
    const { username, OTP, newPassword, confirmPassword } = this.state;
    if (newPassword === confirmPassword) {
      const resetPassword = await axios.post(
        'http://localhost:3001/customers/otpValidateAndResetPassword',
        {
          OTP,
          newPassword,
          username,
        }
      );
      if (resetPassword.data.status) {
        alert(`Đổi mật khẩu tài khoản ${username} thành công`);
        window.location.href = './';
      } else {
        alert('Mã OTP không chính xác');
      }
    } else {
      alert('Mật khẩu xác nhận chưa chính xác');
    }
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" lg="5" xl="5">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h2>Reset mật khẩu</h2>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Nhập username của bạn..."
                        autoComplete="username"
                        name="username"
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
                        type="text"
                        placeholder=" Nhập email của bạn..."
                        autoComplete="email"
                        name="email"
                        onChange={this.onChange}
                      />
                    </InputGroup>
                    <Button color="primary" onClick={this.generateOTP} block>
                      Reset mật khẩu
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleSmall}>
                      <ModalHeader toggle={this.toggleSmall}>
                        Xác nhận
                      </ModalHeader>
                      <ModalBody>
                        <Label>
                          Kiểm tra email của bạn, nhập code được gửi và đặt lại
                          mật khẩu mới.
                        </Label>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="fa fa-mail-reply"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            placeholder="Nhập code được gửi..."
                            name="OTP"
                            onChange={this.onChange}
                          />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Mật khẩu mới..."
                            autoComplete="new-password"
                            name="newPassword"
                            onChange={this.onChange}
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            type="password"
                            placeholder="Nhập lại mật khẩu..."
                            autoComplete="new-password"
                            name="confirmPassword"
                            onChange={this.onChange}
                          />
                        </InputGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.confirmReset}>
                          Xác nhận
                        </Button>
                        <Button color="secondary" onClick={this.toggleSmall}>
                          Hủy
                        </Button>
                      </ModalFooter>
                    </Modal>
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

export default ResetPassword;
