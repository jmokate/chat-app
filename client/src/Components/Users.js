import React from "react";

function Users(props) {
  let userNameCopy = (" " + props.userName).slice(1);
  return (
    <div>
      <span className={props.className}>{userNameCopy.toUpperCase()} </span>
      <br />
    </div>
  );
}

export default Users;
