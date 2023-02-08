import * as React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "@fluentui/react/lib/Icon";
import "./css/Candidate.css";
import JobApplication from "./JobApplication";

const fakejoblist = [
  {
    jobNum: 1,
    title: "software",
    employer: "big corporation",
    date: "from 2023-2024",
  },
  {
    jobNum: 2,
    title: "elec",
    employer: "medium corporation",
    date: "from 2023-2024",
  },
  {
    jobNum: 3,
    title: "aero",
    employer: "small corporation",
    date: "from 2023-2024",
  },
  {
    jobNum: 4,
    title: "coen",
    employer: "bigger corporation",
    date: "from 2023-2024",
  },
  {
    jobNum: 5,
    title: "soen",
    employer: "biggest corporation",
    date: "from 2023-2024",
  },
];
export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
      selectedJob: null
    };
  }
  //test function just to show how it works
  mapfunctiontest = () => {
    console.log("maptest called");
    return fakejoblist.map(({ jobNum, title, employer, date }) => {
      return (
        <tr>
          <td>{jobNum}</td>
          <td
            onClick={() => {
              this.setState({ selectedJob: { jobNum, title, employer, date } });
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
  jobApplication = (jobNum, title, employer, date) => {
    console.log(title);
    return (
      <JobApplication 
        jobNum={jobNum}
        title={title}
        employer={employer}
        date={date}
        />
    );
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
        <div className="job-application-wrapper">
          {this.state.selectedJob ? this.jobApplication(this.state.selectedJob.jobNum, this.state.selectedJob.title, this.state.selectedJob.employer, this.state.selectedJob.date) : null}
        </div>
      </div>
    );
  }
}
