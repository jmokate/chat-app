import React from "react";
import Users from "./Users";

function UsersSideBar(props) {
	const { currentUser, usersOnline } = props;

	const renderUsers = usersOnline.map(user => {
		return user.id == currentUser.id ? null : (
			<Users
				key={user.id}
				userName={user.username}
				className={"users-online"}
			/>
		);
	});

	renderUsers.push(
		<Users
			key={currentUser.id}
			userName={currentUser.userName}
			className={"you"}
		/>
	);

	return (
		<div>
			<span key={1} className='labels'>
				Users
			</span>
			<div className='usersContainer'>{renderUsers}</div>
		</div>
	);
}

export default UsersSideBar;
