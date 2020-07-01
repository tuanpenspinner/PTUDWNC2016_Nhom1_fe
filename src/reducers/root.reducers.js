import { combineReducers } from 'redux';
import authenticationCustomer from './customer/authentication';
import authenticationEmployee from './employee/authentication';
import profileCustomer from "./customer/profile.reducer";
import manageDebtReminders from "./customer/manageDebtReminders";
import profileEmployee from "./employee/profile";
import manageCustomers from './employee/manageCustomers';
const rootReducer = combineReducers({
  authenticationEmployee,
  authenticationCustomer,
  profileCustomer,
  profileEmployee,
  manageCustomers,
  manageDebtReminders,
});
export default rootReducer;