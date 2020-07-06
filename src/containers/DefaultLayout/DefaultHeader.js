/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo_transparent.png';
import sygnet from '../../assets/img/brand/user.png';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlProfile: '',
    };
  }
  componentWillMount() {
    const role = localStorage.getItem('role');
    if (role === 'customer') {
      this.setState({ urlProfile: '/customer/profile' });
    } else if (role === 'employee') {
      this.setState({ urlProfile: '/employee/profile' });
    }
  }
  logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  handleClickProfile = () => {
    // const role = localStorage.getItem('role');
    // if(role==='customer')
    // {
    //   return <Link to="/customer/profile"/>;
    // }
    // else if(role==='employee')
    // {
    //   return <Link to="/employee/profile"/>;
    // }
  };
  render() {
    // eslint-disable-next-line
    const { urlProfile } = this.state;

    return (
      <>
        <div style={{ alignSelf: 'center' }}>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
        </div>
        <AppNavbarBrand
          full={{ src: logo, width: 160, height: 100, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <div style={{ alignSelf: 'center' }}>
          <AppSidebarToggler className="d-md-down-none" display="lg" />
        </div>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <NavItem className="d-md-down-none">
                <NavLink to="#" className="nav-link">
                  <i className="icon-bell" />
                  <Badge pill color="danger">
                    5
                  </Badge>
                </NavLink>
              </NavItem>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Notification</strong>
              </DropdownItem>
              <DropdownItem>
                <div className="message">
                  <span className="avatar-status badge-success" />
                  <div>
                    <small className="text-muted float-right mt-1">
                      Just now
                    </small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger" /> Nhắc nợ
                  </div>
                  <div className="small text-muted text-truncate">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt...
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem onClick={(e) => {}}>
                <i className="fa fa-ellipsis-h" /> Xem thêm
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={sygnet}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account</strong>
              </DropdownItem>
              <Link to={urlProfile}>
                <DropdownItem onClick={(e) => {}}>
                  <i className="fa fa-user" /> Profile
                </DropdownItem>
              </Link>
              {/* <DropdownItem onClick={(e) => this.handleClickProfile}>
                <i className="fa fa-user" /> Profile
              </DropdownItem> */}
              <DropdownItem onClick={this.logOut}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-lg-none" mobile /> */}
      </>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
