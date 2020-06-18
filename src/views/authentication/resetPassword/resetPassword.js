/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
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
    };
  }

  // đóng modal
  toggleSmall = async (e) => {
    await this.setState({
      modal: !this.state.modal,
    });
    console.log(this.state.modal);
  };

  // hàm xác nhận reset trên modal
  comfirmReset = (e) => {
    this.toggleSmall();
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="7" lg="5" xl="4">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h2>Reset mật khẩu</h2>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Nhập email của bạn..."
                        autoComplete="email"
                      />
                    </InputGroup>
                    <Button
                      color="primary"
                      onClick={(e) => {
                        this.toggleSmall();
                      }}
                      block
                    >
                      Reset mật khẩu
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleSmall}>
                      <ModalHeader toggle={this.toggleSmall}>
                        Xác nhận
                      </ModalHeader>
                      <ModalBody>
                        <Label>
                          Kiểm tra email của bạn, nhập code được gửi và đặt lại mật khẩu mới.
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
                          />
                        </InputGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.comfirmReset}>
                          Xác nhận
                        </Button>{' '}
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
