import {
  CURRENT_USER,
  ERROR,
  LOADING,
  LOGIN_USER,
  NOTIFICATIONS,
} from "../constants/actions-types";
import axios from "axios";
import { errorToast, successToast, url } from "../../utils";
export const current = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    let result = await axios
      .get(`${url}/api/v1/auth/current`, config)
      .catch((err) => {
        if (err.response.data.message === "Invalid token") {
          localStorage.removeItem("accessToken");
          window.location.reload();
        }
      });
    if (result.data.status) {
      dispatch({ type: CURRENT_USER, payload: result.data });
    }
  } catch (error) {
    console.log(error);
  }
};
export const register =
  ({ registredUser, navigate }) =>
  (dispatch) => {
    dispatch({ type: LOADING });
    axios
      .post(`${url}/api/v1/auth/register`, registredUser)
      .then((response) => {
        dispatch({ type: LOADING });
        successToast(response.data.message);
        navigate("/login");
      })
      .catch((err) => {
        dispatch({ type: LOADING });
        dispatch({ type: ERROR, payload: err.response.data.message });
      });
  };
export const login =
  ({ loginDetails, navigate }) =>
  async (dispatch) => {
    dispatch({ type: LOADING });
    axios
      .post(`${url}/api/v1/auth/login`, loginDetails)
      .then(async (response) => {
        await dispatch({ type: LOGIN_USER, payload: response.data.data });
        await dispatch(current());
        navigate("/task-list");
        successToast(response.data.message);
      })
      .catch((err) => {
        errorToast(err.response.data.message);
        dispatch({ type: ERROR, payload: err.response.data.message });
      });
  };
export const notifications = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .get(`${url}/api/v1/auth/notifications`, config)
    .then(async (response) => {
      await dispatch({ type: NOTIFICATIONS, payload: response.data.data });
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
export const Make_notification_readed = () => async (dispatch) => {
  const config = {
    headers: {
      authorization: localStorage.getItem("accessToken"),
    },
  };
  axios
    .put(`${url}/api/v1/auth/make-notification-readed`, {}, config)
    .then(async (response) => {
      await dispatch(notifications());
    })
    .catch((err) => {
      errorToast(err.response.data.message);
    });
};
