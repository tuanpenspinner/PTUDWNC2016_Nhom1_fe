import { customerConstants } from '../../constants/customer';

export const initialState = {
  allDebtReminders: {
    listOfMe: [],
    listOfOthers: [],
  },
};
// let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
// const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function manageDebtReminders(state = initialState, action) {
  switch (action.type) {
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
        st.allDebtReminders.listOfOthers=action.data.listReminders.listOfOthers;
        st.allDebtReminders.listOfMe=action.data.listReminders.listOfMe;
        console.log('++++++++++++++++++++' + JSON.stringify(st));
        return st;
      }
    }
    default:
      return state;
  }
}

export default manageDebtReminders;
