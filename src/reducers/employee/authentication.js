import { employeeConstants } from '../../constants/employee';

export const initialState = {
  username: '',
  email: '',
  name: '',
  accessToken: '',
  refreshToken:'',
  isLogin: false,
  role: '',
};
// let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
// const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function authentication(state = initialState, action) {
  switch (action.type) {
    case employeeConstants.authentication.LOGIN_EMP: {
      const st = { ...state };
      console.log(action.data);

      st.role = action.role;
      if (action.data.status === 'fail') {
        st.accessToken = 'err';
        return st;
        // eslint-disable-next-line no-else-return
      } else {
        st.username = action.data.user.username;
        st.name = action.data.user.name;
        st.email = action.data.user.email;
        try {
          st.accessToken = action.data.accessToken;
          st.refreshToken = action.data.refreshToken;
          st.isLogin = true;
        } catch (err) {
          st.accessToken = 'err';
        }
        //console.log(st);
        return st;
      }
    }

    case employeeConstants.authentication.LOGOUT_EMP: {
      return initialState;
    }
    default:
      return state;
  }
}

export default authentication;
