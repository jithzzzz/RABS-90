import axios from "../../services/customAxios";
import { SERVER_BASE_URL } from "../../constants/configurations";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const BLOOD_SUCCESS = "BLOOD_SUCCESS";
export const BLOOD_FAILED = "BLOOD_FAILED";

export const loginSuccess = (res) => {
  return {
    type: LOGIN_SUCCESS,
    result: res,
  };
};
export const loginFailed = (res) => {
  return {
    type: LOGIN_FAILED,
    result: res,
  };
};
export const BloodSuccess = (res) => {
  return {
    type: BLOOD_SUCCESS,
    result: res,
  };
};
export const BloodFailed = (res) => {
  return {
    type: BLOOD_FAILED,
    result: res,
  };
};
export const logInAction = (payload, callback) => {
  return (dispatch) => {
    axios
      .get(`${SERVER_BASE_URL}bloodtypes`)
      .then((response) => {
        dispatch(BloodSuccess(response.data));
      })
      .catch((error) => {
        dispatch(BloodFailed());
      });
    axios
      .post(`${SERVER_BASE_URL}Login`, payload)
      .then((response) => {
        if (response.status === 200) {
          callback({
            status: true,
            token: {
              access_token: response.data[0].PublickTocken,
              // refresh_token: response.data.refresh_token,
            },
          });
        }
        dispatch(loginSuccess(response.data[0]));
        axios
          .get(`${SERVER_BASE_URL}bloodtypes`)
          .then((response) => {
            dispatch(BloodSuccess(response.data));
          })
          .catch((error) => {
            dispatch(BloodFailed());
          });
      })
      .catch((error) => {
        callback({ status: false });
        dispatch(loginFailed(error.response));
      });
  };
};

export const ChangePassword = (data, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}change-password`, data)
      .then((response) => {
        callback(true);
      })
      .catch(function (error) {
        callback(false);
      });
  };
};

export const Logout = (data, callback) => {
  return (dispatch) => {
    axios
      .post(`${SERVER_BASE_URL}LogOut`, data)
      .then((response) => {
        callback(true);
      })
      .catch(function (error) {
        callback(false);
      });
  };
};
