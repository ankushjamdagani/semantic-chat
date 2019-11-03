import React from 'react';
import './styles.scss';

class Login extends React.Component {
    render() {
        return (
            <div className="view__container login__container">
                <div className="view__container--inner login__inner-container">
                    <div className="absolute-center">
                        Please login
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;