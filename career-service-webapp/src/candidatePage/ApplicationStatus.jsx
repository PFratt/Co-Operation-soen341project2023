import React from 'react'
import './css/Candidate.css';

export default function ApplicationStatus({statusValue}) {
    let bgColor;
    if (statusValue === "accepted") {
        bgColor = "green";
    } else if (statusValue === "rejected") {
        bgColor = "red"
    } else if (statusValue === "pending") {
        bgColor = "#56c2f0"
    } else if (statusValue === "interview" || statusValue === "offer") {
        bgColor = "#3e83fa"
    } else {
        bgColor = "grey";
    }

  return (
    <span className="ApplicationStatusComponent" style={{ backgroundColor: bgColor }}>
        {statusValue}
    </span>
  )
}
