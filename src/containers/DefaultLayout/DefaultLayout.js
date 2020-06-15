/* eslint-disable react/prefer-stateless-function */
import React, { Component, Suspense } from 'react';
import * as router from 'react-router-dom';
import { NavLink, NavItem } from 'reactstrap';
import { NavLink as RouteNavLink } from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav2 as AppSidebarNav,
// eslint-disable-next-line import/no-extraneous-dependencies
} from '@coreui/react';

class DefaultLayout extends Component {
  // loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <AppSidebar fixed display="lg">
        <AppSidebarHeader />
            <AppSidebarForm />
        <Suspense>
          <AppSidebarNav {...this.props} router={router}>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/customer/transfer">
                <span>
                  {' '}
                  <i
                    className="fa fa-location-arrow"
                    style={{ marginRight: 15 }}
                  />
                  Chuyển khoản
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/customer/debt-reminder">
                <span>
                  <i className="fa fa-book" style={{ marginRight: 15 }} />
                  Quản lí nhắc nợ
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/customer/list-receivers">
                <span>
                  <i
                    className="fa fa-address-book"
                    style={{ marginRight: 15 }}
                  />
                  Danh sách người nhận
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/customer/profile">
                <span>
                  <i className="fa fa-user-o" style={{ marginRight: 15 }} />
                  Thông tin tài khoản
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/employee/manage-customer">
                <span>
                  <i
                    className="cui-people icons"
                    style={{ marginRight: 15 }}
                   />
                  Quản lí tài khoản khách hàng
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/employee/money-recharge">
                <span>
                  <i
                    className="fa fa-credit-card-alt"
                    style={{ marginRight: 15 }}
                  />
                  Nạp tiền
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/employee/profile">
                <span>
                  <i className="fa fa-user-o" style={{ marginRight: 15 }} />
                  Profile nhân viên
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/administrator/manage-employee">
                <span>
                  <i
                    className="cui-people icons"
                    style={{ marginRight: 15 }}
                   />
                  Quản lí nhân viên
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/administrator/statistic">
                <span>
                  <i className="fa fa-bar-chart" style={{ marginRight: 15 }} />
                  Thống kê giao dịch
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouteNavLink} to="/administrator/profile">
                <span>
                  <i className="fa fa-user-o" style={{ marginRight: 15 }} />
                  Profile admin
                </span>
              </NavLink>
            </NavItem>
          </AppSidebarNav>
        </Suspense>
      </AppSidebar>
    );
  }
}

export default DefaultLayout;
