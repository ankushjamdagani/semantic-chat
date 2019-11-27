import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { 
    Home, 
    Login ,
    Pallete,
    ReadMe
} from '__COMPONENTS/views';
import PrivateRoute from './privateRoute';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/pallete' component={Pallete}/>
                <Route exact path='/readme' component={ReadMe}/>
                {/* Write all private components inside PrivateRoute */}
                <PrivateRoute>
                    <Route path='/' component={Home}/>
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default Routes;