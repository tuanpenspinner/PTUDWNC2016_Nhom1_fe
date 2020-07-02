import { employeeConstants } from '../../constants/employee';

export const initialState = {
  username: '',
  email: '',
  name: '',
  phone: '',
  resultUpdate: '',
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
    case employeeConstants.info.UPDATE_PROFILE_EMP:{
      const st = { ...state };
      if(action.data.status==='failed')
      {
        st.resultUpdate='falied';
      }
      else{
        st.resultUpdate='success';
        st.name = action.data.updatedEmployee.name;
        st.phone = action.data.updatedEmployee.phone;
        st.email = action.data.updatedEmployee.email;
      }
      console.log(st);
      return st;
    }
    default:
      console.log(state);
      return state;
  }
}

export default profile;
