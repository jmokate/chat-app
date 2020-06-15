import React from "react";

function Users(props) {
  
  return (
    <div>
      <span className={props.className}>{props.userName} </span>
      <br />
    </div>
  );
}

export default Users;
