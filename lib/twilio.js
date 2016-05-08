const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;

const client = require('twilio')(accountSid, authToken);

function sendTestMessage() {
  client.messages.create({
    body: 'Testy besty',
    to: process.env.TWILIO_DEST_NUMBER,
    from: process.env.TWILIO_NUMBER_1
  }, (error, message) => {
    console.log(error, message);
  });
}

module.exports = {
  sendTestMessage: sendTestMessage
};
