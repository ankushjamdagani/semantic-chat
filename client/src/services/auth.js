import { getCookie } from './cookies';

export const isUserLoggedIn = () => {
  const userData = getUserData();
  const userToken = getCookie('app_token');
  return !!(userData && userToken);
};

export const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("user_data"));
  } catch (e) {
    return false;
  }
};

export const setUserData = data => {
  localStorage.setItem("user_data", JSON.stringify(data));
};

export const clearUserData = () => {
  localStorage.removeItem("user_data");
};
