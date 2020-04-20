import React from "react";
import "../index.css";

function CurrentMessage(props) {
  return (
    <div className='messages'>
      <span className='you'>{props.userName}: </span>
      <span className='chat-font'>{props.text}</span>
      <br />
    </div>
  );
}

export default CurrentMessage;
