'use strict';

const express = require('express');
const app = express();
const twilio = require('twilio');

const twilioRoute = require('./lib/twilio');
// twilio.sendTestMessage();

app.post('/twilio/response', twilio.webhook(), twilioRoute.response);

app.listen(process.env.port || 3000);
