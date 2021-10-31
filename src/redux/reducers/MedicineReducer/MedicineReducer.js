import * as actionTypes from "../../actions/MedicineComponentAction";

const intialState = {
  medicineDetails: [],
};

const MedicineReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.MEDICINE_DETAILS_SUCCESS:
      return {
        ...state,
        medicineDetails: action.result,
      };
    case actionTypes.MEDICINE_DETAILS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default MedicineReducer;
