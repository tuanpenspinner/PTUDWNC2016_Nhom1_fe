import { administratorConstants } from '../../constants/administrator';

export const initialState = {
  username: '',
  email: '',
  name: '',
  phone: '',
  accessToken: '',
  refreshToken: '',
  isLogin: false,
};

function authentication(state = initialState, action) {
  switch (action.type) {
    case administratorConstants.authentication.LOGIN_ADMIN: {
      const st = { ...state };

      st.role = action.role;
      if (action.data.status === 'fail') {
        st.accessToken = 'err';
        //console.log(st);
      } else {
        st.username = action.data.admin.username;
        st.name = action.data.admin.name;
        st.email = action.data.admin.email;
        st.phone = action.data.admin.phone;
        try {
          st.accessToken = action.data.accessToken;
          st.refreshToken = action.data.refreshToken;
          st.isLogin = true;
        } catch (err) {
          st.accessToken = 'err';
        }
      }

      return st;
    }
    case administratorConstants.authentication.LOGIN_SUCCESS: {
      return { ...state, loggedIn: true, inforLogin: action.inforLogin };
    }
    case administratorConstants.authentication.LOGIN_FAILURE: {
      return { loggingIn: false, inforLogin: { accesstoken: 'null' } };
    }
    case administratorConstants.authentication.LOGOUT: {
      return { loggingIn: false, inforLogin: { accesstoken: 'null' } };
    }
    default:
      return state;
  }
}

export default authentication;
