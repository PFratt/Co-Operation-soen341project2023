import React from 'react'

export default function JobApplication({
    status,
}) {
  return (
    <div className='JobApplicationComponent'>
        <h4>Application:</h4>
        <p>status: {status}</p>
    </div>
  )
}
