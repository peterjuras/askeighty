'use strict';

const twilio = require('./twilio');

const queue = [];
let activeSocket;

function onConnect(socket) {
  console.log(`${socket.id} is now connected!`);
  socket.on('send', message => {
    if (activeSocket) {
      queue.push({
        socket: socket,
        message: message
      });
      socket.emit('queue', queue.length);
      return;
    }
    serveSocket(socket, message);
  });
  socket.on('disconnect', () => {
    if (socket === activeSocket) {
      deQueue();
      return;
    }
    let removeIndex = -1;
    queue.every((socketWrapper, index) => {
      if (socketWrapper.socket === socket) {
        removeIndex = index;
        return false;
      }
      return true;
    });
    if (removeIndex > -1) {
      queue.splice(removeIndex, 1);
    }
    updateQueue();
  });
}

function deQueue(response) {
  if (!response) {
    response = 'Empty response';
  }
  activeSocket.emit('response', response);
  activeSocket = null;

  const nextSocket = queue.shift();
  if (nextSocket) {
    serveSocket(nextSocket.socket, nextSocket.message);
  }
  updateQueue();
}

function updateQueue() {
  queue.forEach((socketWrapper, index) => {
    socketWrapper.socket.emit('queue', index + 1);
  });
}

function serveSocket(socket, message) {
  activeSocket = socket;
  socket.emit('active', true);
  twilio.sendMessage(message, socket);
}

module.exports = {
  onConnect: onConnect,
  deQueue: deQueue
};
