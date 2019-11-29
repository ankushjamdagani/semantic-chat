import {
  getCookie
} from './cookies';

export const isUserLoggedIn = () => {
  const authToken = getCookie('auth_token');
  return !!authToken;
}

export const getUserData = () => {
  const isUserLoggedIn = isUserLoggedIn();
  if (isUserLoggedIn) {
    return localStorage.getItem('user_data');
  }
  else {
    return null
  }
}