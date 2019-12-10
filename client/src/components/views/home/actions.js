import { Endpoints } from "__CONSTANTS";

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

export const preserveSocketConn = data => {
  return {
    type: SOCKET__INITIATE,
    payload: data
  };
};

export const updateFriendsList = data => {
  return {
    type: SOCKET__UPDATE_FRIENDS,
    payload: data
  };
};

export const updateMessagesList = data => {
  return {
    type: SOCKET__UPDATE_MESSAGE,
    payload: data
  };
};

export const fetchFriendsProgress = data => {
  return {
    type: HOME__GET_FRIENDS__PROGRESS
  };
};

export const fetchFriendsSuccess = data => {
  return {
    type: HOME__GET_FRIENDS__SUCCESS,
    payload: data
  };
};

export const fetchFriendsError = data => {
  return {
    type: HOME__GET_FRIENDS__ERROR,
    payload: data
  };
};

export const tryFetchingAllFriends = data => {
  return dispatch => {
    dispatch(fetchFriendsProgress());
    fetch(Endpoints.USER_URL, {
      method: "GET",
      // credentials: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        const isSuccess = res && res.status && res.status === "SUCCESS";
        if (isSuccess) {
          dispatch(fetchFriendsSuccess(res.data));
        } else {
          dispatch(fetchFriendsError(res.error));
        }
      })
      .catch(err => {
        console.error(err);
        dispatch(fetchFriendsError(err))
      });
  };
};

export const changeActiveFriend = data => {
  return {
    type: HOME__SET_ACTIVE_FRIEND,
    payload: data
  };
};

export const fetchMessagesProgress = data => {
  return {
    type: HOME__GET_MESSAGES__PROGRESS
  };
};

export const fetchMessagesSuccess = data => {
  return {
    type: HOME__GET_MESSAGES__SUCCESS,
    payload: data
  };
};

export const fetchMessagesError = data => {
  return {
    type: HOME__GET_MESSAGES__ERROR,
    payload: data
  };
};

export const tryFetchingAllMessages = data => {
  return dispatch => {
    dispatch(fetchMessagesProgress());
    fetch(`${Endpoints.MESSAGE_URL}/list?id=${data.id}`, {
      method: "GET",
      // credentials: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        const isSuccess = res && res.status && res.status === "SUCCESS";
        if (isSuccess) {
          dispatch(fetchMessagesSuccess(res.data));
        } else {
          dispatch(fetchMessagesError(res.error));
        }
      })
      .catch(err => {
        console.error(err);
        dispatch(fetchMessagesError(err))
      });
  };
};
