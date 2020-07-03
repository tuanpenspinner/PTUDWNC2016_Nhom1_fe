import { employeeConstants } from '../../constants/employee';

export const initialState = {
  allAccounts: [],
  resultRechargeMoney: '',
};
// let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
// const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function manageCustomers(state = initialState, action) {
  switch (action.type) {
    case employeeConstants.moneyRecharge.GET_LIST_ACCOUNTS: {
      const st = { ...state };
      if (action.data.status === 'success') {
        if (action.data.listCustomers.length > 0) {
          st.allAccounts = [...action.data.listCustomers];
        }
      }
      return st;
    }

    case employeeConstants.moneyRecharge.RECHARGE_MONEY: {
      const st = { ...state };
      st.resultRechargeMoney = action.data.status;
      console.log(
        '++++++++++++++++++++++++++++++++++' + st.resultRechargeMoney
      );
      return st;
    }
    default:
      return state;
  }
}

export default manageCustomers;
