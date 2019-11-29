import {
  Endpoints
} from '__CONSTANTS/endpoints';

function tryLoggingIn() {
  return fetch(Endpoints.AUTH_URL + 'login', {
    method: 'POST'
  })
}

export { 
  tryLoggingIn
};