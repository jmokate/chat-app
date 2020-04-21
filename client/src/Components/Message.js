import React from "react";
import "../index.css";

function Message(props) {
  return (
    <div className='messages'>
      <span className={props.className}>{props.userName}: </span>
      <span className='chat-font'>{props.text}</span>
      <br />
    </div>
  );
}

export default Message;
