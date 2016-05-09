var socket = io();

function sendMessage() {
  socket.emit('send', document.getElementById('message').value);
}

socket.on('queue', function(message) {
  console.log(message);
});
socket.on('active', function(message) {
  console.log(message);
});
socket.on('response', function(message) {
  console.log(message);
});
