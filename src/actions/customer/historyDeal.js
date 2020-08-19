import { customerConstants } from '../../constants/customer';
import axios from 'axios';

const getHistoryTransfer = (accessToken) => {
  return (dispatch) => {
    return axios
      .get('https://great-banking.herokuapp.com/customers/historyTransfer', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((dataResult) => {
        const data = { ...dataResult.data };
        return dispatch({
          type: customerConstants.historyDeal.GET_HISTORY_TRANSFER_CUSTOMER,
          data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
const getHistoryReceive = (accessToken) => {
  return (dispatch) => {
    return axios
      .get('https://great-banking.herokuapp.com/customers/historyReceive', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((dataResult) => {
        const data = { ...dataResult.data };
        return dispatch({
          type: customerConstants.historyDeal.GET_HISTORY_RECEIVE_CUSTOMER,
          data,
        });
      });
  };
};
const getHistoryPayDebt = (accessToken) => {
  return (dispatch) => {
    return axios
      .get('https://great-banking.herokuapp.com/customers/historyPayDebt', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((dataResult) => {
        const data = { ...dataResult.data };
        return dispatch({
          type: customerConstants.historyDeal.GET_HISTORY_PAY_DEBT_CUSTOMER,
          data,
        });
      });
  };
};
export const historyDealCustomerActions = {
  getHistoryTransfer,
  getHistoryReceive,
  getHistoryPayDebt,
};
