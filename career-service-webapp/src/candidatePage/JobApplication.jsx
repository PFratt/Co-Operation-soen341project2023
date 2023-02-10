import React from "react";

export default function JobApplication({
  jobNum,
  title,
  employer,
  date,
  hideJobApplication,
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
      <button onClick={hideJobApplication}>Hide Job Application </button>
      <p>Job Number: {jobNum}</p>
      <p>Title: {title}</p>
      <p>Employer: {employer}</p>
      <p>Date: {date}</p>
    </div>
  );
}
