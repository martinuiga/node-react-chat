const chatLog = [
	{
		roomId: 0,
		log: []
	}
]

const chatRooms = [
	{
		id: 0,
		name: 'Default',
		connectedUsers: [],
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
	chatLog,
	users
};
