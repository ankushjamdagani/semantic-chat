import { combineReducers } from "redux";

import authReducer from "../components/views/auth/reducers";

export default combineReducers({
  auth: authReducer
});
