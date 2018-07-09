const chatRooms = [
	{
		id: 0,
		name: 'chat room 1',
		connectedUsers: [
			{
				id: 0,
				name: 'Jüri',
				status: 'online',
			},
			{
				id: 1,
				name: 'Juss',
				status: 'away'
			}
		]
	},
	{
		id: 1,
		name: 'chat room 2',
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

module.exports = {
	chatRooms,
	chatLog
};
