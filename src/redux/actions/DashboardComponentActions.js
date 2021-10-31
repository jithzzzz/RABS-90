import axios from "../../services/customAxios";
import { SERVER_BASE_URL } from "../../constants/configurations";

export const DASHBOARD_SUCCESS = "DASHBOARD_SUCCESS";
export const DASHBOARD_FAILED = "DASHBOARD_FAILED";

export const PATIENTS_SUCCESS = "PATIENTS_SUCCESS";
export const PATIENTS_FAILED = "PATIENTS_FAILED";

export const REFERENCE_SUCCESS = "REFERENCE_SUCCESS";
export const REFERENCE_FAILED = "REFERENCE_FAILED";

export const getDashboardSuccess = (res) => {
  return {
    type: DASHBOARD_SUCCESS,
    result: res,
  };
};
export const getDashboardFailed = (res) => {
  return {
    type: DASHBOARD_FAILED,
    result: res,
  };
};

export const getDashboard = (payload, callback) => {
  return (dispatch) => {
    axios
      .get(`${SERVER_BASE_URL}api/dashboard/`)
      .then((response) => {
        callback(true);
        dispatch(getDashboardSuccess(response.data.results[0]));
      })
      .catch(function (error) {
        callback("Error,Request Failed");
        dispatch(getDashboardFailed());
      });
  };
};

export const getPatientsSuccess = (res) => {
  return {
    type: PATIENTS_SUCCESS,
    result: res,
  };
};
export const getPatientsFailed = (res) => {
  return {
    type: PATIENTS_FAILED,
    result: res,
  };
};

export const getPatients = (payload, callback) => {
  return (dispatch) => {
    axios
      .get(`${SERVER_BASE_URL}patient-details`)
      .then((response) => {
        callback(true);
        dispatch(getPatientsSuccess(response.data));
      })
      .catch(function (error) {
        callback(false);
        dispatch(getPatientsFailed());
      });
  };
};

export const getPatientSearch = (payload, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}PatientHistorySearch/${payload}`)
      .then((response) => {
        // callback(true);
        if (response?.data?.OPID) {
          dispatch(getPatientsSuccess([response.data]));
        }
      })
      .catch(function (error) {
        //callback(false);
        dispatch(getPatientsFailed());
      });
  };
};

export const getPatientHistorySearch = (payload, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}PatientHistorySearch/${payload}`)
      .then((response) => {
        if (response?.data?.OPID) {
          callback({ status: true, data: response?.data });
        } else {
          callback({ status: false });
        }
      })
      .catch(function (error) {
        callback({ status: false });
      });
  };
};

export const getReferenceSuccess = (res) => {
  return {
    type: REFERENCE_SUCCESS,
    result: res,
  };
};
export const getReferenceFailed = (res) => {
  return {
    type: REFERENCE_FAILED,
    result: res,
  };
};

export const getReference = (payload, callback) => {
  return (dispatch) => {
    axios
      .get(`${SERVER_BASE_URL}referancedetails`)
      .then((response) => {
        callback(true);
        dispatch(getReferenceSuccess(response.data));
      })
      .catch(function (error) {
        callback(false);
        dispatch(getReferenceFailed());
      });
  };
};
export const getAddReference = (payload, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}referancedetails`,payload)
      .then((response) => {
        callback(true);
        
      })
      .catch(function (error) {
        callback(false);
        
      });
  };
};
