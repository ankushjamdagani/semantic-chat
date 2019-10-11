import openSocket from 'socket.io-client';

import { ENDPOINT_SOCKET } from '__CONSTANTS/endpoints';

const socket = openSocket(ENDPOINT_SOCKET);

function onRecieveMessage(cb) {
  socket.on('message', message => cb(message));
}

function onSendMessage(messageData) {
  socket.emit('message', messageData)
}

export { 
  onRecieveMessage,
  onSendMessage
};