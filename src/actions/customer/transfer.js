import { customerConstants } from '../../constants/customer';
import axios from 'axios';
const getListReceivers = (accessToken) => {
  return (dispatch) => {
    return axios
      .get('http://localhost:3001/customers/info', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((data) => {
        var data = data.data;
       
        return dispatch({
          type: customerConstants.transfer.GET_LIST_RECEIVERS,
          data,
        });
      });
  };
};
const updateListReceivers = (listReceivers, accessToken) => {
  return (dispatch) => {
    return axios
      .post(
        'http://localhost:3001/customers/updateListReceivers',
        {
          listReceivers,
          
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'access-token': accessToken,
          },
        }
      )
      .then((data) => {
        return dispatch({
          type: customerConstants.transfer.UPDATE_LIST_RECEIVERS,
          listReceivers
        });
      });
  };
};

export const transferCustomerActions = {
  getListReceivers,
  updateListReceivers,
};
