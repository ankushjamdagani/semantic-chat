import { combineReducers } from "redux";

import logoutReducer from "../components/hoc/with-logout/reducers";
import authReducer from "../components/views/auth/reducers";
import homeReducer from "../components/views/home/reducers";

export default combineReducers({
  logout: logoutReducer,
  auth: authReducer,
  home: homeReducer
});
