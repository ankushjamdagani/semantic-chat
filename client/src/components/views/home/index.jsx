import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import io from "socket.io-client";

import { Endpoints } from "__CONSTANTS";
import { isUserLoggedIn, getUserData } from "__SERVICES/auth";
import { ChatBox, FriendsList } from "__COMPONENTS/widgets";

import {
  preserveSocketConn,
  updateFriendsList,
  updateMessagesList,
  tryFetchingAllFriends,
  tryFetchingAllMessages
} from "./actions";
import "./styles.scss";

class Home extends React.Component {
  // Get data for previous messages and friends with their online status
  componentDidMount = () => {
    const { socketConn } = this.props;
    if (isUserLoggedIn() && !socketConn) {
      this.initiateSocketConn();
    }
  };

  componentDidUpdate = () => {
    const { socketConn } = this.props;
    // console.log("Update - socketConn - ", socketConn);
    if (isUserLoggedIn() && !socketConn) {
      this.initiateSocketConn();
    }
  };

  initiateSocketConn = () => {
    const socket = io(Endpoints.CHAT_URL);
    const userData = getUserData();
    userData &&
      socket.on("connect", () => {
        socket.emit("i_have_joined", userData._id);
        this.bindSocketListeners(socket);
        this.fetchInitialData(socket);
        this.props.preserveSocketConn(socket);
      });
    // else reconnect cycle............
  };

  bindSocketListeners = socket => {
    socket.on("message", this.props.updateMessagesList);
    socket.on("friends_update", this.props.updateFriendsList);
    window.addEventListener("beforeunload", function() {
      socket.close();
    });
    window.addEventListener("socket_send_message", messgeData => {
      socket.emit("message", messgeData, data => {
        this.props.updateMessagesList(data);
      });
    });
  };

  fetchInitialData = () => {
    this.props.tryFetchingAllFriends();
    // this.props.tryFetchingAllMessages();
  };

  getMessageData = (friend, messages) => {
    return (messages && friend.id && messages[friend.id]) || [];
  };

  render() {
    const { friends, messages, activeFriend = {} } = this.props;
    const messageData = this.getMessageData(activeFriend, messages.data);

    return (
      <div className="view__container home__container">
        <div className="view__container--inner">
          <div className="view__body row">
            <div className="col-xs-4">
              <FriendsList data={friends.data} status={friends.status} />
            </div>
            <div className="col-xs-8">
              <ChatBox
                data={messageData}
                friend={activeFriend}
                status={messages.status}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.home
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    preserveSocketConn: bindActionCreators(preserveSocketConn, dispatch),
    updateFriendsList: bindActionCreators(updateFriendsList, dispatch),
    updateMessagesList: bindActionCreators(updateMessagesList, dispatch),
    tryFetchingAllFriends: bindActionCreators(tryFetchingAllFriends, dispatch),
    tryFetchingAllMessages: bindActionCreators(tryFetchingAllMessages, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
