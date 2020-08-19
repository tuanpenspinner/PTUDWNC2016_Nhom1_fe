import { administratorConstants } from '../../constants/administrator';

const login = (username, password, role) => {
  return (dispatch) => {
    return fetch('http://localhost:3001/administrator/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) =>
      response.json().then((data) => {
        dispatch({
          type: administratorConstants.authentication.LOGIN_ADMIN,
          data,
          role,
        });
      })
    );
  };
};

export const authenticationAdminActions = {
  login,
  //logout,
  //changePassword,
};
