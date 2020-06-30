import { combineReducers } from 'redux';
import authenticationCustomer from './customer/authentication';
import profileCustomer from "./customer/profile.reducer"

const rootReducer = combineReducers({
  authenticationCustomer,
  profileCustomer,
});
export default rootReducer;