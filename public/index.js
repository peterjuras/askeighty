var socket = io();

function sendMessage() {
  // Sends an SMS message to the server, that is either sent directly or put into the queue.
  // Usage:
  // socket.emit('send', 'The message to Adrian');
  socket.emit('send', document.getElementById('message').value);
  document.getElementById('sendButton').disabled = true;
}

// Received when the position in the queue for this user has been updated. If the event is
// received after a sendMessage call, it means that the user is in the queue.
// Example
// message: "1" => There is 1 user in front of you in the queue
socket.on('queue', function(message) {
  document.getElementById('status').innerHTML = 'Adrian is busy and you are in the queue! There are ' +
    message + ' people ahead of you!';
});

// Received when the current user is the active user and the message has been sent to Adrian.
// Example
// message: true
socket.on('active', function(message) {
  document.getElementById('status').innerHTML = 'Your message was sent to Adrian! Leave this page open to see his reply!';
});

// Received when Adrian responds to a message
// Example
// message: "Adrian's reply" => Adrian send the text: "Adrian's reply" 
socket.on('response', function(message) {
  document.getElementById('sendButton').disabled = false;
  document.getElementById('status').innerHTML = "Adrian's response: " + message;
});
