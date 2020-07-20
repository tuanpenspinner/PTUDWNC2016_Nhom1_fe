import { employeeConstants } from '../../constants/employee';
import axios from 'axios';
const getListAccounts = (accessToken) => {
  return (dispatch) => {
    return axios
      .get('http://localhost:3001/employees/account-customers', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((data) => {
        const result = data.data;
        console.log(result);
        return dispatch({
          type: employeeConstants.moneyRecharge.GET_LIST_ACCOUNTS,
          data: result,
        });
      }).catch((e) => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      });
  };
};
const moneyRecharge = (accessToken, username, accountNumber, amount, type) => {
  return (dispatch) => {
    return axios
      .post(
        'http://localhost:3001/employees/money-recharge',
        {
          username: username,
          accountNumber: accountNumber,
          amount: amount,
          type: type,
        },
        {
          headers: {
            'access-token': accessToken,
          },
        }
      )
      .then((data) => {
        const result = data.data;
        return dispatch({
          type: employeeConstants.moneyRecharge.RECHARGE_MONEY,
          data: result,
        });
      }).catch((e) => {

        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      });
  };
};
const getHistoryDeal = (accessToken, customer) => {
  return (dispatch) => {
    return axios
      .get(
        `http://localhost:3001/employees/historyDealOfCustomer/${customer.username}`,
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'access-token': accessToken,
          },
        }
      )
      .then((data) => {
        const result = data.data;
        console.log(data);
        return dispatch({
          type: employeeConstants.getHistoryDeal.GET_HISTORY_DEAL,
          data: result,
          customerChose: customer,
        });
      })
      .catch((e) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      });
  };
};
export const manageCustomersActions = {
  getListAccounts,
  moneyRecharge,
  getHistoryDeal,
};
