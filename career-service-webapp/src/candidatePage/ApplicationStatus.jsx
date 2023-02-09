import React from 'react'

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
    <div style={{ backgroundColor: bgColor, width: "80px", padding: "5px", borderRadius: "40px" }}>
        {statusValue}
    </div>
  )
}
