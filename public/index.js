var socket = io();

function sendMessage() {
  socket.emit('send', document.getElementById('message').value);
  document.getElementById('sendButton').disabled = true;
}

socket.on('queue', function(message) {
  console.log(message);
});
socket.on('active', function(message) {
  console.log(message);
});
socket.on('response', function(message) {
  document.getElementById('sendButton').disabled = false;
  console.log(message);
});
socket.on('twilio-error', function(message) {
  console.log(message);
});
