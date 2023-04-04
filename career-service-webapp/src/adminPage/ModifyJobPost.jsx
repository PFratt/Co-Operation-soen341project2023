import React from "react";
import "./css/Admin.css";
import { useState } from "react";
import axios from "axios";

export default function ModifyJobPost({
  jobID,
  title,
  role_description,
  date_posted,
  date_deadline,
  hideJob,
  cookies,
  refreshJobs,
}) {
  const [Title, setTitle] = useState(title);
  const [RoleDescription, setRoleDescription] = useState(role_description);
  const [DateDeadline, setDateDeadline] = useState(date_deadline);
  const editJob = () => {
    let modifyJob = {
      employerID: cookies.get("userID"),
      title: Title,
      role_description: RoleDescription,
      date_posted: date_posted,
      date_deadline: DateDeadline,
    };
    console.log(jobID);
    axios
      .put(`https://sawongdomain.com/modifyjob/${parseInt(jobID)}`, modifyJob, {
        headers: {
          Authorization: cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteJob = () => {
    axios
      .delete(`https://sawongdomain.com/deletejob/${parseInt(jobID)}`, {
        headers: {
          Authorization: cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log(response);
        alert("Job Deleted");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="JobApplicationComponent">
      {console.log(jobID)}
      <button onClick={hideJob}>Hide Job Post </button>

      <button onClick={deleteJob}>Delete Job Post</button>
      {/* <p>Job ID: {jobID}</p>
      <p>Title: {title}</p>

      <p>Role Description: {role_description}</p>
      <p>Date Posted: {date_posted}</p>
      <p>Deadline: {date_deadline}</p> */}
      <form onSubmit={editJob}>
        <p>
          Title:{" "}
          <input
            name="editJobTitle"
            className="edit-job-input"
            placeholder="Job Title"
            value={Title}
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          Description:{" "}
          <input
            name="editJobDesc"
            className="edit-job-input"
            placeholder="Short Role Description"
            value={RoleDescription}
            onChange={(e) => {
              e.preventDefault();
              setRoleDescription(e.target.value);
            }}
          />
        </p>
        <p>Date Posted: {date_posted}</p>
        <p>
          Deadline:{" "}
          <input
            name="editJobDeadline"
            className="edit-job-input"
            placeholder={date_deadline}
            value={DateDeadline}
            onChange={(e) => {
              e.preventDefault();
              setDateDeadline(e.target.value);
            }}
          />
        </p>
        <button className="login-button" type="submit">
          Save Edits
        </button>
      </form>
    </div>
  );
}
