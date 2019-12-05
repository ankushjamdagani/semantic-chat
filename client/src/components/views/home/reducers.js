import {
  SOCKET__INITIATE,
  SOCKET__UPDATE_FRIENDS,
  SOCKET__UPDATE_MESSAGE
} from "./action-types";

const INITIAL_STATE = {
  socketConn: null,
  friendsList: [],
  messagesList: {}, // id: [...messages]
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
      let friendsList = state.friendsList;
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
        friendsList
      }
    }
    case SOCKET__UPDATE_MESSAGE: {
      return {
        ...state,
        messagesList: {}
      }
    }
    default: {
      return state;
    }
  }
}

export default homeReducer;