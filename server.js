'use strict';

const express = require('express');
const app = express();
const path = require('path');
const twilio = require('twilio');
const bodyparser = require('body-parser');

const onConnect = require('./lib/socket').onConnect;
const twilioRoute = require('./lib/twilio');
// twilio.sendTestMessage();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.post('/twilio/response', twilio.webhook({ validate: false }), twilioRoute.response);

const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const redis = require('redis').createClient;
// const adapter = require('socket.io-redis');
// const pub = redis(process.env.REDIS_PORT, process.env.REDIS_HOST, {
//   auth_pass: process.env.REDIS_PWD
// });
// const sub = redis(process.env.REDIS_PORT, process.env.REDIS_HOST, {
//   return_buffers: true,
//   auth_pass: process.env.REDIS_PWD
// });
const io = require('socket.io')(server);
// io.adapter(adapter({
  pubClient: pub,
  subClient: sub
}));

server.listen(process.env.port || 3000);

io.on('connection', onConnect);
