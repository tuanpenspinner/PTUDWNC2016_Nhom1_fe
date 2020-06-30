import { combineReducers } from 'redux';
import authenticationCustomer from './customer/authentication';
import authenticationEmployee from './employee/authentication';
import profileCustomer from "./customer/profile.reducer";
import profileEmployee from "./employee/profile";

const rootReducer = combineReducers({
  authenticationEmployee,
  authenticationCustomer,
  profileCustomer,
  profileEmployee,
});
export default rootReducer;