import { customerConstants } from '../../constants/customer';

const login = (username, password, role) => {
  return (dispatch) => {
    return fetch('http://localhost:3001/customers/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) =>
      response.json().then((data) => {
        dispatch({ type: customerConstants.authentication.LOGIN, data });
      })
    );
  };
};

export const authenticationCustomerActions = {
  login,
  //logout,
  //changePassword,
};
