import { customerConstants } from '../../constants/customer';
import axios from 'axios';
const saveProfile = (accessToken) => {
  return (dispatch) => {
    return axios
      .get('https://great-banking.herokuapp.com/customers/info', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((data) => {
        const info = data.data.customer;
        return dispatch({ type: customerConstants.info.SAVE_PROFILE, info });
      })
      .catch((e) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      });
  };
};

export const profileCustomerActions = {
  saveProfile,
};
