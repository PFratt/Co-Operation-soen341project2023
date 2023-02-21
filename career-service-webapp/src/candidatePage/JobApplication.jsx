import React from 'react'
import ApplicationStatus from './ApplicationStatus'

export default function JobApplication({
    status,
}) {
  return (
    <div className='JobApplicationComponent'>
        <h4>Application:</h4>
        <p>
          Status: <ApplicationStatus statusValue={status}/>
        </p>
        <p>Name: Denis</p>
        <p>Resume: RandomResume.pdf</p>
    </div>
  )
}
