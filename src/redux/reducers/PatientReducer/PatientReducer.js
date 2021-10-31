import * as actionTypes from "../../actions/AddPatientComponentAction";

const intialState = {
  patientHistory: {},
};

const PatientReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.PATIENT_HISTORY_SUCCESS:
      return {
        ...state,
        patientHistory: action.result,
      };
    case actionTypes.PATIENT_HISTORY_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default PatientReducer;
