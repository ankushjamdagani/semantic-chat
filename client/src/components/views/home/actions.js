import {
  SOCKET__INITIATE,
  SOCKET__UPDATE_FRIENDS,
  SOCKET__UPDATE_MESSAGE
} from "./action-types";

export const preserveSocketConn = (data) => {
  return {
    type: SOCKET__INITIATE,
    payload: data
  }
}

export const updateFriendsList = (data) => {
  return {
    type: SOCKET__UPDATE_FRIENDS,
    payload: data
  }
}

export const updateMessagesList = (data) => {
  return {
    type: SOCKET__UPDATE_MESSAGE,
    payload: data
  }
}
