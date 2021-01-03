const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const https = require('http').createServer(app);

// Static files
app.use(express.static('public'));

// sockets.io
const io = socket(https);
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  socket.on('chat message', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});

https.listen(4000, () => console.log('listening to request on port 4000'));
