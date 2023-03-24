import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { Table } from "react-bootstrap";
import MyJobPost from "./MyJobPost";
import { Cookies } from "react-cookie";
import axios from "axios";

export default class MyJobs extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth() + 1;

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    this.state = {
      selectedJob: null,
      jobList: [{ title: "N/A" }],
      addJobTitle: "",
      addJobDesc: "",
      addJobDatePosted: currentDate,
      addJobDeadline: "",
      addJobView: false,
      editJobView: false,
    };
    this.getJobList();
  }

  getJobList = async () => {
    console.log(this.props.cookies.get("userID"));
    axios
      .get(
        `https://sawongdomain.com/jobs/${this.props.cookies.get("userID")}`,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }
      )
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
            You have no job postings yet.
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
  myJobPost = (jobID, title, role_description, date_posted, date_deadline) => {
    return (
      <MyJobPost
        jobID={jobID}
        title={title}
        role_description={role_description}
        date_posted={date_posted}
        date_deadline={date_deadline}
        hideJob={this.hideJob}
        cookies={this.props.cookies}
        refreshJobs={this.getJobList}
      ></MyJobPost>
    );
  };
  hideJob = (value) => {
    if (value === "add") this.setState({ addJobView: false });
    this.setState({ selectedJob: null });
    if (value === "edit") this.setState({ modJobView: false });
    this.setState({ selectedJob: null });
  };
  addJob = () => {
    this.setState({ addJobView: true });
  };
  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  };
  sendJob = () => {
    let newJob = {
      employerID: this.props.cookies.get("userID"),
      title: this.state.addJobTitle,
      role_description: this.state.addJobDesc,
      date_posted: this.state.addJobDatePosted,
      date_deadline: this.state.addJobDeadline,
    };
    axios
      .post("https://sawongdomain.com/addjob", newJob, {
        headers: {
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log(response);
        this.getJobList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // editJob = () => {
  //   let modifyJob = {
  //     title: this.state.editJobTitle,
  //     role_description: this.state.editJobDesc,
  //     date_deadline: this.state.editJobDeadline,
  //   };
  //   axios
  //     .put(
  //       `https://samwongdimain.com/modifyjob/${this.props.cookies.get(
  //         "jobID"
  //       )}`,
  //       modifyJob,
  //       {
  //         headers: {
  //           Authorization: this.props.cookies.get("authToken"),
  //           "Access-Control-Allow-Headers": "Authorization",
  //           "Content-Type": "application/json;charset=UTF-8",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  // deleteJob = () => {
  //   axios
  //     .delete(
  //       `https://samwongdimain.com/deletejob/${this.props.cookies.get(
  //         "jobID"
  //       )}`,
  //       {
  //         headers: {
  //           Authorization: this.props.cookies.get("authToken"),
  //           "Access-Control-Allow-Headers": "Authorization",
  //           "Content-Type": "application/json;charset=UTF-8",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       alert("Job Deleted");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
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
          <button
            onClick={() => {
              this.getJobList();
            }}
          >
            get listJob
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
          </Table>
        </div>
        <div className="myjobs-wrapper">
          {this.state.selectedJob
            ? this.myJobPost(
                this.state.selectedJob.jobID,
                this.state.selectedJob.title,
                this.state.selectedJob.role_description,
                this.state.selectedJob.date_posted,
                this.state.selectedJob.date_deadline
              )
            : null}
        </div>
        {this.state.addJobView ? (
          <AddJobPopup
            title={this.state.addJobTitle}
            role_description={this.state.addJobDesc}
            date_posted={this.state.addJobDatePosted}
            date_deadline={this.state.addJobDeadline}
            hideJob={() => {
              this.hideJob("add");
            }}
            handleInputChange={this.handleInputChange}
            sendJob={this.sendJob}
          />
        ) : null}
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
function AddJobPopup({
  title,
  role_description,
  date_posted,
  date_deadline,
  hideJob,
  handleInputChange,
  sendJob,
}) {
  return (
    <div className="add-job-component">
      <button onClick={hideJob}>Cancel </button>
      <form onSubmit={sendJob}>
        <p>
          Title:{" "}
          <input
            name="addJobTitle"
            className="add-job-input"
            placeholder="Job Title"
            value={title}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Description:{" "}
          <input
            name="addJobDesc"
            className="add-job-input"
            placeholder="Short Role Description"
            value={role_description}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Date Posted:{" "}
          <input
            name="addJobDatePosted"
            className="add-job-input"
            placeholder="YYYY-MM-DD"
            value={date_posted}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Deadline:{" "}
          <input
            name="addJobDeadline"
            className="add-job-input"
            placeholder={date_deadline}
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
