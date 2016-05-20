'use strict';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const fromNumber = process.env.TWILIO_NUMBER_1;
const toNumber = process.env.TWILIO_DEST_NUMBER;

const twilio = require('twilio');
const client = twilio(accountSid, authToken);

function sendMessage(text, socket) {
  if (!text) {
    return;
  }
  text = text.substring(0, 160);
  client.messages.create({
    body: text,
    from: fromNumber,
    to: toNumber
  }, (error, message) => {
    console.log(error, message);
  });
}

function response(req, res) {
  const twiml = new twilio.TwimlResponse();
  res.send(twiml);

  const socket = require('./socket');
  socket.respond(req.body.Body);
}

module.exports = {
  sendMessage: sendMessage,
  response: response
};
