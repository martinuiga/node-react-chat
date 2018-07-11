const chatRooms = [
	{
		id: 0,
		name: 'chat room 1',
		connected: true, // channel user is in
		connectedUsers: [
			{
				id: 0,
				name: 'Jüri',
				status: 'online',
				self: false
			},
			{
				id: 1,
				name: 'Juss',
				status: 'away',
				self: true
			}
		]
	},
	{
		id: 1,
		name: 'chat room 2',
		connected: false,
		connectedUsers: []
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

const user = [
	{
		socketId: [
			'asd123', 'asdasd', '123123'
		],
		userId: 0,
		nickname: 'bob'
	}
];

module.exports = {
	chatRooms,
	chatRoomsInit,
	chatLog
};
