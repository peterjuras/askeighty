'use strict';

const express = require('express');
const app = express();

const twilio = require('./lib/twilio');
twilio.sendTestMessage();

// app.listen(process.env.port || 3000);
