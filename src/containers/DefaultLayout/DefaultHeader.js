/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
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
      accountNumber: '',
      listNotification: [],
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
  componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    axios
      .get('http://localhost:3001/customers/info', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((data) => {
        this.setState({
          accountNumber: data.data.customer.checkingAccount.accountNumber,
        });
        var accountNumber = this.state.accountNumber;
        axios
          .get(
            `http://localhost:3001/customers/list-notification/${accountNumber}`,
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'access-token': accessToken,
              },
            }
          )
          .then((data) => {
            this.setState({
              listNotification: data.data.notifications,
            });
          });
      });
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
  onClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
  };
  render() {
    // eslint-disable-next-line
    const { urlProfile, listNotification } = this.state;

    const showNotification = () => {
    if (listNotification !== undefined)
        return listNotification.map((notification) => {
          return (
            <div>
              <span className="avatar-status badge-success" />
              <div>
                <small className="text-muted float-right mt-1">
                  {notification.time}
                </small>
              </div>
              <div className="text-truncate font-weight-bold">
                <span className="fa fa-exclamation text-danger" />{' '}
                {notification.type}
              </div>
              <div className="small text-muted text-truncate">
                {notification.content}
              </div>
            </div>
          );
        });
      else return null;
    };

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
          <UncontrolledDropdown nav direction="down" onClick={this.onClick}>
            <DropdownToggle nav>
              <NavItem className="d-md-down-none">
                <NavLink to="#" className="nav-link">
                  <i className="icon-bell" />
                  {/* <Badge pill color="danger">
                    5
                  </Badge> */}
                </NavLink>
              </NavItem>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Notification</strong>
              </DropdownItem>
              <DropdownItem>
                <div className="message">{showNotification()}</div>
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
