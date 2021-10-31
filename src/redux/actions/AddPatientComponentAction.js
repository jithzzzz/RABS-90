import axios from "../../services/customAxios";
import { SERVER_BASE_URL } from "../../constants/configurations";

export const PATIENT_HISTORY_SUCCESS = "PATIENT_HISTORY_SUCCESS";
export const PATIENT_HISTORY_FAILED = "PATIENT_HISTORY_FAILED";

export const getAddPatient = (payload, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}patient-details`, payload)
      .then((response) => {
        callback(true);
      })
      .catch(function (error) {
        callback("Error,Request Failed");
      });
  };
};

export const getPatientHistorySuccess = (res) => {
  return {
    type: PATIENT_HISTORY_SUCCESS,
    result: res,
  };
};
export const getPatientHistoryFailed = (res) => {
  return {
    type: PATIENT_HISTORY_FAILED,
    result: res,
  };
};

export const getPatientHistory = (id, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}PatientHistory/${id}`)
      .then((response) => {
        dispatch(getPatientHistorySuccess(response.data));
        callback(true, response.data);
      })
      .catch(function (error) {
        dispatch(getPatientHistoryFailed());
      });
  };
};
