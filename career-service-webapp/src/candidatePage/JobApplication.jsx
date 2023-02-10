import React from 'react'
import './css/Candidate.css';

export default function JobApplication({ jobNum, title, employer, date }) {
  return (
    <div className='JobApplicationComponent' >
      <p>Job Number: {jobNum}</p>
      <p>Title: {title}</p>
      <p>Employer: {employer}</p>
      <p>Date: {date}</p>
    </div>
  )
}
