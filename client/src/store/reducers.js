import { combineReducers } from "redux";

import authReducer from "../components/views/auth/reducers";
import homeReducer from "../components/views/home/reducers";

export default combineReducers({
  auth: authReducer,
  home: homeReducer,
});
