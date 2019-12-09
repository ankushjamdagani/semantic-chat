import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  changeActiveView,
  tryRegisteringIn,
  tryLoggingIn,
  tryLoggingOut,
  tryForgotPassword
} from "./actions";

import { LoginForm, RegisterForm } from "__COMPONENTS/widgets";

import { isUserLoggedIn } from "__SERVICES/auth";

import "./styles.scss";

const AUTH_VIEWS = {
  LOGIN_VIEW: 0,
  REGISTER_VIEW: 1,
  FORGOT_VIEW: 2
};
class Auth extends React.Component {
  componentDidMount() {
    this.redirectIfLoggedIn();
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn = () => {
    if (isUserLoggedIn()) {
      window.location.href = "/";
    }
  };

  goToRegisterView = e => {
    e.preventDefault();
    this.props.changeActiveView(AUTH_VIEWS.REGISTER_VIEW);
  };

  goToLoginView = e => {
    e.preventDefault();
    this.props.changeActiveView(AUTH_VIEWS.LOGIN_VIEW);
  };

  goToForgotView = e => {
    e.preventDefault();
    this.props.changeActiveView(AUTH_VIEWS.FORGOT_VIEW);
  };

  render() {
    const { activeView, status, data } = this.props;
    return (
      <div className="view__container auth__container">
        <div className="view__container--inner auth__inner-container">
          <div className="absolute-center">
            {(() => {
              switch (activeView) {
                case AUTH_VIEWS.REGISTER_VIEW:
                  return (
                    <RegisterForm
                      status={status}
                      submissionData={data}
                      onSubmit={this.props.tryRegisteringIn}
                      goToLoginView={this.goToLoginView}
                    />
                  );
                default:
                  return (
                    <LoginForm
                      status={status}
                      submissionData={data}
                      onSubmit={this.props.tryLoggingIn}
                      goToRegisterView={this.goToRegisterView}
                      goToForgotView={this.goToForgotView}
                    />
                  );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.auth
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeActiveView: bindActionCreators(changeActiveView, dispatch),
    tryLoggingIn: bindActionCreators(tryLoggingIn, dispatch),
    tryRegisteringIn: bindActionCreators(tryRegisteringIn, dispatch),
    tryLoggingOut: bindActionCreators(tryLoggingOut, dispatch),
    tryForgotPassword: bindActionCreators(tryForgotPassword, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
