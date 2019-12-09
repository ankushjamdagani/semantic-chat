import React from "react";
import moment from "moment";

import { Status } from "__CONSTANTS";

// import { TextInput, Validator } from "__COMPONENTS/shared/";

import "./styles.scss";

class FriendsList extends React.Component {
  state = {};

  render = () => {
    const { status, data, changeActiveFriend } = this.props;
    return (
      <div className="widget__container friends-list__container">
        <div className="widget__container-inner">
          <div className="widget__body friends-list__body">
            {status === Status.SUCCESS &&
              data &&
              data.map((x, index) => (
                <div key={index} onClick={() => changeActiveFriend(x)}>
                  <br />
                  {x.username}
                  <br />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };
}

export default FriendsList;
