import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Auth, Pallete, ReadMe } from "__COMPONENTS/views";
import PrivateRoute from "./privateRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/auth/*" component={Auth} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/login/*" component={Auth} />
        <Route exact path="/pallete" component={Pallete} />
        <Route exact path="/readme" component={ReadMe} />
        {/* Write all private components inside PrivateRoute */}
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;
