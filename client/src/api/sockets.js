import openSocket from 'socket.io-client';

import { CHAT_SOCKET } from '__CONSTANTS/endpoints';

const socket = openSocket(CHAT_SOCKET);

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