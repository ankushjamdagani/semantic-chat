import { Endpoints } from "__CONSTANTS";
import { setUserData } from "__SERVICES/auth";

import {
  AUTH__CHANGE_VIEW,
  AUTH__LOG_IN__PROGRESS,
  AUTH__LOG_IN__SUCCESS,
  AUTH__LOG_IN__ERROR,
  AUTH__REGISTER__PROGRESS,
  AUTH__REGISTER__SUCCESS,
  AUTH__REGISTER__ERROR,
  AUTH__FORGOT_PASSWORD__PROGRESS,
  AUTH__FORGOT_PASSWORD__SUCCESS,
  AUTH__FORGOT_PASSWORD__ERROR
} from "./action-types";

export const changeActiveView = data => {
  return {
    type: AUTH__CHANGE_VIEW,
    payload: data
  };
};

const loginProgress = data => {
  return {
    type: AUTH__LOG_IN__PROGRESS
  };
};
const loginComplete = data => {
  return {
    type: AUTH__LOG_IN__SUCCESS,
    payload: data
  };
};
const loginError = data => {
  return {
    type: AUTH__LOG_IN__ERROR,
    payload: data
  };
};

export const tryLoggingIn = data => {
  return dispatch => {
    dispatch(loginProgress());
    fetch(Endpoints.AUTH_URL + "/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        const isSuccess = res && res.status && res.status === "SUCCESS";
        if (isSuccess) {
          setUserData(res.data);
          dispatch(loginComplete(res.data));
        } else {
          dispatch(loginError(res.error));
        }
      })
      .catch(err => {
        dispatch(loginError(err));
      });
  };
};

const registerProgress = data => {
  return {
    type: AUTH__REGISTER__PROGRESS,
    payload: data
  };
};
const registerComplete = data => {
  // Redirect to dashboard
  return {
    type: AUTH__REGISTER__SUCCESS,
    payload: data
  };
};
const registerError = data => {
  return {
    type: AUTH__REGISTER__ERROR,
    payload: data
  };
};

export const tryRegisteringIn = data => {
  return dispatch => {
    dispatch(registerProgress());
    fetch(Endpoints.AUTH_URL + "/register", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        const isSuccess = res && res.status && res.status === "SUCCESS";
        if (isSuccess) {
          dispatch(
            tryLoggingIn({
              email: data.email,
              password: data.password
            })
          );
          dispatch(registerComplete(res.data));
        } else {
          dispatch(registerError(res.error));
        }
      })
      .catch(err => {
        dispatch(registerError(err));
      });
  };
};

const forgotPasswordProgress = data => {
  return {
    type: AUTH__FORGOT_PASSWORD__PROGRESS,
    payload: data
  };
};
const forgotPasswordComplete = data => {
  // Redirect to login
  return {
    type: AUTH__FORGOT_PASSWORD__SUCCESS,
    payload: data
  };
};
const forgotPasswordError = data => {
  return {
    type: AUTH__FORGOT_PASSWORD__ERROR,
    payload: data
  };
};

export const tryForgotPassword = data => {
  return dispatch => {
    dispatch(forgotPasswordProgress());
    fetch(Endpoints.AUTH_URL + "/forgot_password", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => dispatch(forgotPasswordComplete(res.data)))
      .catch(err => dispatch(forgotPasswordError(err)));
  };
};
