/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Form,
  Input,
  CardHeader,
  FormGroup,
  Collapse,
  Label,
} from 'reactstrap';
import CDataTable from '../../components/table/CDataTable';
import CanvasJSReact from '../../components/chart/canvasjs.react';
import CanvasJSStockReact from '../../components/chart/canvasjs.stock.react';
import { statisticAdminActions } from '../../../actions/admin/statistic';
import { element } from 'prop-types';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJS1 = CanvasJSStockReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJSStockChart = CanvasJSStockReact.CanvasJSStockChart;
class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPointsTransfer: [],
      dataPointsReceive: [],
      dataPointsSpline: null,
      dataPieChartConvertFromSpline: {
        transferData: { PPNBank: 0, TCKBank: 0 },
        receiveData: { PPNBank: 0, TCKBank: 0 },
      },
      detailsHistory: [],
      transactionHistory: [],
      startDate: null,
      endDate: null,
      partner: 'all',
    };
  }
  //hàm xử lí hiện detail
  toggleDetailsHistory = (index) => {
    const position = this.state.detailsHistory.indexOf(index);
    let newDetails = this.state.detailsHistory.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...this.state.detailsHistory, index];
    }
    this.setState({ detailsHistory: newDetails });
  };
  getDateInString = (stringTime) => {
    var date = new Date(stringTime);
    var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
    return dateString;
  };
  componentWillMount = async () => {
    const { getTransactionHistory } = this.props;
    const accessToken = localStorage.getItem('accessToken');
    await getTransactionHistory(accessToken); //lấy lịch sử giao dịch
    const { transactionHistory } = this.props;
    let _transactionHistory = [];
    if (transactionHistory.length > 0) {
      transactionHistory.map((item) => {
        let _item = { ...item };
        _item._time = new Date(item.time).getTime();
        _transactionHistory = [..._transactionHistory, _item];
      });
    }
    this.setState({ transactionHistory: _transactionHistory });
    if (transactionHistory.length > 0) {
      //set thời gian bắt đầu và kết thúc ở table
      this.setState({
        endDate: this.getDateInString(transactionHistory[0].time),
      });
      this.setState({
        startDate: this.getDateInString(
          transactionHistory[transactionHistory.length - 1].time
        ),
      });
      //lấy data nạp vào biểu đồ
      const res = this.statisticDataTransactionHistory();
      let _dataPointsTransfer = [];
      let _dataPointsReceive = [];
      if (res)
        for (var i = 0; i < res.partnerTCKBank.length; i++) {
          _dataPointsTransfer.push({
            x: new Date(res.partnerTCKBank[i].date),
            y:
              Number(res.partnerTCKBank[i].transferAmount) +
              Number(res.partnerPPNBank[i].transferAmount),
          });
          _dataPointsReceive.push({
            x: new Date(res.partnerTCKBank[i].date),
            y:
              Number(res.partnerTCKBank[i].receiveAmount) +
              Number(res.partnerPPNBank[i].receiveAmount),
          });
        }
      console.log(res);
      this.setState({ dataPointsSpline: { ...res } });
      this.setState({ dataPointsTransfer: _dataPointsTransfer });
      this.setState({ dataPointsReceive: _dataPointsReceive });
      this.handleGetDataPieChartWithInputField(
        new Date(this.state.startDate),
        new Date(this.state.endDate)
      );
    } else {
      this.setState({
        endDate: this.getDateInString(new Date()),
        startDate: this.getDateInString(new Date()),
      });
    }
  };
  //chèn object đầy data biểu đồ
  insertArray(array) {
    const indexArray = [...array];
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let newArray = [];
    let currentMonth = parseInt(
      indexArray[indexArray.length - 1].date.slice(
        indexArray[indexArray.length - 1].date.indexOf('-') + 1,
        indexArray[indexArray.length - 1].date.lastIndexOf('-')
      )
    );
    let currentYear = new Date(
      indexArray[indexArray.length - 1].date
    ).getFullYear();
    let _index = indexArray.length - 1;
    while (
      !(
        currentMonth ===
          parseInt(
            indexArray[0].date.slice(
              indexArray[0].date.indexOf('-') + 1,
              indexArray[0].date.lastIndexOf('-')
            )
          ) && currentYear === new Date(indexArray[0].date).getFullYear()
      )
    ) {
      if (
        currentMonth ===
          parseInt(
            indexArray[_index].date.slice(
              indexArray[_index].date.indexOf('-') + 1,
              indexArray[_index].date.lastIndexOf('-')
            )
          ) &&
        currentYear === new Date(indexArray[_index].date).getFullYear()
      ) {
        _index = _index - 1;
        newArray = [...newArray, indexArray[_index + 1]];
      } else {
        newArray = [
          ...newArray,
          {
            date:
              currentYear + '-' + currentMonth + '-' + days[currentMonth - 1],
            transferAmount: 0,
            receiveAmount: 0,
          },
        ];
      }
      if (currentMonth === 12) {
        currentYear = currentYear + 1;
        currentMonth = 1;
      } else currentMonth = currentMonth + 1;
    }
    newArray = [...newArray, indexArray[0]];
    return newArray;
  }
  //parse data API theo từng tháng
  statisticDataTransactionHistory = () => {
    let partnerPPNBank = [];
    let partnerTCKBank = [];
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const { transactionHistory } = this.props;
    if (transactionHistory && transactionHistory.length > 0) {
      let currentMonth = new Date(transactionHistory[0].time).getMonth() + 1;
      let currentYear = new Date(transactionHistory[0].time).getFullYear();
      partnerTCKBank = [
        ...partnerTCKBank,
        {
          date: currentYear + '-' + currentMonth + '-' + days[currentMonth - 1],
          transferAmount: 0,
          receiveAmount: 0,
        },
      ];
      partnerPPNBank = [
        ...partnerPPNBank,
        {
          date: currentYear + '-' + currentMonth + '-' + days[currentMonth - 1],
          transferAmount: 0,
          receiveAmount: 0,
        },
      ];
      transactionHistory.map((item) => {
        if (currentYear !== new Date(item.time).getFullYear()) {
          currentMonth = new Date(item.time).getMonth() + 1;
          currentYear = new Date(item.time).getFullYear();
          partnerTCKBank = [
            ...partnerTCKBank,
            {
              date: currentYear + '-' + currentMonth + '-31',
              transferAmount: 0,
              receiveAmount: 0,
            },
          ];
          partnerPPNBank = [
            ...partnerPPNBank,
            {
              date: currentYear + '-' + currentMonth + '-31',
              transferAmount: 0,
              receiveAmount: 0,
            },
          ];
        } else if (currentMonth !== new Date(item.time).getMonth() + 1) {
          currentMonth = new Date(item.time).getMonth() + 1;
          partnerTCKBank = [
            ...partnerTCKBank,
            {
              date:
                currentYear + '-' + currentMonth + '-' + days[currentMonth - 1],
              transferAmount: 0,
              receiveAmount: 0,
            },
          ];
          partnerPPNBank = [
            ...partnerPPNBank,
            {
              date:
                currentYear + '-' + currentMonth + '-' + days[currentMonth - 1],
              transferAmount: 0,
              receiveAmount: 0,
            },
          ];
        }

        if (
          new Date(item.time).getMonth() + 1 === currentMonth &&
          new Date(item.time).getFullYear() === currentYear
        ) {
          if (item.type.bankCode === 'PPNBank') {
            if (item.type.name === 'receive') {
              partnerPPNBank[partnerPPNBank.length - 1].receiveAmount =
                partnerPPNBank[partnerPPNBank.length - 1].receiveAmount +
                parseInt(item.amount, 10);
            } else {
              partnerPPNBank[partnerPPNBank.length - 1].transferAmount =
                partnerPPNBank[partnerPPNBank.length - 1].transferAmount +
                parseInt(item.amount, 10);
            }
          } else {
            if (item.type.name === 'receive') {
              partnerTCKBank[partnerTCKBank.length - 1].receiveAmount =
                partnerTCKBank[partnerTCKBank.length - 1].receiveAmount +
                parseInt(item.amount, 10);
            } else {
              partnerTCKBank[partnerTCKBank.length - 1].transferAmount =
                partnerTCKBank[partnerTCKBank.length - 1].transferAmount +
                parseInt(item.amount, 10);
            }
          }
        }
      });
      partnerPPNBank = this.insertArray(partnerPPNBank);
      partnerTCKBank = this.insertArray(partnerTCKBank);
    }
    return { partnerTCKBank, partnerPPNBank };
  };
  //xử lí thay đổi filter ở table
  handleGetTransactionHistoryByDate(startDate, endDate) {
    const _startDate = new Date(startDate);
    const _endDate = new Date(endDate);
    let newTransactionHistory = [];
    if (this.props.transactionHistory.length > 0)
      this.props.transactionHistory.map((item) => {
        if (
          this.state.partner === 'all' ||
          this.state.partner === item.type.bankCode
        ) {
          const timeOfItem = new Date(
            this.getDateInString(item.time)
          ).getTime();
          if (
            timeOfItem >= _startDate.getTime() &&
            timeOfItem <= _endDate.getTime()
          ) {
            newTransactionHistory = [...newTransactionHistory, item];
          }
        }
      });
    this.setState({ transactionHistory: newTransactionHistory });
  }
  //xử lí khi thời gian thay đổi ở biểu đồ
  handleGetDataPieChartWithInputField(startDate, endDate) {
    console.log(startDate + '=' + endDate);
    const data = this.state.dataPointsSpline;
    const transferData = { PPNBank: 0, TCKBank: 0 };
    const receiveData = { PPNBank: 0, TCKBank: 0 };
    if (data && data.partnerTCKBank.length > 0) {
      data.partnerTCKBank.map((item) => {
        if (
          new Date(item.date).getTime() >=
            new Date(this.getDateInString(startDate)).getTime() &&
          new Date(item.date).getTime() <=
            new Date(this.getDateInString(endDate)).getTime()
        ) {
          transferData.TCKBank =
            transferData.TCKBank + Number(item.transferAmount);
          receiveData.TCKBank =
            receiveData.TCKBank + Number(item.receiveAmount);
        }
      });
      data.partnerPPNBank.map((item) => {
        if (
          new Date(item.date).getTime() >=
            new Date(this.getDateInString(startDate)).getTime() &&
          new Date(item.date).getTime() <=
            new Date(this.getDateInString(endDate)).getTime()
        ) {
          transferData.PPNBank =
            transferData.PPNBank + Number(item.transferAmount);
          receiveData.PPNBank =
            receiveData.PPNBank + Number(item.receiveAmount);
        }
      });
    }
    this.setState({
      dataPieChartConvertFromSpline: { transferData, receiveData },
    });
  }
  render() {
    const optionsAllPartners = {
      // exportEnabled: true,
      animationEnabled: true,
      title: {
        text: 'Thống kê giao dịch với tất cả đối tác',
        fontFamily: 'roboto',
      },
      subtitles: [
        {
          text: 'Theo số dư chuyển khoản và nhận được từng tháng',
          fontFamily: 'roboto',
        },
      ],
      charts: [
        {
          toolTip: {
            shared: true,
          },
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: 'MMM YYYY',
            },
          },
          axisY: {
            title: 'Số tiền giao dịch',
            titleFontFamily: 'Roboto',
            suffix: 'VND',
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: '#,###.00VND',
            },
          },
          data: [
            {
              type: 'spline',
              name: 'Transfer',
              showInLegend: true,
              xValueFormatString: 'MMM YYYY',
              yValueFormatString:
                this.state.dataPointsTransfer.y > 0 ? '#,###.## VND' : '0 VND',
              dataPoints: this.state.dataPointsTransfer,
            },
            {
              type: 'spline',
              name: 'Receive',
              showInLegend: true,
              xValueFormatString: 'MMM YYYY',
              yValueFormatString:
                this.state.dataPointsReceive.y > 0 ? '#,###.## VND' : '0 VND',
              dataPoints: this.state.dataPointsReceive,
            },
          ],
        },
      ],
      rangeChanged: (e) => {
        this.handleGetDataPieChartWithInputField(
          new Date(e.minimum),
          new Date(e.maximum)
        );
      },
      navigator: {
        slider: {
          minimum: new Date(2010, 0, 1, 0, 0, 0, 0),
          maximum: new Date(this.state.endDate),
        },
      },
      rangeSelector: {
        inputFields: {
          startValue: new Date(this.state.startDate),
          endValue: new Date(this.state.endDate),
        },
      },
    };

    const optionsTransferPieChart = {
      animationEnabled: true,
      title: {
        text: 'Cơ cấu nhận tiền từ từng đối tác',
        fontFamily: 'roboto',
      },
      data: [
        {
          type: 'doughnut',
          showInLegend: true,

          //legendText: this.state.dataPieChartConvertFromSpline.transferData.PPNBank> 0 ? '{name}:{y}' : '{name}: 0',
          dataPoints: [
            {
              name: 'PPN Bank',
              yValueFormatString: '#,### VND',

              y: this.state.dataPieChartConvertFromSpline.transferData.PPNBank,
              indexLabel: '{name}: #percent%',
              legendText:
                this.state.dataPieChartConvertFromSpline.transferData.PPNBank >
                0
                  ? '{name}:{y}'
                  : '{name}: 0 VND',
            },
            {
              name: 'Local Bank',
              y: this.state.dataPieChartConvertFromSpline.transferData
                .TCKBank,
              indexLabel: '{name}: #percent%',
              yValueFormatString: '#,### VND',
              legendText:
                this.state.dataPieChartConvertFromSpline.transferData
                  .TCKBank > 0
                  ? '{name}:{y}'
                  : '{name}: 0 VND',
            },
            {
              name: 'empty',
              legendText: '{name}',
              toolTipContent: '0',
              y:
                this.state.dataPieChartConvertFromSpline.transferData
                  .TCKBank +
                  this.state.dataPieChartConvertFromSpline.transferData
                    .PPNBank >
                0
                  ? 0
                  : 1,
            },
          ],
        },
      ],
    };
    const optionsReceivePieChart = {
      animationEnabled: true,
      title: {
        text: 'Cơ cấu nhận tiền từ từng đối tác',
        fontFamily: 'roboto',
      },
      data: [
        {
          type: 'doughnut',
          showInLegend: true,
          legendText: '{name}:{y}',
          yValueFormatString: '#,### VND',
          dataPoints: [
            {
              name: 'PPN Bank',
              y: this.state.dataPieChartConvertFromSpline.receiveData.PPNBank,
              indexLabel: '{name}: #percent%',
              legendText:
                this.state.dataPieChartConvertFromSpline.receiveData.PPNBank > 0
                  ? '{name}:{y}'
                  : '{name}: 0 VND',
            },
            {
              name: 'Local Bank',
              y: this.state.dataPieChartConvertFromSpline.receiveData.TCKBank,
              indexLabel: '{name}: #percent%',
              legendText:
                this.state.dataPieChartConvertFromSpline.receiveData.TCKBank >
                0
                  ? '{name}:{y}'
                  : '{name}: 0 VND',
            },
            {
              name: 'empty',
              legendText: '{name}',
              toolTipContent: '0',
              y:
                this.state.dataPieChartConvertFromSpline.receiveData.TCKBank +
                  this.state.dataPieChartConvertFromSpline.receiveData.PPNBank >
                0
                  ? 0
                  : 1,
            },
          ],
        },
      ],
    };

    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <Col>
              {/* biểu đồ thống kê chuyển khoản và nhận theo từng tháng đối với tất cả đối tác */}
              <CanvasJSStockChart
                options={optionsAllPartners}
              ></CanvasJSStockChart>
            </Col>
            <Row style={{ marginTop: '20px' }}>
              <Col>
                {/* biểu đồ thống kê chuyển khoản của từng đối tác theo tháng */}
                <CanvasJSChart options={optionsTransferPieChart} />
              </Col>
              <Col>
                {/* biểu đồ thống kê nhận tiền của từng đối tác theo tháng */}
                <CanvasJSChart options={optionsReceivePieChart} />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader style={{ backgroundColor: '#ffffff' }}>
            Danh sách giao dịch
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup row style={{}}>
                <Col>
                  <div className="d-flex flex-row">
                    <div
                      style={{
                        alignSelf: 'center',
                        width: '60px',
                        marginTop: '5px',
                      }}
                    >
                      <Label htmlFor="partner">Đối tác</Label>
                    </div>
                    <div style={{ width: '170px' }}>
                      <Input
                        type="select"
                        name="partner"
                        id="partner"
                        onChange={async (e) => {
                          await this.setState({
                            detailsHistory: [],
                            partner: e.target.value,
                          });
                          this.handleGetTransactionHistoryByDate(
                            this.state.startDate,
                            this.state.endDate
                          );
                        }}
                      >
                        <option value="all">Tất cả</option>
                        <option value="PPNBank">PPN Bank</option>
                        <option value="TCKBank">Local Bank</option>
                      </Input>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex flex-row" style={{ marginTop: '5px' }}>
                    <div
                      style={{
                        alignSelf: 'center',
                        width: '60px',
                      }}
                    >
                      <Label htmlFor="startDate">Từ ngày</Label>
                    </div>

                    <div style={{ width: '170px' }}>
                      <Input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={this.state.startDate}
                        onChange={(e) => {
                          this.setState({ detailsHistory: [] });
                          if (
                            new Date(e.target.value).getTime() >
                            new Date(this.state.endDate).getTime()
                          ) {
                            alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc!');
                          } else {
                            this.setState({ startDate: e.target.value });
                            this.handleGetTransactionHistoryByDate(
                              e.target.value,
                              this.state.endDate
                            );
                          }
                        }}
                        placeholder="date placeholder"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex flex-row" style={{ marginTop: '5px' }}>
                    <div
                      style={{
                        alignSelf: 'center',
                        width: '60px',
                        marginTop: '5px'
                      }}
                    >
                      <Label htmlFor="endDate">đến</Label>
                    </div>
                    <div style={{ width: '170px' }}>
                      <Input
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={this.state.endDate}
                        onChange={(e) => {
                          this.setState({ detailsHistory: [] });
                          if (
                            new Date(this.state.startDate).getTime() >
                            new Date(e.target.value).getTime()
                          ) {
                            alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc!');
                          } else {
                            this.setState({ endDate: e.target.value });
                            this.handleGetTransactionHistoryByDate(
                              this.state.startDate,
                              e.target.value
                            );
                          }
                        }}
                        placeholder="date placeholder"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div
                    className="d-flex flex-row"
                    style={{ paddingLeft: '60px', marginTop: '5px' }}
                  >
                    <Button
                      color="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        const { transactionHistory } = this.props;
                        if (transactionHistory.length > 0) {
                          const _end = this.getDateInString(
                            transactionHistory[0].time
                          );
                          const _start = this.getDateInString(
                            transactionHistory[transactionHistory.length - 1]
                              .time
                          );
                          this.setState({
                            endDate: _end,
                            startDate: _start,
                            detailsHistory: [],
                          });
                          this.handleGetTransactionHistoryByDate(_start, _end);
                        } else {
                          this.setState({
                            endDate: this.getDateInString(new Date()),
                            startDate: this.getDateInString(new Date()),
                          });
                        }
                      }}
                    >
                      Reset thời gian truy vấn
                    </Button>
                  </div>
                </Col>
              </FormGroup>
            </Form>
            <CDataTable
              items={this.state.transactionHistory}
              //columnFilter
              itemsPerPage={10}
              hover
              border
              sorter
              pagination
              fields={[
                { key: 'id', _style: { width: '1%' } },
                // { key: 'name', label: 'Tên người gửi' },
                { key: 'transfererAccountNumber', label: 'STK người gửi' },
                { key: 'receiverAccountNumber', label: 'STK người nhận' },
                { key: 'amount', filter: false, label: 'Số tiền gửi' },
                { key: '_time', label: 'Ngày giao dịch' },
                {
                  key: 'partner',
                  label: 'Đối tác',
                },
                {
                  key: 'type',
                  label: 'Loại giao dịch',
                },
                {
                  key: 'showdetail',
                  label: '',
                  _style: { width: '1%' },
                  sorter: false,
                  filter: false,
                },
              ]}
              scopedSlots={{
                id: (item, index) => {
                  return <td className="text-center">{index + 1}</td>;
                },
                _time:  (item, index) => {
                  return <td>{item.time}</td>;
                },
                partner: (item, index) => {
                  return <td>{item.type.bankCode}</td>;
                },
                type: (item, index) => {
                  return (
                    <td>
                      {item.type.name === 'transfer'
                        ? 'Chuyển tiền'
                        : 'Nhận tiền'}
                    </td>
                  );
                },
                showdetail: (item, index) => {
                  return (
                    <td className="text-center">
                      <Button
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => {
                          this.toggleDetailsHistory(index);
                        }}
                      >
                        {this.state.detailsHistory.includes(index)
                          ? 'Hide'
                          : 'Show'}
                      </Button>
                    </td>
                  );
                },
                details: (item, index) => {
                  return (
                    <Collapse
                      isOpen={this.state.detailsHistory.includes(index)}
                    >
                      <CardBody>
                        <p>Tên người chuyển khoản: {item.transfererName}</p>
                        <p>Tên người nhận: {item.receiverName}</p>
                        <p>
                          Người trả phí:{' '}
                          {item.payFeeBy === 'transferer'
                            ? 'Người gửi'
                            : 'Người nhận'}
                        </p>
                        <p>Nội dung chuyển tiền: {item.content}</p>
                      </CardBody>
                    </Collapse>
                  );
                },
              }}
            ></CDataTable>
          </CardBody>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    transactionHistory: state.revenueStatistics.transactionHistory,
  };
};

const actionCreators = {
  getTransactionHistory: statisticAdminActions.getTransactionHistory,
};

export default connect(mapStateToProps, actionCreators)(Statistic);
