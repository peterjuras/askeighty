'use strict';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const fromNumber = process.env.TWILIO_NUMBER_1;
const toNumber = process.env.TWILIO_DEST_NUMBER;

const twilio = require('twilio');
const socket = require('./socket');
const client = twilio(accountSid, authToken);

function sendTestMessage() {
  client.messages.create({
    body: 'Test',
    from: fromNumber,
    to: toNumber
  }, (error, message) => {
    console.log(error, message);
  });
}

function sendMessage(text, socket) {
  client.messages.create({
    body: text,
    from: fromNumber,
    to: toNumber
  }, (error, message) => {
    console.log(error, message);
    if (socket) {
      socket.emit('twilio-error', [error, message]);
    }
  });
}

function response(req, res) {
  const twiml = new twilio.TwimlResponse();
  twiml.message('Danke für deine Antwort. Deine Weisheiten sind kostbar!' + (socket.activeSocket ? 'Defined' : 'Undefined'));
  res.send(twiml);
  socket.deQueue(req.body);
}

module.exports = {
  sendTestMessage: sendTestMessage,
  response: response,
  sendMessage: sendMessage
};
