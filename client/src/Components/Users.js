import React from "react";

function Users(props) {
  return (
    <tr>
      <td className='you'>{props.userName}</td>
    </tr>
  );
}

export default Users;
