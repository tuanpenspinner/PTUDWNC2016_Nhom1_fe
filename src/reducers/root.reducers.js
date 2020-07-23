import { combineReducers } from 'redux';
import authenticationCustomer from './customer/authentication';
import transferCustomer from './customer/transfer';
import authenticationEmployee from './employee/authentication';
import authenticationAdmin from './administrator/authentication';
import profileCustomer from "./customer/customer.profile.reducer";
import profileEmployee from "./employee/profile";
import employeeManage from "./administrator/employees"
import manageDebtReminders from "./customer/manageDebtReminders";
import getHistoryDeal from "./customer/history";
import manageCustomers from './employee/manageCustomers';
const rootReducer = combineReducers({
  authenticationEmployee,
  authenticationCustomer,
  authenticationAdmin,
  profileCustomer,
  profileEmployee,
  manageCustomers,
  manageDebtReminders,
  employeeManage,
  getHistoryDeal,
  transferCustomer,
});
export default rootReducer;