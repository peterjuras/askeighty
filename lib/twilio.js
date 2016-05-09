'use strict';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const fromNumber = process.env.TWILIO_NUMBER_1;
const toNumber = process.env.TWILIO_DEST_NUMBER;

const twilio = require('twilio');
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

function response(req, res) {
  const twiml = new twilio.TwimlResponse();
  twiml.message('Danke für deine Antwort. Deine Weisheiten sind kostbar!');
  res.send(twiml);
}

module.exports = {
  sendTestMessage: sendTestMessage,
  response: response
};
