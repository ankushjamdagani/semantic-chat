import { Endpoints } from "__CONSTANTS";
import { clearUserData } from "__SERVICES/auth";

import {
  LOG_OUT__PROGRESS,
  LOG_OUT__SUCCESS,
  LOG_OUT__ERROR
} from "./action-types";

const logoutProgress = data => {
  return {
    type: LOG_OUT__PROGRESS,
    payload: data
  };
};

const logoutError = data => {
  clearUserData();
  window.location.href = "/auth";
  return {
    type: LOG_OUT__ERROR,
    payload: data
  };
};
const logoutComplete = () => {
  clearUserData();
  window.location.href = "/auth";
  return {
    type: LOG_OUT__SUCCESS,
    payload: data
  };
};

export const tryLoggingOut = data => {
  return dispatch => {
    dispatch(logoutProgress());
    fetch(Endpoints.AUTH_URL + "/logout", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        dispatch(logoutComplete());
      })
      .catch(err => {
        dispatch(logoutError());
      });
  };
};
