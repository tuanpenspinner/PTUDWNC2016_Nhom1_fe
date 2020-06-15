import { combineReducers } from 'redux';
import authenticationCustomer from './customer/authentication';

const rootReducer = combineReducers({
    authenticationCustomer
});
export default rootReducer;