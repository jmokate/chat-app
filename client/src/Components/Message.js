import React from "react";
import "../index.css";
import { Table } from "react-bootstrap";

function Message(props) {
  return (
    <Table size='sm' borderless className='messages'>
      <tbody>
        <tr>
          <td>
            <span className='you'>{props.userName}: </span>
            <span className='chat-font'>{props.text}</span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Message;
