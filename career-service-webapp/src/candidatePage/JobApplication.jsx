
import React from 'react'
import './css/Candidate.css';

export default function JobApplication({
  jobNum,
  title,
  employer,
  date,
  hideJobApplication,
  applyNowBtnColor,
  applyNowBtnText,
  applyNowBtnClicked,
}) {
  return (

    <div className='JobApplicationComponent' >
      <button onClick={hideJobApplication}>Hide Job Application </button>
      <p>Job Number: {jobNum}</p>
      <p>Title: {title}</p>
      <p>Employer: {employer}</p>
      <p>Date: {date}</p>
      <button style={{ backgroundColor: applyNowBtnColor }} onClick={applyNowBtnClicked}>{applyNowBtnText}</button>
    </div>
  );
}
