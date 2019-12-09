const BASE_URL = "http://localhost:8000/";
const Endpoints = {
  AUTH_URL: BASE_URL + "api/v1/auth",
  USER_URL: BASE_URL + "api/v1/user",
  MESSAGE_URL: BASE_URL + "api/v1/message",
  CHAT_URL: BASE_URL + "socket/v1/chat"
};

export default Endpoints;
