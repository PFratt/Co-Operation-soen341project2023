
import React from 'react'
import './css/Candidate.css';
import JobApplication from './JobApplication';

export default function JobPosting({
  jobNum,
  title,
  employer,
  date,
  description,
  deadline,
  status,
  date_applied,
  hideJobPosting,
  jobApplicationBtnClicked,
  isApplicationBtnClicked,
  cookies,
  refresh,
}) {

  return (

    <div className='JobPostingComponent' >
      <button onClick={hideJobPosting}>Hide Job Posting </button>
      <p>Job Number: {jobNum}</p>
      <p>Title: {title}</p>
      <p>Employer: {employer}</p>
      <p>Date: {date}</p>
      <p>Description: {description}</p>
      <p>Deadline: {deadline}</p>
      <button style={{ backgroundColor: isApplicationBtnClicked ? "lightgray" : "#4295e3" }} onClick={jobApplicationBtnClicked}>
        <b>{isApplicationBtnClicked ? "Hide Job Application": "Job Application"}</b>
      </button>
      {isApplicationBtnClicked ? <JobApplication cookies={cookies} refresh={refresh} date_applied={date_applied} jobID={jobNum} status={status} /> : null}
    </div>
  );
}
