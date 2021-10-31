import * as actionTypes from "../../actions/DiagonosticsComponentAction";

const intialState = {
  diagonosticsDetails: [],
};

const DiagonosticsReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.DIAGONOSTICS_DETAILS_SUCCESS:
      return {
        ...state,
        diagonosticsDetails: action.result,
      };
    case actionTypes.DIAGONOSTICS_DETAILS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default DiagonosticsReducer;
