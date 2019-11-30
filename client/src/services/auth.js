export const isUserLoggedIn = () => {
  const userData = getUserData();
  return !!userData;
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
