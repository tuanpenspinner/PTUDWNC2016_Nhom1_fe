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

        return dispatch({
          type: customerConstants.debtReminder.GET_LIST_RECEIVER,
          listReceiver,
          name,
          amount,
          accountNumber,
        });
      });
  };
};

export const manageDebtRemindersActions = {
  getAllDebtReminders,
  getListReceiver,
};
