import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
  ;

import './styles.scss';
import {
  changeActiveView,
  tryRegisteringIn,
  tryLoggingIn,
  tryLoggingOut,
  tryForgotPassword
} from './actions';

class Auth extends React.Component {
  login() {
    this.props.tryLoggingIn({ email: 'anqush.jamdagani@gmail.com', password: 'ankush' })
  }
  render() {
    const { activeView } = this.props;
    return (
      <div className="view__container auth__container">
        <div className="view__container--inner auth__inner-container">
          <div className="absolute-center">
            <button
              onClick={this.login.bind(this)}
            >{activeView}</button>

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
    changeActiveView: bindActionCreators(changeActiveView, dispatch),
    tryLoggingIn: bindActionCreators(tryLoggingIn, dispatch),
    tryRegisteringIn: bindActionCreators(tryRegisteringIn, dispatch),
    tryLoggingOut: bindActionCreators(tryLoggingOut, dispatch),
    tryForgotPassword: bindActionCreators(tryForgotPassword, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);