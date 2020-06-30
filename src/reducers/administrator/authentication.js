import { administratorConstants } from "../../constants/administrator";

let inforLogin = JSON.parse(localStorage.getItem("inforLogin"));
const initiateState = inforLogin ? { loggedIn: true, inforLogin } : { loggingIn: false, inforLogin: { accesstoken: 'null' } };

function authentication(state = initiateState, action) {
    switch (action.type) {
        case administratorConstants.authentication.LOGIN_REQUEST: {
            return { ...state, loggingIn: true };
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
        default: return state;
    }
}

export default authentication;