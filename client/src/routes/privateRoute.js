import React from "react";
import { useHistory, Route } from "react-router-dom";

import { getUserData, clearUserData } from "__SERVICES/auth";
import { WithLogoutHOC } from "__COMPONENTS/hoc";

const PrivateRoute = ({ path, component, ...rest }) => {
  const history = useHistory();

  if (!!getUserData()) {
    return <Route path={path} component={WithLogoutHOC(component)} {...rest} />;
  } else {
    clearUserData();
    history.push("/auth");
    return null;
  }
};

export default PrivateRoute;
