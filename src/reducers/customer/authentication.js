import { customerConstants } from '../../constants/customer';

export const initialState = {
  username: '',
  email: '',
  name: '',
  accesstoken: '',
  isLogin: false,
};
// let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
// const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function authentication(state = initialState, action) {
  switch (action.type) {
    case customerConstants.authentication.LOGIN: {
      const st = { ...state };
      console.log(action.data);
      if (action.data.status === 'fail') {
        st.accesstoken = 'err';
        //console.log(st);
        return st;
      } else {
        st.username = action.data.user.username;
        st.name = action.data.user.name;
        st.email = action.data.user.email;
        try {
          st.accesstoken = action.data.accesstoken;
          st.isLogin = true;
        } catch (err) {
          st.accesstoken = 'err';
        }
        console.log(st);
        return st;
      }
    }

    case customerConstants.authentication.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}

export default authentication;
