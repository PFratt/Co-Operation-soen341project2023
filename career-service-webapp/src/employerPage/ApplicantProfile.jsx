import React from "react";
import "./css/Employer.css";

export default function ApplicantProfile({
  applicationNum,
  userName,
  appliedjob,
  date,
  closeApplicantView,
  interview,
  reject,
}) {
  return (
    <div className="applicant-profile-wrapper">
      <button onClick={closeApplicantView}>Close Applicant View </button>
      <p>Applciation Number {applicationNum}</p>
      <p>USer name: {userName}</p>
      <p>applied job: {appliedjob}</p>
      <p>Date: {date}</p>
      <button onClick={interview}> Interview</button>
      <button onClick={reject}>Reject </button>
    </div>
  );
}
