import React from "react";
import "./css/Employer.css";

export default function MyJobPost({
  jobID,
  title,
  role_description,
  date_posted,
  date_deadline,
  hideJob,
  editJob,
  deleteJob,
}) {
  return (
    <div className="JobApplicationComponent">
      <button onClick={hideJob}>Hide Job Post </button>
      <button onClick={editJob}>Edit Job Post</button>
      <button onClick={deleteJob}>Delete Job Post</button>
      <p>Job ID: {jobID}</p>
      <p>Title: {title}</p>

      <p>Role Description: {role_description}</p>
      <p>Date Posted: {date_posted}</p>
      <p>Deadline: {date_deadline}</p>
    </div>
  );
}
