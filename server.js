const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const moment = require('moment');
const verbose = true;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 80;
io.on('connection', socket =>
{
    socket.on('test', ({ test }) => {
      if(verbose)
      {
        log(`debug`, `Connection Recieved.`)
        log(`debug`, `Session ID '${socket.id}'`)
      }
    });
});
function log(title, message)
{
  file = title
  title = title.toUpperCase()
  console.log(`[${title}] ${message}`)
  fs.appendFileSync(`../logs/${file}.log`, `[${title}] ${message} [${moment().format('DD/MM/YYYY][hh:mm')}]\r\n`);
}
server.listen(PORT, () =>
{if(verbose)
{
  console.log()
  log(`lore-wiki`, `Live on port ${PORT}.`)
  console.log(`::`)
}});