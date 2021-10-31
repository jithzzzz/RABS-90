import axios from "../../services/customAxios";
import { SERVER_BASE_URL } from "../../constants/configurations";

export const MEDICINE_DETAILS_SUCCESS = "MEDICINE_DETAILS_SUCCESS";
export const MEDICINE_DETAILS_FAILED = "MEDICINE_DETAILS_FAILED";

export const getMedicineDetailsSuccess = (res) => {
  return {
    type: MEDICINE_DETAILS_SUCCESS,
    result: res,
  };
};
export const getMedicineDetailsFailed = (res) => {
  return {
    type: MEDICINE_DETAILS_FAILED,
    result: res,
  };
};

export const getMedicineDetails = (callback) => {
  return (dispatch) => {
    axios
      .get(`${SERVER_BASE_URL}meds-details`)
      .then((response) => {
        dispatch(getMedicineDetailsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(getMedicineDetailsFailed());
      });
  };
};
export const getAddMedicine = (payload, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}meds-details`, payload)
      .then((response) => {
        callback(true);
      })
      .catch(function (error) {
        callback(false);
      });
  };
};
