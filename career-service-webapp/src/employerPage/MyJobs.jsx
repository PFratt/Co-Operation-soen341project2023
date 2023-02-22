import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { Table } from "react-bootstrap";
const fakeEmployerJobList = [
  {
    jobID: "1",
    title: "job1",
    role_description: "some role",
    date_posted: "02-01-2023",
    date_deadline: "01-03-2023",
  },
  {
    jobID: "2",
    title: "job2",
    role_description: "some role",
    date_posted: "02-01-2023",
    date_deadline: "01-03-2023",
  },
  {
    jobID: "3",
    title: "job3",
    role_description: "some role",
    date_posted: "02-01-2023",
    date_deadline: "01-03-2023",
  },
  {
    jobID: "4",
    title: "job4",
    role_description: "some role",
    date_posted: "02-01-2023",
    date_deadline: "01-03-2023",
  },
  {
    jobID: "5",
    title: "job5",
    role_description: "some role",
    date_posted: "02-01-2023",
    date_deadline: "01-03-2023",
  },
];
export default class MyJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      selectedJob: null,
    };
  }

  mapfunctiontest = () => {
    console.log("maptest called");
    return fakeEmployerJobList.map(
      ({ jobID, title, role_description, date_posted, date_deadline }) => {
        return (
          <tr>
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
  myJobPost = (jobID, title, role_description, date_posted, date_deadline) => {
    return (
      <myJobPost
        jobID={jobID}
        title={title}
        role_description={role_description}
        date_posted={date_posted}
        date_deadline={date_deadline}
        hideJob={this.hideJob}
      />
    );
  };
  hideJob = () => {
    this.setState({ selectedJob: null });
  };
  addJob = () => {
    fakeEmployerJobList.add({
      employerID: "userID",
      jobID: "jobID",
      title: "title",
      role_description: "role_description",
      date_posted: "date_posted",
      date_deadline: "date_deadline",
    });
  };
  render() {
    return (
      <div className="myjobs-page-container">
        <div className="myjobs-wrapper">
          <button
            onClick={() => {
              this.addJob();
            }}
          >
            Add Job
          </button>
          <Table className="myjobs-table" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Job Title</th>
                <th>Description</th>
                <th>Date Posted</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>{this.mapfunctiontest()}</tbody>
          </Table>{" "}
        </div>
        <div className="myjobs-wrapper">
          {this.state.selectedJob
            ? this.myJobList(
                this.state.selectedJob.jobID,
                this.state.selectedJob.title,
                this.state.selectedJob.role_description,
                this.state.selectedJob.date_posted,
                this.state.selectedJob.date_deadline
              )
            : null}
        </div>
      </div>
    );
  }
}
