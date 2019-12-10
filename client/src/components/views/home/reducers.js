import { getUserData } from "__SERVICES/auth";

import { Status } from "__CONSTANTS";

import {
  SOCKET__INITIATE,
  SOCKET__UPDATE_FRIENDS,
  SOCKET__UPDATE_MESSAGE,
  HOME__GET_FRIENDS__PROGRESS,
  HOME__GET_FRIENDS__SUCCESS,
  HOME__GET_FRIENDS__ERROR,
  HOME__SET_ACTIVE_FRIEND,
  HOME__GET_MESSAGES__PROGRESS,
  HOME__GET_MESSAGES__SUCCESS,
  HOME__GET_MESSAGES__ERROR
} from "./action-types";

const INITIAL_STATE = {
  socketConn: null,
  activeFriend: null,
  unseenMessages: {},
  friends: {
    status: null,
    data: null
  },
  messages: {
    status: null,
    data: null // id: [...messages]
  }
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOCKET__INITIATE: {
      return {
        ...state,
        socketConn: action.payload
      };
    }
    case SOCKET__UPDATE_FRIENDS: {
      if (state.friends.status !== Status.SUCCESS) {
        return state;
      }

      let friendsData = state.friends.data;
      const newFriend = action.payload;
      const isFriendNew =
        friendsData.filter(user => user._id === newFriend._id).length === 0;

      if (isFriendNew) {
        friendsData = friendsData.concat([newFriend]);
      } else {
        friendsData = friendsData.map(user => {
          if (user._id === newFriend._id) {
            return newFriend;
          }
          return user;
        });
      }
      return {
        ...state,
        friends: {
          ...state.friends,
          data: friendsData
        }
      };
    }
    case SOCKET__UPDATE_MESSAGE: {
      const messageMap = state.messages.data || {};
      const newMessage = action.payload;

      const currUser = getUserData();
      const amISender = currUser._id === newMessage.sender;

      const friendId = amISender ? newMessage.reciever : newMessage.sender;
      const activeFriend = state.activeFriend;

      const unseenMessages = state.unseenMessages;

      if (messageMap[friendId]) {
        messageMap[friendId] = messageMap[friendId].concat([newMessage]);
      } else {
        messageMap[friendId] = [newMessage];
      }

      if (!amISender && (!activeFriend || friendId !== activeFriend._id)) {
        unseenMessages[friendId] = (unseenMessages[friendId] || 0) + 1;
      }
      return {
        ...state,
        unseenMessages,
        messages: {
          ...state.messages,
          data: messageMap
        }
      };
    }

    case HOME__GET_FRIENDS__PROGRESS: {
      return {
        ...state,
        friends: {
          status: Status.LOADING,
          data: null
        }
      };
    }
    case HOME__GET_FRIENDS__ERROR: {
      return {
        ...state,
        friends: {
          status: Status.ERROR,
          data: action.payload
        }
      };
    }
    case HOME__GET_FRIENDS__SUCCESS: {
      const payload = action.payload;
      const currUser = getUserData();
      const friends = payload.filter(user => user._id !== currUser._id);
      return {
        ...state,
        friends: {
          status: Status.SUCCESS,
          data: friends
        }
      };
    }

    case HOME__SET_ACTIVE_FRIEND: {
      const activeFriend = action.payload;
      const unseenMessages = state.unseenMessages;
      if (unseenMessages[activeFriend._id]) {
        delete unseenMessages[activeFriend._id];
      }
      return {
        ...state,
        unseenMessages,
        activeFriend
      };
    }

    case HOME__GET_MESSAGES__PROGRESS: {
      return {
        ...state,
        messages: {
          status: Status.LOADING,
          data: null
        }
      };
    }
    case HOME__GET_MESSAGES__ERROR: {
      return {
        ...state,
        messages: {
          status: Status.ERROR,
          data: action.payload
        }
      };
    }
    case HOME__GET_MESSAGES__SUCCESS: {
      const messageMap = state.messages.data || {};
      const messageList = action.payload;
      const currUser = getUserData();

      messageList.forEach(msg => {
        const amISender = currUser._id === msg.sender;
        const friendId = amISender ? msg.reciever : msg.sender;

        if (messageMap[friendId]) {
          messageMap[friendId] = messageMap[friendId].concat([msg]);
        } else {
          messageMap[friendId] = [msg];
        }
      });

      return {
        ...state,
        messages: {
          status: Status.SUCCESS,
          data: messageMap
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default homeReducer;
