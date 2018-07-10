
require('dotenv').config();
const config = require('./src/config/config');
const _ = require('lodash');
const port = config.app.port;
const server = require('http').createServer().listen(port);
const socketIO = require("socket.io");
const io = socketIO(server); // The default uws was bugged
// const nano = require('nano')(`http://${config.couchdb.host}:${config.couchdb.port}`);
// https://www.npmjs.com/package/nano#getting-started

const SocketIoController = require('./src/controllers/SocketIoController');
const util = require('./src/util/util');

let socketController;
let chatRooms = util.chatRooms;
let chatLog;
let userCounter = 0;

io.on('connection', (socket) => {
	socketController = new SocketIoController(socket, chatRooms, chatLog, userCounter);
	socketController.handleEvents();
});
console.log(`Server started on port ${port}`);
