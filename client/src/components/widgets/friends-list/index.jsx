import React from "react";
import moment from "moment";

import { Status } from "__CONSTANTS";

// import { TextInput, Validator } from "__COMPONENTS/shared/";

import "./styles.scss";

class FriendsList extends React.Component {
  state = {};

  componentDidMount = () => {};

  render = () => {
    const { status, data } = this.props;
    return (
      <div className="widget__container friends-list__container">
        <div className="widget__container-inner">
          <div className="widget__body friends-list__body">
            {status === Status.SUCCESS &&
              data &&
              data.map((x, index) => <div key={index}>{x.email}</div>)}
          </div>
        </div>
      </div>
    );
  };
}

export default FriendsList;
