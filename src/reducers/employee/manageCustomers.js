import { employeeConstants } from '../../constants/employee';

export const initialState = {
  allAccounts: [],
  resultRechargeMoney: '',
  resultHistoryDeal: {},
  customerChose: null,
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
      return st;
    }
    case employeeConstants.getHistoryDeal.GET_HISTORY_DEAL: {
      const st = { ...state };
      console.log(action.data);
      if (action.data.status === 'success') {
        if (action.data.history) {
          st.customerChose = { ...action.customerChose };
          st.resultHistoryDeal = { ...action.data.history };
        }
      } else st.resultHistoryDeal = { ...action.data };

      return st;
    }
    default:
      return state;
  }
}

export default manageCustomers;
