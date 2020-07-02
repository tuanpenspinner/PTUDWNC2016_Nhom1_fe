import { combineReducers } from 'redux';
import authenticationCustomer from './customer/authentication';
import authenticationEmployee from './employee/authentication';
import profileCustomer from "./customer/customer.profile.reducer";
import profileEmployee from "./employee/profile";
import employeeManage from "./administrator/employees"

const rootReducer = combineReducers({
  authenticationEmployee,
  authenticationCustomer,
  profileCustomer,
  profileEmployee,
  employeeManage,
});
export default rootReducer;