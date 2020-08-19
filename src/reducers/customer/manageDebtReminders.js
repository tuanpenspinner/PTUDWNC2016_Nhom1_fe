import { customerConstants } from '../../constants/customer';
import openSocket from 'socket.io-client';
export const initialState = {
  allDebtReminders: {
    listOfMe: [],
    listOfOthers: [],
  },
  info: null,
  listDebtNotPaid: [],
  name: null,
  amount: null,
  accountNumber: null,
  email: null,
  socket: null,
};
// let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
// const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function manageDebtReminders(state = initialState, action) {
  switch (action.type) {
    case customerConstants.debtReminder.CONNECT_SOCKET_IO_HOST: {
      const options = {
        rememberUpgrade: true,
        transports: ['websocket'],
        secure: true,
        rejectUnauthorized: false,
      };
      const socket = openSocket('https://great-banking.herokuapp.com', options);
      const st = { ...state };
      st.socket = socket;
      return { ...st };
    }
    case customerConstants.debtReminder.GET_ALL_DEBT_REMINDERS: {
      const st = { ...state };
      if (action.data.status === 'failed') {
        return st;
      } else {
        //gans kết quả từ api vào biến của initialState
        // if (action.data.listReminders.listOfMe.length > 0) {
        //   action.data.listReminders.listOfMe.map((item) => {
        //     st.allDebtReminders.listOfMe = [
        //       ...st.allDebtReminders.listOfMe,
        //       item,
        //     ];
        //   });
        // }
        // if (action.data.listReminders.listOfOthers.length > 0) {
        //   action.data.listReminders.listOfOthers.map((item) => {
        //     st.allDebtReminders.listOfOthers = [
        //       ...st.allDebtReminders.listOfOthers,
        //       item,
        //     ];
        //   });
        // }

        st.listDebtNotPaid = action.data.listReminders.listOfOthers.filter(
          (item) => {
            return item.pay.isPaid === false && !item.deleteReminder.isDeleted;
          }
        );

        st.allDebtReminders.listOfOthers =
          action.data.listReminders.listOfOthers;
        st.allDebtReminders.listOfMe = action.data.listReminders.listOfMe;
        return st;
      }
    }
    case customerConstants.debtReminder.GET_LIST_RECEIVER: {
      const st = { ...state };
      st.listReceiver = action.listReceiver;
      st.name = action.name;
      st.accountNumber = action.accountNumber;
      st.amount = action.amount;
      st.email = action.email;
      st.username = action.username;
      return st;
    }
    default:
      return state;
  }
}

export default manageDebtReminders;
