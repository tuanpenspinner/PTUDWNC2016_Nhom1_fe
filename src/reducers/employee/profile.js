import { employeeConstants } from '../../constants/employee';

export const initialState = {
  username: '',
  email: '',
  name: '',
  phone: '',
};

function profile(state = initialState, action) {
  switch (action.type) {
    case employeeConstants.info.SAVE_PROFILE_EMP: {
      const st = { ...state };
        st.username = action.data.username;
        st.name = action.data.name;
        st.phone = action.data.phone;
        st.email = action.data.email;
      return st;
    }

    default:
      console.log(state);
      return state;
  }
}

export default profile;
