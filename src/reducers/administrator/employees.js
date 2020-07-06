import { administratorConstants } from '../../constants/administrator';
import { act } from 'react-test-renderer';

export const initialState = {
  username:'',
  details: [],
  collapse: false,
  listEmployee: [],
};
// let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
// const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function employeeManage(state = initialState, action) {
  switch (action.type) {
    case administratorConstants.employeeManage.LOAD_LIST_EMPLOYEE: {
      const st = { ...state };
      st.listEmployee = [...action.listEmployee];

      return st;
    }
    case administratorConstants.employeeManage.TOGGLE_DETAILS: {
      const st = { ...state };
      st.details = [...action.details];
      return st;
    }

    default:
      return state;
  }
}

export default employeeManage;
