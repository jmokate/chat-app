import React from "react";
import "../index.css";
import moment from "moment";

function Message(props) {
  return (
    <div className='messages'>
      <div className='messageUserName'>
        <span className={props.className}>
          {props.userName.toUpperCase()}{" "}
          <span className='moment'>{moment(props.createdDate).calendar()}</span>
        </span>
      </div>
      <span className='chat-font'>{props.text}</span>
      <br />
    </div>
  );
}

export default Message;
