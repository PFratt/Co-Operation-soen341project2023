import React from 'react'

export default function JobApplication({ jobNum, title, employer, date }) {
  return (
    <div style={{ backgroundColor: "skyblue", margin: "20px", padding:"10px", width: "50%", maxWidth: "400px" }}>
      <p>Job Number: {jobNum}</p>
      <p>Title: {title}</p>
      <p>Employer: {employer}</p>
      <p>Date: {date}</p>
    </div>
  )
}
