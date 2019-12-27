import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { tryLoggingOut } from "./actions";

export default function withLogout(Component) {
  class WrapComponentWithAuthActions extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      tryLoggingOut: bindActionCreators(tryLoggingOut, dispatch)
    };
  };

  return connect(undefined, mapDispatchToProps)(WrapComponentWithAuthActions);
}
