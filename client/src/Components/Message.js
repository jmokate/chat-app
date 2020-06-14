import React from "react";
import "../index.css";
import moment from 'moment'

function Message(props) {
  return (
    <div className='messages'>
      <span className={props.className}>{props.userName}<span className="moment"> {moment(props.createdDate).calendar()}</span>: </span>
      <span className='chat-font'>{props.text}</span>
      <br />
    </div>
  );
}

export default Message;
