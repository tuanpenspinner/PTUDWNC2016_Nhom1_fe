import { administratorConstants } from '../../constants/administrator';
export const initialState = {
  transactionHistory: [],
};

function revenueStatistics(state = initialState, action) {
  switch (action.type) {
    case administratorConstants.statistic.GET_TRANSACTION_HISTORY: {
      const st = { ...state };
      if (action.transactionHistory.status === 'success') {
        st.transactionHistory = [...action.transactionHistory.transactionHistory];
      }
      return st;
    }

    default:
      return state;
  }
}

export default revenueStatistics;
