import * as actionTypes from "../../actions/DashboardComponentActions";

const intialState = {
  dashboardConfig: {},
  patientRecord: [],
  reference: [],
};

const DashboardReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardConfig: action.result,
      };
    case actionTypes.DASHBOARD_FAILED:
      return {
        ...state,
      };
    case actionTypes.PATIENTS_SUCCESS:
      return {
        ...state,
        patientRecord: action.result,
      };
    case actionTypes.PATIENTS_FAILED:
      return {
        ...state,
      };
    case actionTypes.REFERENCE_SUCCESS:
      return {
        ...state,
        reference: action.result,
      };
    case actionTypes.REFERENCE_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default DashboardReducer;
