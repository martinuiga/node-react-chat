const chatLog = [
	{
		roomId: 0,
		log: []
	},
	{
		roomId: 1,
		log: []
	}
]

const chatRooms = [
	{
		id: 0,
		name: 'chat room 1',
		connectedUsers: [],
	},
	{
		id: 1,
		name: 'chat room 2',
		connectedUsers: [],
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
