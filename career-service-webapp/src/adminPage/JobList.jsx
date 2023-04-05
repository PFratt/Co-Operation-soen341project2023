import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { useState } from "react";
import { Table } from "react-bootstrap";
import ModifyJobPost from "./ModifyJobPost";
import { Cookies } from "react-cookie";
import axios from "axios";

export default class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedJob: null,
      jobList: [{ title: "N/A" }],
      editJobTitle: "",
      editJobDesc: "",
      editJobDeadline: "",
      editJobView: false,
    };
    this.getJobList();
  }
  getJobList = async () => {
    axios
      .get(`https://sawongdomain.com/jobs`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
        },
      })
      .then((response) => {
        this.setState({ jobList: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  mapfunctiontest = () => {
    console.log("maptest called");

    if (this.state.jobList.length == 0) {
      return (
        <tr>
          <td align="center" colSpan="5">
            There are no job postings yet.
          </td>
        </tr>
      );
    } else
      return this.state.jobList.map(
        ({ jobID, title, role_description, date_posted, date_deadline }) => {
          return (
            <tr key={jobID}>
              <td>{jobID}</td>
              <td
                onClick={() => {
                  this.setState({
                    selectedJob: {
                      jobID,
                      title,
                      role_description,
                      date_posted,
                      date_deadline,
                    },
                  });
                }}
              >
                {title}
              </td>
              <td>{role_description}</td>
              <td>{date_posted}</td>
              <td>{date_deadline}</td>
            </tr>
          );
        }
      );
  };
  jobPost = (jobID, title, role_description, date_posted, date_deadline) => {
    return (
      <ModifyJobPost
        jobID={jobID}
        title={title}
        role_description={role_description}
        date_posted={date_posted}
        date_deadline={date_deadline}
        hideJob={this.hideJob}
        cookies={this.props.cookies}
        refreshJobs={this.getJobList}
      ></ModifyJobPost>
    );
  };
  hideJob = (value) => {
    if (value === "edit") this.setState({ modJobView: false });
    this.setState({ selectedJob: null });
  };
  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    return (
      <div className="joblist-page-container">
        <div className="joblist-wrapper">
          <Table className="jobs-table" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Job Title</th>
                <th>Description</th>
                <th>Date Posted</th>
                <th>Deadline</th>
                <th>Employer</th>
              </tr>
            </thead>
            <tbody>{this.mapfunctiontest()}</tbody>
          </Table>
        </div>
        <div className="myjobs-wrapper">
          {this.state.selectedJob
            ? this.jobPost(
                this.state.selectedJob.jobID,
                this.state.selectedJob.title,
                this.state.selectedJob.role_description,
                this.state.selectedJob.date_posted,
                this.state.selectedJob.date_deadline
              )
            : null}
        </div>
        {this.state.editJobView ? (
          <EditJobPopup
            title={this.state.modJobTitle}
            role_description={this.state.modJobDesc}
            date_deadline={this.state.modJobDeadline}
            hideJob={() => {
              this.hideJob("edit");
            }}
            handleInputChange={this.handleInputChange}
            editJob={this.editJob}
          />
        ) : null}
      </div>
    );
  }
}
function EditJobPopup({
  title,
  role_description,
  date_posted,
  date_deadline,
  hideJob,
  handleInputChange,
  editJob,
}) {
  return (
    <div className="edit-job-component">
      <button onClick={hideJob}>Cancel </button>
      <form onSubmit={editJob}>
        <p>
          Title:{" "}
          <input
            name="editJobTitle"
            className="edit-job-input"
            placeholder="Job Title"
            value={title}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Description:{" "}
          <input
            name="editJobDesc"
            className="edit-job-input"
            placeholder="Short Role Description"
            value={role_description}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Deadline:
          <input
            name="addJobDeadline"
            className="edit-job-input"
            placeholder={date_posted}
            value={date_deadline}
            onChange={handleInputChange}
          />
        </p>
        <button className="login-button" type="submit">
          Save Job
        </button>
      </form>
    </div>
  );
}
