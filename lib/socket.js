'use strict';

const twilio = require('./twilio');

function onConnect(socket) {
  console.log(`${socket.id} is now connected!`);
  socket.on('send', message => {
    twilio.sendMessage(message, socket);
  });
}

function respond(response) {
  const io = require('../server').io;
  io.emit('response', response);
}

module.exports = {
  onConnect: onConnect,
  respond: respond
};
