import axios from "axios";
import { SERVER_BASE_URL } from "../constants/configurations";

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};
const authToken = () => {
  const auth = localStorage.getItem("access-token");
  return auth;
};
const refresh = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  return refreshToken;
};
const storeToken = (newAccessToken) => {
  localStorage.setItem("access-token", newAccessToken);
};
// axios instance for making requests
const axiosInstance = axios.create(defaultOptions);

// request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  // add token to request headers
  if (localStorage.getItem("access-token")) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access-token"
    )}`;
  } else {
    config.headers["Authorization"] = null;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response, dispatch) => {
    return response;
    //   new Promise((resolve, reject) => {
    //   resolve(response);
    // })
  },

  (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    if (error.response.status === 403) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh_token");
      window.location = "/login";
    } else if (error.response.status === 409) {
      return new Promise((resolve, reject) => {
        resolve(error.response);
      });
    } else if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.config.url !== `${SERVER_BASE_URL}token/refresh/`
    ) {
      const refreshToken = refresh();
      originalRequest._retry = true;
      axiosInstance
        .post(`${SERVER_BASE_URL}token/refresh/`, {
          refresh: refreshToken,
        })
        .then(async (res) => {
          const access_token = res.data.access;
          storeToken(access_token);
          const auth = authToken();
          originalRequest.headers.Authurization = `Bearer ${auth}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh_token");
          window.location = "/login";
          return Promise.reject();
        });
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;
