import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import io from "socket.io-client";

import { Endpoints } from "__CONSTANTS";
import { getUserData, clearUserData } from "__SERVICES/auth";
import { ChatBox, FriendsList } from "__COMPONENTS/widgets";

import {
  preserveSocketConn,
  updateFriendsList,
  updateMessagesList,
  changeActiveFriend,
  tryFetchingAllFriends,
  tryFetchingAllMessages
} from "./actions";
import "./styles.scss";

class Home extends React.Component {
  // Get data for previous messages and friends with their online status
  componentDidMount = () => {
    const { socketConn } = this.props;
    if (!!getUserData() && !socketConn) {
      this.initiateSocketConn();
    }
  };

  componentDidUpdate = () => {
    const { socketConn } = this.props;
    const isLoggedIn = !!getUserData();
    if (isLoggedIn) {
      // !socketConn && this.initiateSocketConn();
    } else {
      clearUserData();
      window.location.href = "/auth";
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
    socket.on("error", error => {
      console.log("----------------- SOCKET ERROR ----------------");
      console.error(error);
    });
    window.addEventListener("beforeunload", function() {
      socket.close();
    });
  };

  fetchInitialData = () => {
    const userData = getUserData();
    if (!userData) {
      return;
    }
    this.props.tryFetchingAllFriends();
    this.props.tryFetchingAllMessages({ id: userData._id });
  };

  sendMessage = messageData => {
    const { socketConn } = this.props;
    socketConn.emit("message", messageData, data => {
      this.props.updateMessagesList(data);
    });
  };

  getMessageData = (friend, messages) => {
    let pasrsedList = [];
    if (messages && friend) {
      pasrsedList = messages[friend._id] || [];
      pasrsedList = pasrsedList.map(msg => {
        msg.timestamp = moment(msg.timestamp);
        return msg;
      });
      return pasrsedList.sort((x, y) => x.timestamp.diff(y.timestamp) > 0);
    }
    return pasrsedList;
  };

  render() {
    const {
      friends,
      messages,
      activeFriend,
      unseenMessages,
      changeActiveFriend
    } = this.props;
    const messageData = this.getMessageData(activeFriend, messages.data);

    return (
      <div className="view__container home__container">
        <div className="view__container--inner">
          <div className="view__body row">
            <FriendsList
              data={friends.data}
              activeFriend={activeFriend}
              status={friends.status}
              changeActiveFriend={changeActiveFriend}
              unseenMessages={unseenMessages}
            />
            {activeFriend && (
              <ChatBox
                data={messageData}
                friend={activeFriend}
                status={messages.status}
                sendMessage={this.sendMessage}
              />
            )}
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
    changeActiveFriend: bindActionCreators(changeActiveFriend, dispatch),
    tryFetchingAllFriends: bindActionCreators(tryFetchingAllFriends, dispatch),
    tryFetchingAllMessages: bindActionCreators(tryFetchingAllMessages, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
