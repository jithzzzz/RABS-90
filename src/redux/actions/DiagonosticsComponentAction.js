import axios from "../../services/customAxios";
import { SERVER_BASE_URL } from "../../constants/configurations";

export const DIAGONOSTICS_DETAILS_SUCCESS = "DIAGONOSTICS_DETAILS_SUCCESS";
export const DIAGONOSTICS_DETAILS_FAILED = "DIAGONOSTICS_DETAILS_FAILED";

export const getDiagonosticsDetailsSuccess = (res) => {
  return {
    type: DIAGONOSTICS_DETAILS_SUCCESS,
    result: res,
  };
};
export const getDiagonosticsDetailsFailed = (res) => {
  return {
    type: DIAGONOSTICS_DETAILS_FAILED,
    result: res,
  };
};

export const getDiagonosticsDetails = (callback) => {
  return (dispatch) => {
    axios
      .get(`${SERVER_BASE_URL}dignosticsdetails`)
      .then((response) => {
        dispatch(getDiagonosticsDetailsSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(getDiagonosticsDetailsFailed());
      });
  };
};
export const getAddDiagonostics = (payload, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}dignosticsdetails`, payload)
      .then((response) => {
        callback(true);
      })
      .catch(function (error) {
        callback(false);
      });
  };
};
