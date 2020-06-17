import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import * as router from 'react-router-dom';
import {
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppBreadcrumb2 as AppBreadcrumb,
} from '@coreui/react';
import Transfer from './views/Customer/Transfer/Transfer';
import ProfileCustomer from './views/Customer/Profile/Profile';
import ProfileEmployee from './views/Employee/Profile/Profile';
import ProfileAdministrator from './views/Administrator/Profile/Profile';
import History from './views/Customer/History/History';
import DebtReminder from './views/Customer/Debt-reminder/DebtReminder';
import EmployeeManage from './views/Administrator/Manage-Employee/EmployeeManage';
import Statistic from './views/Administrator/Statistic/Statistic';
import MoneyRecharge from './views/Employee/Money-recharge/MoneyRecharge';
import CustomerManage from './views/Employee/Manage-Customer/CustomerManage';
import Login from './views/authentication/login/login';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';
import DefaultHeader from './containers/DefaultLayout/DefaultHeader';
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routesCustomer = [
  { path: '/customer/transfer', name: 'Chuyển khoản', component: Transfer },
  {
    path: '/customer/debt-reminder',
    name: 'Quản lý nhắc nợ',
    component: DebtReminder,
  },
  {
    path: '/customer/history',
    name: 'Lịch sử giao dịch',
    component: History,
  },
  {
    path: '/customer/profile',
    name: 'Thông tin tài khoản',
    component: ProfileCustomer,
  },
];
const routesAdmnistrator = [
  {
    path: '/administrator/manage-employee',
    name: 'Quản lí nhân viên',
    component: EmployeeManage,
  },
  {
    path: '/administrator/statistic',
    name: 'Thống kê giao dịch',
    component: Statistic,
  },
  { path: '/administrator/profile', name: 'Profile', component: ProfileAdministrator },
];
const routesEmployee = [
  {
    path: '/employee/manage-customer',
    name: 'Quản lí khách hàng',
    component: CustomerManage,
  },
  {
    path: '/employee/money-recharge',
    name: 'Nạp tiền',
    component: MoneyRecharge,
  },
  { path: '/employee/profile', name: 'Profile', component: ProfileEmployee },
];
class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/customer">
          <div className="app">
            <AppHeader fixed>
              <Suspense>
                <DefaultHeader />
              </Suspense>
            </AppHeader>
            <div className="app-body">
              <DefaultLayout />
              <main className="main">
                <AppBreadcrumb appRoutes={routesCustomer} router={router} />
                <Container fluid>
                  <Suspense>
                    <Switch>
                      {routesCustomer.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={(props) => <route.component {...props} />}
                          />
                        ) : null;
                      })}
                    </Switch>
                  </Suspense>
                </Container>
              </main>
            </div>
          </div>
        </Route>
        <Route path="/employee">
          <div className="app">
            <AppHeader fixed>
              <Suspense>
                <DefaultHeader />
              </Suspense>
            </AppHeader>
            <div className="app-body">
              <AppSidebar fixed display="lg">
                <AppSidebarHeader />
                <AppSidebarForm />
                <Suspense>
                  <DefaultLayout />{' '}
                </Suspense>
                <AppSidebarFooter />
              </AppSidebar>
              <main className="main">
                <AppBreadcrumb appRoutes={routesEmployee} router={router} />
                <Container fluid>
                  <Suspense>
                    <Switch>
                      {routesEmployee.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={(props) => <route.component {...props} />}
                          />
                        ) : null;
                      })}
                    </Switch>
                  </Suspense>
                </Container>
              </main>
            </div>
          </div>
        </Route>
        <Route path="/administrator">
          <div className="app">
            <AppHeader fixed>
              <Suspense>
                <DefaultHeader />
              </Suspense>
            </AppHeader>
            <div className="app-body">
              <AppSidebar fixed display="lg">
                <AppSidebarHeader />
                <AppSidebarForm />
                <Suspense>
                  <DefaultLayout />{' '}
                </Suspense>
                <AppSidebarFooter />
              </AppSidebar>
              <main className="main">
                <AppBreadcrumb appRoutes={routesAdmnistrator} router={router} />
                <Container fluid>
                  <Suspense>
                    <Switch>
                      {routesAdmnistrator.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={(props) => <route.component {...props} />}
                          />
                        ) : null;
                      })}
                    </Switch>
                  </Suspense>
                </Container>
              </main>
            </div>
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
