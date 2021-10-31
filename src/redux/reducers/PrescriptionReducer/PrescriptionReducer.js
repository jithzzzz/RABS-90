import * as actionTypes from "../../actions/prescriptionComponentAction";

const intialState = {
  preMed: [],
};

const PrescriptionReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.PRESCRIPTION_MED:
      return {
        ...state,
        preMed: action.result,
      };
    default:
      return state;
  }
};

export default PrescriptionReducer;
