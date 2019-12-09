import { getUserData } from "__SERVICES/auth";

import {
  Status
} from '__CONSTANTS';

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
  switch(action.type) {
    case SOCKET__INITIATE: {
      return {
        ...state,
        socketConn: action.payload
      }
    }
    case SOCKET__UPDATE_FRIENDS: {
      if(state.friends !== Status.SUCCESS) {
        return state;
      }

      let friendsData = state.friends.data;
      const newFriend = action.payload;
      const isFriendNew = friendsData.filter(user => user._id === newFriend._id).length === 0;

      if(isFriendNew) {
        friendsData = friendsData.concat([newFriend]);
      }
      else {
        friendsData = friendsData.map(user => {
          if(user._id === newFriend._id) {
            return newFriend
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
      }
    }
    case SOCKET__UPDATE_MESSAGE: {
      const messageMap = state.messages.data || {};
      const newMessage = action.payload;
      const sender = newMessage.sender;
      const unseenMessages = state.unseenMessages;
      if(messageMap[sender]) {
        messageMap[sender] = messageMap[sender].concat([newMessage]);
      }
      else {
        messageMap[sender] = [newMessage];
      }

      if(unseenMessages[sender]) {
        unseenMessages[sender]++
      }
      else {
        unseenMessages[sender] = 1;
      }
      return {
        ...state,
        unseenMessages,
        messages: {
          ...state.messages,
          data: messageMap
        }
      }
    }

    case HOME__GET_FRIENDS__PROGRESS: {
      return {
        ...state,
        friends: {
          status: Status.LOADING,
          data: null
        }
      }
    }
    case HOME__GET_FRIENDS__ERROR: {
      return {
        ...state,
        friends: {
          status: Status.ERROR,
          data: action.payload
        }
      }
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
      }
    }

    case HOME__SET_ACTIVE_FRIEND: {
      const activeFriend = action.payload;
      const unseenMessages = state.unseenMessages;
      if(unseenMessages[activeFriend._id]) {
        delete unseenMessages[activeFriend._id]
      }
      return {
        ...state,
        unseenMessages,
        activeFriend
      }
    }

    case HOME__GET_MESSAGES__PROGRESS: {
      return {
        ...state,
        messages: {
          status: Status.LOADING,
          data: null
        }
      }
    }
    case HOME__GET_MESSAGES__ERROR: {
      return {
        ...state,
        messages: {
          status: Status.ERROR,
          data: action.payload
        }
      }
    }
    case HOME__GET_MESSAGES__SUCCESS: {
      const payload = action.payload;
      const messageMap = {};
      payload.forEach(message => {
        if(messageMap[message.sender]) {
          messageMap[message.sender].concat([message])
        }
        else {
          messageMap[message.sender] = [message];
        }
      })
      return {
        ...state,
        messages: {
          status: Status.SUCCESS,
          data: messageMap
        }
      }
    }
    default: {
      return state;
    }
  }
}

export default homeReducer;