import React, { Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  CardHeader,
  Collapse,
} from 'reactstrap';

import CDataTable from '../../components/table/CDataTable';
import usersData from '../../components/table/UsersData';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
    };
  }

  //hàm xử lí hiện detail lịch sử giao diện
  toggleDetails = (index) => {
    const position = this.state.details.indexOf(index);
    let newDetails = this.state.details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...this.state.details, index];
    }
    this.setState({ details: newDetails });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>Lịch sử giao dịch</CardHeader>
              <CardBody>
                <CDataTable
                  items={usersData}
                  columnFilter
                  tableFilter
                  itemsPerPage={5}
                  hover
                  sorter
                  pagination
                  fields={[
                    { key: 'id', _style: { width: '1%' } },
                    { key: 'name', label: 'Tên người giao dịch' },
                    { key: 'accountNumber', label: 'STK chuyển/ nhận' },
                    { key: 'type', label: 'Loại giao dịch' },
                    { key: 'date', label: 'Ngày giao dịch' },
                    { key: 'typePay', label: 'Người trả phí' },
                    {
                      key: 'showdetail',
                      label: '',
                      _style: { width: '1%' },
                      sorter: false,
                      filter: false,
                    },
                  ]}
                  scopedSlots={{
                    showdetail: (item, index) => {
                      return (
                        <td className="py-2">
                          <Button
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              this.toggleDetails(index);
                            }}
                          >
                            {this.state.details.includes(index)
                              ? 'Hide'
                              : 'Show'}
                          </Button>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <Collapse isOpen={this.state.details.includes(index)}>
                          <CardBody>
                            <p>
                              Số tiền :{' '}
                              {
                                usersData.filter((i) => i.id === item.id)[0]
                                  .amount
                              }
                            </p>

                            <p>
                              Nội dung chuyển tiền:{' '}
                              {
                                usersData.filter((i) => i.id === item.id)[0]
                                  .content
                              }
                            </p>
                          </CardBody>
                        </Collapse>
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

export default History;
