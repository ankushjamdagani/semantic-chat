import {
    useHistory
} from 'react-router-dom';

import {
    isUserLoggedIn,
    getUserData
} from '__SERVICES/auth'

const PrivateRoute = ({children}) => {
    const history = useHistory();
    const isLoggedIn = isUserLoggedIn();

    if(isLoggedIn) {
        return children
    }
    else {
        history.push("/login")
        return null;
    }
}

export default PrivateRoute