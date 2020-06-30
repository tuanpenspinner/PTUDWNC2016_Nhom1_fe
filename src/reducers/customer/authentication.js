import { customerConstants } from '../../constants/customer';

export const initialState = {
  username: '',
  email: '',
  name: '',
  accessToken: '',
  refreshToken:'',
  isLogin: false,
};
// let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
// const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function authentication(state = initialState, action) {
  switch (action.type) {
    case customerConstants.authentication.LOGIN: {
      const st = { ...state };
      // console.log(action.data);
      if (action.data.status === 'fail') {
        st.accessToken = 'err';
        //console.log(st);
      } else {
        st.username = action.data.customer.username;
        st.name = action.data.customer.name;
        st.email = action.data.customer.email;
        try {
          st.accessToken = action.data.accessToken;
          st.refreshToken = action.data.refreshToken;
          st.isLogin = true;
        } catch (err) {
          st.accessToken = 'err';
        }
        console.log(st);
      }
      return st;
    }

    case customerConstants.authentication.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}

export default authentication;
