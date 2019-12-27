import {
  LOG_OUT__PROGRESS,
  LOG_OUT__SUCCESS,
  LOG_OUT__ERROR
} from "./action-types";

import { Status } from "__CONSTANTS";

const INITIAL_STATE = {
  logoutStatus: null,
  logoutData: null
};

const logoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_OUT__PROGRESS: {
      return {
        ...state,
        logoutStatus: Status.LOADING,
        logoutData: null
      };
    }
    case LOG_OUT__SUCCESS: {
      return {
        ...state,
        logoutStatus: Status.SUCCESS,
        logoutData: action.payload
      };
    }
    case LOG_OUT__ERROR: {
      return {
        ...state,
        logoutStatus: Status.ERROR,
        logoutData: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default logoutReducer;
