import { administratorConstants } from '../../constants/administrator/';
import axios from 'axios';
const loadListEmployee = (accessToken) => {
  return (dispatch) => {
    return axios
      .get('http://localhost:3001/administrator/list-employee', {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          'access-token': accessToken,
        },
      })
      .then((data) => {
        const listEmployee = data.data.listEmployees;
        return dispatch({
          type: administratorConstants.employeeManage.LOAD_LIST_EMPLOYEE,
          listEmployee,
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
const toggleDetails = (details) => {
  return (dispatch) => {
    return dispatch({
      type: administratorConstants.employeeManage.TOGGLE_DETAILS,
      details,
    });
  };
};

export const adminListEmployeeActions = {
  loadListEmployee,
  toggleDetails,
};
