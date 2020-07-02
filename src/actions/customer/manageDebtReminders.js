import { customerConstants } from '../../constants/customer';
import axios from "axios"
const getAllDebtReminders = (accessToken) => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/api/debt-reminders', {
      headers: {
        'access-token': accessToken,
      },
    }).then((data) => {
      const resultData = data.data;
      return dispatch({ type: customerConstants.debtReminder.GET_ALL_DEBT_REMINDERS, data: resultData });
    });
  };
};

export const manageDebtRemindersActions = {
    getAllDebtReminders,
};
