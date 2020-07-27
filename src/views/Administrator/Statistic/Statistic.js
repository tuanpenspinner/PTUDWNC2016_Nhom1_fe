/* eslint-disable react/prefer-stateless-function */
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
  FormGroup,
  Collapse,
  Label,
  ListGroupItem,
} from 'reactstrap';
import CDataTable from '../../components/table/CDataTable';
import CanvasJSReact from '../../components/chart/canvasjs.react';
import CanvasJSStockReact from '../../components/chart/canvasjs.stock.react';
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
      detailsHistory: [],
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
  componentDidMount() {
    fetch('https://canvasjs.com/data/gallery/stock-chart/grocery-sales.json')
      .then((res) => res.json())
      .then((out) => {
        console.log(out);
        const _dataPointsTransfer = [];
        const _dataPointsReceive = [];
        for (var i = 0; i < out.length; i++) {
          _dataPointsTransfer.push({
            x: new Date(out[i].date),
            y: Number(out[i].sale),
          });
          _dataPointsReceive.push({
            x: new Date(out[i].date),
            y: Number(out[out.length - i - 1].sale),
          });
        }
        this.setState({ dataPointsTransfer: _dataPointsTransfer });
        this.setState({ dataPointsReceive: _dataPointsReceive });
      })
      .catch((err) => console.error(err));
  }
  render() {
    const optionsTransferPieChart = {
      animationEnabled: true,
      title: {
        text: 'Cơ cấu chuyển tiền đến từng đối tác',
        fontFamily: 'roboto',
        fontWeight: 'normal',
      },
      // subtitles: [
      //   {
      //     text: '71% Positive',
      //     verticalAlign: 'center',
      //     fontSize: 24,
      //     dockInsidePlotArea: true,
      //   },
      // ],
      data: [
        {
          type: 'doughnut',
          showInLegend: true,
          indexLabel: '{name}: {y}',
          yValueFormatString: '#,###',
          toolTipContent: '{name}: #percent%',
          dataPoints: [
            { name: 'Unsatisfied', y: 5 },
            { name: 'Very Unsatisfied', y: 31 },
            { name: 'Very Satisfied', y: 40 },
            { name: 'Satisfied', y: 17 },
            { name: 'Neutral', y: 7 },
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
      // subtitles: [
      //   {
      //     text: '71% Positive',
      //     verticalAlign: 'center',
      //     fontSize: 24,
      //     dockInsidePlotArea: true,
      //   },
      // ],
      data: [
        {
          type: 'doughnut',
          showInLegend: true,
          indexLabel: '{name}: {y}',
          yValueFormatString: '#,###',
          toolTipContent: '{name}: #percent%',
          dataPoints: [
            { name: 'Unsatisfied', y: 21 },
            { name: 'Very Unsatisfied', y: 331 },
            { name: 'Very Satisfied', y: 140 },
            { name: 'Satisfied', y: 67 },
            { name: 'Neutral', y: 35 },
          ],
        },
      ],
    };

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
            suffix: 'M',
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: '#,###.00M',
            },
          },
          data: [
            {
              type: 'spline',
              name: 'Transfer',
              showInLegend: true,
              xValueFormatString: 'MMM YYYY',
              yValueFormatString: '#,###.##M',
              dataPoints: this.state.dataPointsTransfer,
            },
            {
              type: 'spline',
              name: 'Receive',
              showInLegend: true,
              xValueFormatString: 'MMM YYYY',
              yValueFormatString: '#,###.##M',
              dataPoints: this.state.dataPointsReceive,
            },
          ],
        },
      ],
      navigator: {
        slider: {
          minimum: new Date(2010, 0, 1, 0, 0, 0, 0),
          maximum: new Date(2020, 0, 1, 0, 0, 0, 0),
        },
      },
      rangeSelector: {
        inputFields: {
          startValue: new Date('2018-06-01'), //Change it to new Date("2018-04-01")
          endValue: Date.now(),
        },
      },
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
            <Row>
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
            <Row style={{ flexDirection: 'row-reverse', marginBottom: '20px' }}>
              <Col xs="7" md="3" xl="3">
                <Input
                  type="select"
                  name="partner"
                  id="partner"
                  //onChange={(e) => this.setState({ payFee: e.target.value })}
                >
                  <option value="0">Tất cả</option>
                  <option value="PNNBank">PNN Bank</option>
                  <option value="LocalBank">Local Bank</option>
                </Input>
              </Col>
              <Label style={{ alignSelf: 'center' }} htmlFor="typePay">
                Đối tác ngân hàng
              </Label>
            </Row>
            <CDataTable
              items={[]}
              columnFilter
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
                { key: 'time', filter: false, label: 'Ngày giao dịch' },
                {
                  key: 'payFeeBy',
                  label: 'Người trả phí',
                  filter: false,
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
                        <p>Nội dung chuyển tiền: {item.content}</p>
                      </CardBody>
                    </Collapse>
                  );
                },
              }}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Statistic;
