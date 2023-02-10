import React from "react";

export default function UserProfile({
  userType,
  userName,
  userEmail,
  deleteUser,
  hideSelectedUser,
}) {
  return (
    <div
      style={{
        backgroundColor: "skyblue",
        margin: "20px",
        padding: "10px",
        width: "50%",
        maxWidth: "400px",
      }}
    >
      <button onClick={hideSelectedUser}>Hide Selected User </button>
      <p>User Type: {userType}</p>
      <p>User name: {userName}</p>
      <p>User Email: {userEmail}</p>
      <p> some api call to get more profile info</p>
      <button onClick={deleteUser}> Remove User</button>
    </div>
  );
}
