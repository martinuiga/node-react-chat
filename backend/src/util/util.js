const chatLog = [
	{
		id: 0,
		owner: 1, // Juss
		message: 'Tere Jüri',
		date: 123123
	},
	{
		id: 1,
		owner: 1,
		message: 'Mis Teed?',
		date: 123124
	},
	{
		id: 2,
		owner: 0,
		message: 'hüppa pommi',
		date: 123125
	},
	{
		id: 3,
		owner: 0,
		message: 'tont',
		date: 123126
	}
];

const chatRooms = [
	{
		id: 0,
		name: 'chat room 1',
		connectedUsers: [],
		chatLog: chatLog
	},
	{
		id: 1,
		name: 'chat room 2',
		connectedUsers: [],
		chatLog: []
	}
];

const chatRoomsInit = [
	{
		id: 0,
		name: 'chat room 1',
		connected: false,
		connectedUsers: []
	},
	{
		id: 1,
		name: 'chat room 2',
		connected: false,
		connectedUsers: []
	}
];

const users = [
	{
		id: 0,
		socketId: 'asdasd',
		nickname: 'Jüri',
		connected: true,
	},
	{
		id: 1,
		socketId: 'asdasd123123',
		nickname: 'Juss',
		connected: true,
	}
];

module.exports = {
	chatRooms,
	chatRoomsInit,
	chatLog,
	users
};
