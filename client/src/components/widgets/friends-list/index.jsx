import React from "react";
import moment from "moment";

import { Status } from "__CONSTANTS";

// import { TextInput, Validator } from "__COMPONENTS/shared/";

import "./styles.scss";

class FriendsList extends React.Component {
  state = {};

  render = () => {
    const {
      status,
      data,
      activeFriend,
      unseenMessages,
      changeActiveFriend
    } = this.props;
    return (
      <div className="widget__container friends-list__container">
        <div className="widget__container-inner">
          <div className="widget__body friends-list__body">
            {status === Status.SUCCESS &&
              data &&
              data.map((friend, index) => (
                <div
                  key={index}
                  onClick={() => changeActiveFriend(friend)}
                  className="friend-item__container"
                >
                  <div
                    className={`friend-item__body ${
                      activeFriend && activeFriend._id === friend._id
                        ? "active"
                        : ""
                    }`}
                  >
                    {unseenMessages[friend._id] && (
                      <div className="friend-item__seen-count ts-xs bg-color-1 tc-white tw-very-heavy"></div>
                    )}
                    <div className="friend-item__thumb ts-xl">
                      {friend.username[0]}
                    </div>
                    <div className="friend-item__content tx-md">
                      <div className="primary-content ts-md">
                        {friend.username}
                      </div>
                      <div className="secondary-content ts-xs tc-grey-2">
                        {friend.phone}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };
}

export default FriendsList;
