import { getUserData } from "__SERVICES/auth";

import {
  SOCKET__INITIATE,
  SOCKET__UPDATE_FRIENDS,
  SOCKET__UPDATE_MESSAGE,
  HOME__GET_FRIENDS__PROGRESS,
  HOME__GET_FRIENDS__SUCCESS,
  HOME__GET_FRIENDS__ERROR,
  HOME__GET_MESSAGES__PROGRESS,
  HOME__GET_MESSAGES__SUCCESS,
  HOME__GET_MESSAGES__ERROR
} from "./action-types";

const INITIAL_STATE = {
  socketConn: null,
  friends: {
    error: null,
    loading: false,
    data: []
  },
  messages: {
    error: null,
    loading: false,
    data: {} // id: [...messages]
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
      const friends = state.friends;
      let friendsList = friends.data;
      const newFriend = action.payload;
      
      const isFriendNew = friendsList.filter(user => user._id === newFriend._id).length === 0;

      if(isFriendNew) {
        friendsList = friendsList.concat([newFriend]);
      }
      else {
        friendsList = friendsList.map(user => {
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
          data: friendsList
        }
      }
    }
    case SOCKET__UPDATE_MESSAGE: {
      return {
        ...state,
        messages: {
          ...state.messages
        }
      }
    }

    case HOME__GET_FRIENDS__PROGRESS: {
      const friends = state.friends;
      return {
        ...state,
        friends: {
          ...friends,
          loading: true,
          error: null
        }
      }
    }
    case HOME__GET_FRIENDS__ERROR: {
      const friends = state.friends;
      const payload = action.payload;
      return {
        ...state,
        friends: {
          ...friends,
          loading: false,
          error: payload
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
          data: friends,
          loading: false,
          error: null
        }
      }
    }

    case HOME__GET_MESSAGES__PROGRESS: {
      const messages = state.messages;
      return {
        ...state,
        messages: {
          ...messages,
          loading: true,
          error: null
        }
      }
    }
    case HOME__GET_MESSAGES__ERROR: {
      const messages = state.messages;
      const payload = action.payload;
      return {
        ...state,
        messages: {
          ...messages,
          loading: false,
          error: payload
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
          data: messageMap,
          loading: false,
          error: null
        }
      }
    }
    default: {
      return state;
    }
  }
}

export default homeReducer;