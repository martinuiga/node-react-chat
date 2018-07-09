import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';

const SideMenuItems = (props) => {
	const { chatRooms } = props;
	let chatRoomMenuItems = [];

	if (!chatRooms) return null;
	_.forEach(chatRooms, (chatRoom) => {
		chatRoomMenuItems.push(
			<MenuItem key={chatRoom.id}>
				{chatRoom.name}
			</MenuItem>
		);
	});
	return chatRoomMenuItems;
};

export default (SideMenuItems);
