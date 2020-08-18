import { customerConstants } from '../../constants/customer';
import axios from 'axios';
const getAllDebtReminders = (accessToken) => {
  return (dispatch) => {
    return axios
      .get('http://localhost:3001/api/debt-reminders', {
        headers: {
          'access-token': accessToken,
        },
      })
      .then((data) => {
        const resultData = data.data;
        return dispatch({
          type: customerConstants.debtReminder.GET_ALL_DEBT_REMINDERS,
          data: resultData,
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
const getListReceiver = (accessToken) => {
  return (dispatch) => {
    axios
      .get('http://localhost:3001/customers/info', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((data) => {
        var listReceiver = data.data.customer.listReceivers;
        var name = data.data.customer.name;
        var amount = data.data.customer.checkingAccount.amount;
        var accountNumber = data.data.customer.checkingAccount.accountNumber;
        var email = data.data.customer.email;
        var username = data.data.customer.username;
        return dispatch({
          type: customerConstants.debtReminder.GET_LIST_RECEIVER,
          listReceiver,
          name,
          amount,
          accountNumber,
          email,
          username,
        });
      });
  };
};
const connectSocketIoHost = () => {
  return (dispatch) => {
    return dispatch({
      type: customerConstants.debtReminder.CONNECT_SOCKET_IO_HOST,
    });
  };
};

export const manageDebtRemindersActions = {
  getAllDebtReminders,
  getListReceiver,
  connectSocketIoHost,
};
