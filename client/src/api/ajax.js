import { Endpoints } from "__CONSTANTS";

function tryLoggingIn() {
  return fetch(Endpoints.AUTH_URL + "/login", {
    method: "POST"
  });
}

export { tryLoggingIn };
