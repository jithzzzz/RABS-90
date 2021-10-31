import axios from "../../services/customAxios";
import { SERVER_BASE_URL } from "../../constants/configurations";

export const PRESCRIPTION_MED = "PRESCRIPTION_MED";

export const preMedSuccess = (res) => {
  return {
    type: PRESCRIPTION_MED,
    result: res,
  };
};
export const preMed = (payload, callback) => {
  return (dispatch) => {
    dispatch(preMedSuccess(payload));
  };
};

export const addPrescription = (payload, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}new-prescription`, payload)
      .then((response) => {
        callback(true, response.data.id);
      })
      .catch(function (error) {
        callback(false);
      });
  };
};
