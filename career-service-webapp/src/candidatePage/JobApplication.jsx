
import React from 'react'
import './css/Candidate.css';

export default function JobApplication({
  jobNum,
  title,
  employer,
  date,
  hideJobApplication,
}) {
  return (

    <div className='JobApplicationComponent' >
    <button onClick={hideJobApplication}>Hide Job Application </button>
      <p>Job Number: {jobNum}</p>
      <p>Title: {title}</p>
      <p>Employer: {employer}</p>
      <p>Date: {date}</p>
    </div>
  );
}
