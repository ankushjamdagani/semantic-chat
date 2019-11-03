import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { 
    Home, 
    Login 
} from '__COMPONENTS/views';
import PrivateRoute from './privateRoute';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/login' component={Login}/>
                {/* Write all private components inside PrivateRoute */}
                <PrivateRoute>
                    <Route path='/' component={Home}/>
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default Routes;