'use strict';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const fromNumber = process.env.TWILIO_NUMBER_1;
const toNumber = process.env.TWILIO_DEST_NUMBER;

const client = require('twilio')(accountSid, authToken);

function sendTestMessage() {
  client.messages.create({
    body: 'Test',
    from: fromNumber,
    to: toNumber
  }, (error, message) => {
    console.log(error, message);
  });
}

module.exports = {
  sendTestMessage: sendTestMessage
};
