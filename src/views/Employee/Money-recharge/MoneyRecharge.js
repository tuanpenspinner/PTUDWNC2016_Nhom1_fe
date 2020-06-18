/* eslint-disable no-unreachable */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Button,
  Card,
  Label,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col,
  Tooltip,
  Form,
  Input,
  InputGroupAddon,
  Row,
  FormGroup,
  CardHeader,
  InputGroup,
  Collapse,
  CardFooter,
} from 'reactstrap';

import CDataTable from '../../components/table/CDataTable';

const usersData = [
  {
    id: 1,
    username: 'cus001',
    name: 'hoàng thị cát uyên',
    email: 'hoanguyen234@gmail.com',
    phone: '02124324134234',
    checkingAccount: { accountNumber: '23423432', amount: '23423' },
    savingsAccount: [
      { accountNumber: '14323', amount: '234234' },
      { accountNumber: '55555', amount: '6666' },
    ],
  },
  {
    id: 2,
    username: 'cus002',
    name: 'hoàng thị cát uyên 2',
    email: 'hoanguyen4@gmail.com',
    phone: '12423523',
    checkingAccount: { accountNumber: '11111', amount: '2222' },
    savingsAccount: [{ accountNumber: '3333', amount: '44444' }],
  },
];
// eslint-disable-next-line consistent-return

class MoneyRecharge extends Component {
  // eslint-disable-next-line consistent-return
  parseData = (data)=>{
    let resParse=[];
    if(Array.isArray(data)&& data.length>0)
    {
      // eslint-disable-next-line array-callback-return
      data.map((item,index) => {
        resParse=[...resParse,{
          id: item.id,
          username: item.username,
          accountNumber: item.checkingAccount.accountNumber,
          type: 'checking',
        }];
        if(item.savingsAccount.length>0)
        item.savingsAccount.map(i=>{
          const x={
            id: item.id,
            username: item.username,
            accountNumber: i.accountNumber,
            type: 'saving',
          };
          resParse=[...resParse,x];
        });
      });
    }else{
      return resParse;
    }
    return resParse;
  };

  render() {
    const data = this.parseData(usersData);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="5">
            <Card>
              <CardHeader>
                <i className="fa fa-location-arrow" />
                <strong>Nạp tiền</strong>
              </CardHeader>
              <CardBody>
                <Form>
                  {/* số tài khoản của bạn */}
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="accountNumber">STK của bạn</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        // value="adfwetfwegggggggwagr"
                        placeholder="Số tài khoản nạp tiền"
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="username">Tên đăng nhập</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Tên đăng nhập..."
                        readOnly
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="name">Họ và tên</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="email">Email</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email tài khoản..."
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                  {/* số tiền cần chuyển */}
                  <FormGroup row>
                    <Col md="4" style={{ alignSelf: 'center' }}>
                      <Label htmlFor="amount">Số tiền nạp vào</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="Nhập số tiền nạp vào tài khoản..."
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  color="primary"
                  style={{ marginRight: '15px' }}
                  type="submit"
                  onClick={this.toggleSmall}
                >
                  Nạp tiền
                </Button>
                <Button color="warning">Reset</Button>
              </CardFooter>
            </Card>
          </Col>
          <Col xs="12" xl="7">
            <Card>
              <CardHeader>
                <i className="fa fa-address-card-o" />
                <strong>Danh sách tài khoản khách hàng</strong>
              </CardHeader>
              <CardBody>
                <CDataTable
                  items={data}
                  columnFilter
                  itemsPerPage={8}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', filter: false},
                    {
                      key: 'username',
                      label: 'Tên đăng nhập',
                    },
                    {
                      key: 'accountNumber',
                      label: 'Số tài khoản',
                    },
                    {
                      key: 'type',
                      label: 'Loại tài khoản',
                      
                      filter: false,
                    },
                    {
                      key: 'action',
                      label: '',
                      sorter: false,
                      filter: false,
                    },
                  ]}
                  scopedSlots={{
                // savingsAccount: (item, index) => {
                    //   return (
                    //     <Collapse isOpen>
                    //     <CardBody>
                    //       <table>
                    //         <tbody>
                    //           {item.savingsAccount.map((i) => {
                    //             <tr>
                    //               <td>{item.id}</td>
                    //               <td>{item.username}</td>
                    //               <td>{i.accountNumber}</td>
                    //             </tr>;
                    //           })}
                    //         </tbody>
                    //       </table>
                    //     </CardBody>
                    //     </Collapse>
                    //   );
                    // },
                    action: (item, index) => {
                      return (
                        <td>
                          <Col className="text-center">
                            <Button
                              size="sm"
                              color="primary"
                              className="btn-pill"
                            >
                              <i className="fa fa-credit-card" />
                            </Button>
                          </Col>
                        </td>
                      );
                    },
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MoneyRecharge;
