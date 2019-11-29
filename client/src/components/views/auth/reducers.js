import {
  AUTH__CHANGE_VIEW,
  AUTH__LOG_IN__PROGRESS,
  AUTH__LOG_IN__SUCCESS,
  AUTH__LOG_IN__ERROR,
  AUTH__REGISTER__PROGRESS,
  AUTH__REGISTER__SUCCESS,
  AUTH__REGISTER__ERROR,
  AUTH__LOG_OUT__PROGRESS,
  AUTH__LOG_OUT__SUCCESS,
  AUTH__LOG_OUT__ERROR,
  AUTH__FORGOT_PASSWORD__PROGRESS,
  AUTH__FORGOT_PASSWORD__SUCCESS,
  AUTH__FORGOT_PASSWORD__ERROR
} from './action-types';

const INITIAL_STATE = {
  activeView: 'LOG_IN',
  status: null,
  data: null,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case AUTH__CHANGE_VIEW: {
      return {
        ...state,
        activeView: action.payload,
        data: null
      }
    }

    case AUTH__LOG_IN__PROGRESS: {
      return {
        ...state,
        status: 'loading',
        data: null
      }
    }
    case AUTH__LOG_IN__SUCCESS: {
      return {
        ...state,
        status: 'success',
        data: action.payload
      }
    }
    case AUTH__LOG_IN__ERROR: {
      return {
        ...state,
        status: 'error',
        data: action.payload
      }
    }

    case AUTH__REGISTER__PROGRESS: {
      return {
        ...state,
        status: 'loading',
        data: null
      }
    }
    case AUTH__REGISTER__SUCCESS: {
      return {
        ...state,
        status: 'success',
        data: action.payload
      }
    }
    case AUTH__REGISTER__ERROR: {
      return {
        ...state,
        status: 'error',
        data: action.payload
      }
    }

    case AUTH__LOG_OUT__PROGRESS: {
      return {
        ...state,
        status: 'loading',
        data: null
      }
    }
    case AUTH__LOG_OUT__SUCCESS: {
      return {
        ...state,
        status: 'success',
        data: action.payload
      }
    }
    case AUTH__LOG_OUT__ERROR: {
      return {
        ...state,
        status: 'error',
        data: action.payload
      }
    }

    case AUTH__FORGOT_PASSWORD__PROGRESS: {
      return {
        ...state,
        status: 'loading',
        data: null
      }
    }
    case AUTH__FORGOT_PASSWORD__SUCCESS: {
      return {
        ...state,
        status: 'success',
        data: action.payload
      }
    }
    case AUTH__FORGOT_PASSWORD__ERROR: {
      return {
        ...state,
        status: 'error',
        data: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default loginReducer;