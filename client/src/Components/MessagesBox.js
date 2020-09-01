import React from "react";
import Message from "./Message";

function MessagesBox(props) {
	const { currentUser, messagesInDataBase } = props;
	let currentId;

	if (currentUser) {
		currentId = currentUser.id;
	}

	const renderMessage = messagesInDataBase.map(message => {
		return message.user_id == currentId ? (
			<Message
				key={message.id}
				userName={message.username}
				text={message.text}
				createdDate={message.created_date}
				className={"you"}
			/>
		) : (
			<Message
				key={message.id}
				userName={message.username}
				text={message.text}
				createdDate={message.created_date}
				className={"users-online"}
			/>
		);
	});

	return (
		<>
			<div className='messagesContainer'>{renderMessage}</div>
		</>
	);
}

export default MessagesBox;
