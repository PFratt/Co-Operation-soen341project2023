import React from 'react'

export default function CandidateProfile({
    profilePageClose,
}) {
  return (
    <div className='CandidateProfileComponent'>
        <button onClick={profilePageClose}>close</button>
        <h2>PROFILE</h2>
        <p>Name: Denis</p>
        <p>Email: someemail@gmail.com</p>
        <br />
        <b>Experience:</b>
        <ul>
            <li>Google Front-End Dev</li>
            <li>Microsoft Software Eng</li>
        </ul>
        <b>Education:</b>
        <ul>
            <li>Concordia University</li>
            <li>John Abbott College</li>
        </ul>
        <br />
        <p>Default CV: myDefaultCV.pdf</p>
        <p>Default Cover Letter: myDefaultCoverLetter.pdf</p>
        <button>EDIT PROFILE</button>
    </div>
  )
}
