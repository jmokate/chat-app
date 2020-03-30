import React from "react";
import "../index.css";

function Message(props) {
  return (
    <div className='messagesContainer'>
      <div className='messages'>
        <span className='you'>{props.userName}: </span>
        <span className='chat-font'>{props.text}</span>
        <br />
      </div>
    </div>
  );
}

export default Message;
