var socket = io();

socket.emit('send', 'Hi');
socket.on('queue', function(message) {
  console.log(message);
});
socket.on('active', function(message) {
  console.log(message);
});
socket.on('response', function(message) {
  console.log(message);
});
