import { administratorConstants } from '../../constants/administrator/';
import axios from 'axios';
const loadListEmployee = () => {
  return (dispatch) => {
    return axios
      .get('http://localhost:3001/administrator/list-employee')
      .then((data) => {
        const listEmployee = data.data.listEmployees;
        return dispatch({
          type: administratorConstants.employeeManage.LOAD_LIST_EMPLOYEE,
          listEmployee,
        });
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
