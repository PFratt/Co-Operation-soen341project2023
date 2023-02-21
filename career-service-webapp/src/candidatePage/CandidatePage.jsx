import * as React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "@fluentui/react/lib/Icon";
import "./css/Candidate.css";
import JobPosting from "./JobPosting";
import JobApplication from "./JobApplication";
import ApplicationStatus from "./ApplicationStatus";

const fakejoblist = [
  {
    jobNum: 1,
    title: "software",
    employer: "big corporation",
    date: "from 2023-2024",
    description: "Software job in big corporation doing big corporation things",
    deadline: "May 1, 2023",
    status: "",
  },
  {
    jobNum: 2,
    title: "elec",
    employer: "medium corporation",
    date: "from 2023-2024",
    description: "Job description Job description Job description",
    deadline: "May 2, 2023",
    status: "pending",
  },
  {
    jobNum: 3,
    title: "aero",
    employer: "small corporation",
    date: "from 2023-2024",
    description: "Job description Job description Job description",
    deadline: "May 3, 2023",
    status: "interview",
  },
  {
    jobNum: 4,
    title: "coen",
    employer: "bigger corporation",
    date: "from 2023-2024",
    description: "Job description Job description Job description",
    deadline: "May 4, 2023",
    status: "offer",
  },
  {
    jobNum: 5,
    title: "soen",
    employer: "biggest corporation",
    date: "from 2023-2024",
    description: "Job description Job description Job description",
    deadline: "May 5, 2023",
    status: "accepted",
  },
];
export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      selectedJob: null,
      isApplicationBtnClicked: false,
    };
    this.jobApplicationBtnClicked = this.jobApplicationBtnClicked.bind(this);
  }
  //test function just to show how it works
  mapfunctiontest = () => {
    console.log("maptest called");
    return fakejoblist.map(({ jobNum, title, employer, date, description, deadline, status }) => {
      return (
        <tr>
          <td>{jobNum}</td>
          <td
            onClick={() => {
              this.setState({ selectedJob: { jobNum, title, employer, description, deadline, date } });
            }}
          >
            {title}
          </td>
          <td>{employer}</td>
          <td>{date}</td>
        </tr>
      );
    });
  };
  jobPosting = (jobNum, title, employer, date, description, deadline) => {
    console.log(title);
    return (
      <JobPosting
        jobNum={jobNum}
        title={title}
        employer={employer}
        date={date}
        description={description}
        deadline={deadline}
        hideJobPosting={this.hideJobPosting}
        jobApplicationBtnClicked={this.jobApplicationBtnClicked}
        isApplicationBtnClicked={this.state.isApplicationBtnClicked}
      />
    );
  };
  hideJobPosting = () => {
    this.setState({ selectedJob: null });
  };
  jobApplicationBtnClicked = () => {
    this.setState({ isApplicationBtnClicked: !this.state.isApplicationBtnClicked })
  };
  render() {
    return (
      <div className="candidate-page-container">
        <div className="job-list-wrapper">
          <Table className="job-list-table" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Job Title</th>
                <th>Employer</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{this.mapfunctiontest()}</tbody>
          </Table>{" "}
        </div>
        <div className="job-posting-wrapper">
          {this.state.selectedJob
            ? this.jobPosting(
                this.state.selectedJob.jobNum,
                this.state.selectedJob.title,
                this.state.selectedJob.employer,
                this.state.selectedJob.date,
                this.state.selectedJob.description,
                this.state.selectedJob.deadline
              )
            : null}
        </div>
        <div className="ApplicationStatusTEST-wrapper">
          <ApplicationStatus statusValue={"accepted"}/>
        </div>
      </div>
    );
  }
}
