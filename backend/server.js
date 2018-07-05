require('dotenv').config();
const config = require('./config/config');
const _ = require('lodash');
const port = config.app.port;
const server = require('http').createServer().listen(port);
const socketIO = require("socket.io");
const io = socketIO(server); // The default uws was bugged

const SocketIoController = require('./src/controllers/SocketIoController');

let socketController = new SocketIoController('asd');

io.on('connection', (socket) => {
	socketController = new SocketIoController(socket);
	socketController.handleEvents();
});

console.log(`Server started on port ${port}`);
