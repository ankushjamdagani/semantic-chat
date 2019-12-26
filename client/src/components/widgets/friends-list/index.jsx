import React from "react";
import moment from "moment";

import { Status } from "__CONSTANTS";

import { TextInput } from "__COMPONENTS/shared/";

import "./styles.scss";

class FriendsList extends React.Component {
  state = {
    searchString: ""
  };

  onFriendSearchChange = evt => {
    let value = evt.target.value;
    this.setState({
      searchString: value
    });
  };

  onFriendSearchSubmit = evt => {
    if (evt.keyCode == 13) {
      if (!this.state.searchString.trim()) {
        return;
      }
    }
  };

  handleFilter = friend => {
    const searchText = this.state.searchString;
    if (
      searchText &&
      friend.email.indexOf(searchText) === -1 &&
      friend.phone.indexOf(searchText) === -1 &&
      friend.username.indexOf(searchText) === -1
    ) {
      return false;
    }
    return true;
  };

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
            <div className="friends-search__container ts-h1">
              <TextInput
                name="friends-search-box"
                value={this.state.searchString}
                onChange={this.onFriendSearchChange}
                onKeyDown={this.onFriendSearchSubmit}
                placeholder="Find friends..."
              />
            </div>
            {status === Status.SUCCESS &&
              data &&
              data.filter(this.handleFilter).map((friend, index) => (
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
                    <div className="friend-item__content">
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
