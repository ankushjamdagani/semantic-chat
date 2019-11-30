import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./styles.scss";
import {
  changeActiveView,
  tryRegisteringIn,
  tryLoggingIn,
  tryLoggingOut,
  tryForgotPassword
} from "./actions";

import { LoginForm } from "__COMPONENTS/widgets";

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }
  login(formData) {
    this.props.tryLoggingIn(formData);
  }
  render() {
    const { activeView } = this.props;
    return (
      <div className="view__container auth__container">
        <div className="view__container--inner auth__inner-container">
          <div className="absolute-center">
            <LoginForm onSubmit={this.login} />
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
