import { customerConstants } from '../../constants/customer';
import { act } from 'react-test-renderer';

export const initialState = {
  username: '',
  email: '',
  name: '',
  checkingAccount: '',
  savingsAccount: [],
  phone: '',
};
// let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
// const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function profile(state = initialState, action) {
  switch (action.type) {
    case customerConstants.info.SAVE_PROFILE: {
      const st = { ...state };

      st.username = action.info.username;
      st.name = action.info.name;
      st.phone = action.info.phone;
      st.email = action.info.email;
      st.savingsAccount = action.info.savingsAccount;
      st.checkingAccount = action.info.checkingAccount;

      return st;
    }

    default:
      return state;
  }
}

export default profile;
