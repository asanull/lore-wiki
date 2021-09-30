const socket = io();
var test = "test"
socket.emit('test', { test });