import { administratorConstants } from '../../constants/administrator/';
import axios from 'axios';
const getTransactionHistory = (accessToken) => {
  return (dispatch) => {
    return axios
      .get(
        'https://great-banking.herokuapp.com/administrator/transaction-history',
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'access-token': accessToken,
          },
        }
      )
      .then((data) => {
        const transactionHistory = data.data;
        return dispatch({
          type: administratorConstants.statistic.GET_TRANSACTION_HISTORY,
          transactionHistory,
        });
      })
      .catch((e) => {
        console.log(e);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      });
  };
};

export const statisticAdminActions = {
  getTransactionHistory,
};
