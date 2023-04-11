import React from "react";

export default function UserProfile({
  userType,
  userName,
  userEmail,
  userHeadline,
  userDescription,
  isStudent,
  deleteUser,
  hideSelectedUser,
  modify,
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
      <button onClick={hideSelectedUser}>Hide</button>
      <p>User Type: {userType}</p>
      <p>User name: {userName}</p>
      <p>User Email: {userEmail}</p>

      {isStudent ? 
            (<p>User Headline: {userHeadline}</p>) 
            : null}
      {isStudent ? 
            (<p>User Description: {userDescription}</p>) 
            : null}    
      
      <button onClick={deleteUser}> Remove User</button>
      <button onClick={modify}> Modify</button>
    </div>
  );
}
