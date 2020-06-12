import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap';
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';

// eslint-disable-next-line react/prefer-stateless-function
class ListReceivers extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop" />ListReceivers view
          </div>
          <div className="card-body" />
        </div>
      </div>
    );
  }
}

export default ListReceivers;
