import openSocket from 'socket.io-client';

import {
  Endpoints
} from '__CONSTANTS/endpoints';

const socket = openSocket(Endpoints.CHAT_URL);

function onRecieveMessage(cb) {
  socket.on('message', message => cb(message));
}

function onSaveUserId(cb) {
  socket.on('save_user_id', userId => cb(userId));
}

function onSendMessage(messageData) {
  socket.emit('message', messageData)
}

export { 
  onRecieveMessage,
  onSendMessage,
  onSaveUserId
};