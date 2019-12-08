import { useHistory } from "react-router-dom";

import { isUserLoggedIn, clearUserData } from "__SERVICES/auth";

const PrivateRoute = ({ children }) => {
  const history = useHistory();

  if (isUserLoggedIn()) {
    return children;
  } else {
    clearUserData();
    history.push("/auth");
    return null;
  }
};

export default PrivateRoute;
