import * as actionTypes from "../../actions/LoginComponentActions";

const intialState = {
  user: {},
  bloodType: [],
};

const LoginReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.result,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
      };
    case actionTypes.BLOOD_SUCCESS:
      return {
        ...state,
        bloodType: action.result,
      };
    case actionTypes.BLOOD_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default LoginReducer;
