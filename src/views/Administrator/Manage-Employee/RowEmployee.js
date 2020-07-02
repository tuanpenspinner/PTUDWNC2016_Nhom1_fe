import React, { Component } from 'react';
import { Button, Row } from 'reactstrap';

import { adminListEmployeeActions } from '../../../actions/admin/listEmployee.action';
import { connect } from 'react-redux';
import axios from 'axios';

class RowEmployee extends Component {
  //hàm xử lí hiện detail trong list employee
  toggleDetails = (index) => {
    const position = this.props.details.indexOf(index);
    let newDetails = this.props.details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...this.props.details, index];
    }
    const { toggleDetails } = this.props;
    toggleDetails(newDetails);
  };
  removeEmployee = async () => {
    const { item } = this.props;
    const result = await axios.post(
      'http://localhost:3001/administrator/delete-employee',
      {
        username: item.username,
      }
    );
    const { loadListEmployee } = this.props;
    loadListEmployee();
  };
  render() {
    const { index } = this.props;
    return (
      <td>
        <Row
          className="text-center"
          style={{
            minWidth: '70px',
            justifySelf: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            size="sm"
            color="danger"
            className="btn-pill"
            style={{ marginRight: 10 }}
            onClick={this.removeEmployee}
          >
            <i className="fa fa-trash-o" />
          </Button>
          <Button
            size="sm"
            color="success"
            className="btn-pill"
            onClick={(e) => {
              this.toggleDetails(index);
            }}
          >
            <i
              className="fa fa-info"
              style={{
                paddingRight: 3,
                paddingLeft: 3,
              }}
            />
          </Button>
        </Row>
      </td>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listEmployee: state.employeeManage.listEmployee,
    details: state.employeeManage.details,
  };
};

const actionCreators = {
  toggleDetails: adminListEmployeeActions.toggleDetails,
  loadListEmployee: adminListEmployeeActions.loadListEmployee,
};

export default connect(mapStateToProps, actionCreators)(RowEmployee);
