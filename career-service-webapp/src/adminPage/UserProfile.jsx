import React from "react";

export default function UserProfile({
  userType,
  userName,
  userEmail,
  userHeadline,
  userDescription,
  isStudent,
  showModify,
  deleteUser,
  hideSelectedUser,
  modify,
  cancelModify,
  saveModify,
  readDescription,
  readHeadline,
  wordCountHead,
  wordCountDescription,
  profileExists
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

      {isStudent && profileExists ? 
            (<p>User Headline: {userHeadline}</p>) 
            : null}
      <div style={{ display: showModify }}>
            <input type="text" id="headline" onChange={readHeadline} />
            {wordCountHead == 0 ? null : wordCountHead}
      </div>

      {isStudent && profileExists ? 
            (<p>User Description: {userDescription}</p>) 
            : null} 
      <div style={{ display: showModify }}>
            <input type="text" id="description" onChange={readDescription} />
            {wordCountDescription == 0 ? null : wordCountDescription}
            <br />
            <button onClick={saveModify}> Save Changes</button>
            <button onClick={cancelModify}> Cancel</button>
      </div>

      {isStudent && !profileExists ? (<p>This student has not created a Candidate Profile yet. To edit candidate profile please create one first.</p>): null}

      
      <button onClick={deleteUser}> Remove User</button>
      {isStudent ? 
            (<button onClick={modify}> Modify</button>) 
            : null}
      
    </div>
  );
}
