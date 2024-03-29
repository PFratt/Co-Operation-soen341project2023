import * as React from "react";
import { Table } from "react-bootstrap";
import { Icon } from "@fluentui/react/lib/Icon";
import "./css/Candidate.css";
import JobPosting from "./JobPosting";
import JobApplication from "./JobApplication";
import ApplicationStatus from "./ApplicationStatus";
import CandidateProfile from "./CandidateProfile";
import axios from "axios";

const fakejoblist = [
  {
    jobNum: 1,
    title: "software",
    employer: "big corporation",
    date: "from 2023-2024",
    description: "Software job in big corporation doing big corporation things",
    deadline: "May 1, 2023",
    status: "none",
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
    status: "rejected",
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
      showProfilePage: false,
      jobList: [],
      employerList: [],
      update: false,
    };
    this.jobApplicationBtnClicked = this.jobApplicationBtnClicked.bind(this);
    this.updateFunction = this.updateFunction.bind(this);
    this.getJobList();
  }

  async getJobList() {
    try {
      const jobResponse = await axios.get("https://sawongdomain.com/jobs", {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
        },
      });
      const applicationResponse = await axios.get(
        "https://sawongdomain.com/applications",
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }
      );
      const employersResponse = await axios.get(
        "https://sawongdomain.com/users/employers",
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }
      );
      const jobList = jobResponse.data;
      const applicationList = applicationResponse.data;
      const employerList = employersResponse.data;

      const combinedList = jobList.map((job) => ({
        job,
        matchingApplications: applicationList.filter(
          (application) =>
            application.jobID === job.jobID &&
            application.userID === parseInt(this.props.cookies.get("userID"))
        ),
      }));

      this.setState({ jobList: combinedList, employerList: employerList });
    } catch (error) {
      console.error(error);
    }
  }

  updateFunction() {
    this.setState({ update: !this.state.update });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update !== prevState.update) {
      window.location.reload();
    }
  }

  //test function just to show how it works
  mapfunctiontest = () => {
    console.log("maptest called");
    return this.state.jobList.map(({ job, matchingApplications }) => {
      let jobNum = job.jobID;
      let title = job.title;
      if (
        !this.state.employerList.find((emp) => emp.id === job.employerID)?.name
      )
        return null;
      let employer = this.state.employerList.find(
        (emp) => emp.id === job.employerID
      )?.name;
      let date = job.date_posted;
      let description = job.role_description;
      let deadline = job.date_deadline;

      let status = matchingApplications.filter(arr => arr.length !== 0).length != 0 ? matchingApplications[0].status : "none";
      let date_applied = matchingApplications.filter(arr => arr.length !== 0).length != 0 ? matchingApplications[0].date_applied : null;

      console.log(status);
      return (
        <tr>
          <td>{jobNum}</td>
          <td
            onClick={() => {

              this.setState({ selectedJob: { jobNum, title, employer, date, description, deadline, status, date_applied } });

            }}
          >
            {title}
          </td>
          <td>{employer}</td>
          <td>{date}</td>
          <td>

            {status != "none" ? <ApplicationStatus statusValue={status}></ApplicationStatus> : null}
          </td>
        </tr>
      );
    });
  };

  jobPosting = (jobNum, title, employer, date, description, deadline, status, date_applied) => {

    console.log(title);
    return (
      <JobPosting
        jobNum={jobNum}
        title={title}
        employer={employer}
        date={date}
        description={description}
        deadline={deadline}
        status={status}
        date_applied={date_applied}
        hideJobPosting={this.hideJobPosting}
        jobApplicationBtnClicked={this.jobApplicationBtnClicked}
        isApplicationBtnClicked={this.state.isApplicationBtnClicked}
        cookies={this.props.cookies}
        refresh={this.updateFunction}
      />
    );
  };
  hideJobPosting = () => {
    this.setState({ selectedJob: null });
  };
  jobApplicationBtnClicked = () => {
    this.setState({
      isApplicationBtnClicked: !this.state.isApplicationBtnClicked,
    });
  };
  profilePageToggle = () => {
    this.setState({ showProfilePage: !this.state.showProfilePage });
  };
  render() {
    return (
      <div className="candidate-page-container">
        <div className="job-list-wrapper">
          <button onClick={this.profilePageToggle} className="ViewProfileBtn">
            View Profile
          </button>
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
          {this.state.selectedJob || this.state.update
            ? this.jobPosting(

              this.state.selectedJob.jobNum,
              this.state.selectedJob.title,
              this.state.selectedJob.employer,
              this.state.selectedJob.date,
              this.state.selectedJob.description,
              this.state.selectedJob.deadline,
              this.state.selectedJob.status,
              this.state.selectedJob.date_applied
            )
            : null}
        </div>
        <div className="candidate-profile-wrapper">
          {this.state.showProfilePage ? (
            <CandidateProfile cookies={this.props.cookies} />
          ) : null}
        </div>
      </div>
    );
  }
}
