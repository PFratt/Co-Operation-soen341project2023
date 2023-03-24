import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";

import { Table } from "react-bootstrap";
import ApplicantProfile from "./ApplicantProfile";
import "./css/Employer.css";
const fakeApplications = [
  {
    applicationNum: "1",
    userName: "qian1",
    appliedjob: "job1",
    date: "02-01-2023",
  },
  {
    applicationNum: "2",
    userName: "qian1",
    appliedjob: "job2",
    date: "02-01-2023",
  },
  {
    applicationNum: "3",
    userName: "qian1",
    appliedjob: "job3",
    date: "02-01-2023",
  },
  {
    applicationNum: 4,
    userName: "qian1",
    appliedjob: "job4",
    date: "02-01-2023",
  },
  {
    applicationNum: "5",
    userName: "qian1",
    appliedjob: "job5",
    date: "02-01-2023",
  },
  {
    applicationNum: 6,
    userName: "qian1",
    appliedjob: "job1",
    date: "02-01-2023",
  },
];
export default class Applicants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewApplicant: null,
      applicantStatusColor: "",
    };
  }
  mapfunctiontest = () => {
    console.log("maptest called");
    return fakeApplications.map(
      ({ applicationNum, userName, appliedjob, date }) => {
        return (
          <tr>
            <td>{applicationNum}</td>
            <td
              onClick={() => {
                this.setState({
                  viewApplicant: { applicationNum, userName, appliedjob, date },
                });
              }}
            >
              {userName}
            </td>
            <td>{appliedjob}</td>
            <td>{date}</td>
          </tr>
        );
      }
    );
  };
  applicantProfile = (applicationNum, userName, appliedjob, date) => {
    return (
      <ApplicantProfile
        applicationNum={applicationNum}
        userName={userName}
        appliedjob={appliedjob}
        date={date}
        closeApplicantView={this.closeApplicantView}
        interview={this.interview}
        reject={this.reject}
        clear={this.clear}
      />
    );
  };
  interview = () => {
    this.setState({ applicantStatusColor: " green " });
  };
  reject = () => {
    this.setState({ applicantStatusColor: " red " });
  };
  clear = () => {
    this.setState({ applicantStatusColor: "" });
  };
  applicantStatusColor;
  closeApplicantView = () => {
    this.setState({ viewApplicant: null });
  };
  render() {
    return (
      <div className="applicants-page-container">
        <div className="applicant-list-wrapper">
          <Table className="job-list-table" striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Applicant Name</th>
                <th>Applied Job</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-body">{this.mapfunctiontest()}</tbody>
          </Table>{" "}
          {this.state.viewApplicant
            ? this.applicantProfile(
                this.state.viewApplicant.applicantNum,
                this.state.viewApplicant.userName,
                this.state.viewApplicant.appliedjob,
                this.state.viewApplicant.date
              )
            : null}
        </div>
      </div>
    );
  }
}
