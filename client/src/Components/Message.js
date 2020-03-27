import React from "react";
import "../index.css";
import { Table } from "react-bootstrap";

function Message(props) {
  return (
    <Table size='sm' borderless className='messages'>
      <tbody>
        <tr>
          <td>
            <span className='you'>You: </span>
            <span className='chat-font'>Sup</span>
          </td>
        </tr>
        <tr>
          <td>
            <span className='users-online'>Someone Else: </span>
            <span className='chat-font'>What'd you say to me?</span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Message;
