import { customerConstants } from '../../constants/customer';

export const initialState = {
  historyTransfer: [],
  historyReceive: [],
  historyPayDebt: [],
};
function getHistoryDeal(state = initialState, action) {
  switch (action.type) {
    case customerConstants.historyDeal.GET_HISTORY_TRANSFER_CUSTOMER: {
      const st = { ...state };
      if (action.data.status === 'success') {
        st.historyTransfer = action.data.historyTransfer;
      }
      return st;
    }
    case customerConstants.historyDeal.GET_HISTORY_RECEIVE_CUSTOMER: {
        const st = { ...state };
        if (action.data.status === 'success') {
          st.historyReceive = action.data.historyReceive;
        }
        return st;
      }
      case customerConstants.historyDeal.GET_HISTORY_PAY_DEBT_CUSTOMER: {
        const st = { ...state };
        if (action.data.status === 'success') {
          st.historyPayDebt = action.data.historyPayDebt;
        }
        return st;
      }
    default:
      return state;
  }
}

export default getHistoryDeal;
