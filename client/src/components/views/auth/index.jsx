import React from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import {
  tryRegisteringIn,
  tryLoggingIn,
  tryLoggingOut,
  tryForgotPassword
} from './actions';

class Auth extends React.Component {
    render() {
        return (
            <div className="view__container auth__container">
                <div className="view__container--inner auth__inner-container">
                    <div className="absolute-center">
                        Please auth
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.auth
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    tryRegisteringIn:   (data) => dispatch(tryRegisteringIn(data)),
    tryLoggingIn:       (data) => dispatch(tryLoggingIn(data)),
    tryLoggingOut:      (data) => dispatch(tryLoggingOut(data)),
    tryForgotPassword:  (data) => dispatch(tryForgotPassword(data))
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Auth);