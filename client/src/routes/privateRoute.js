import { useHistory } from "react-router-dom";

import { getUserData, clearUserData } from "__SERVICES/auth";

const PrivateRoute = ({ children }) => {
  const history = useHistory();

  if (!!getUserData()) {
    return children;
  } else {
    clearUserData();
    history.push("/auth");
    return null;
  }
};

export default PrivateRoute;
