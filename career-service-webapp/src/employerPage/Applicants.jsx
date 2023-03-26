import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import axios from "axios";
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
      applicants: [],
      refresh: 0
    };
    this.getApplicantsList();
  }

  getApplicantsList = async () => {
    console.log("Request");

    try {
      const response = await axios.all([
        axios.get(`https://sawongdomain.com/users/students`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }),
        axios.get(`https://sawongdomain.com/profiles`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }),
        axios.get(`https://sawongdomain.com/jobs/${this.props.cookies.get("userID")}`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }),
        axios.get(`https://sawongdomain.com/applications`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        })
      ]);

      const [studentsResponse, profilesResponse, jobsResponse, applicationsResponse] = response;

      const studentListWithProfiles = studentsResponse.data.map((student) => {
        const profile = profilesResponse.data.find((profile) => profile.userID == student.id);
        if (profile) {
          return { student, profile };
        }
        return null; // skip this entry
      }).filter(Boolean); // filter out null entries

      const applicationsToMyJobs = applicationsResponse.data.map((application) => {
        const job = jobsResponse.data.find((job) => job.jobID == application.jobID);
        if (job) {
          return { job, application };
        }
        return null;
      }).filter(Boolean);

      const applicants = applicationsToMyJobs.map(application => {
        const student = studentListWithProfiles.find(student => student.student.id == application.application.userID);
        if (student) {
          return { student, application };
        }
        return null;
      }).filter(Boolean);

      console.log(applicants);

      this.setState({ applicants: applicants });
    } catch (error) {
      console.log(error);
    }
  };

  getRandomInt() {
    return Math.floor(Math.random() * (999999999 - 1 + 1)) + 1;
  }
  

  mapfunctiontest = () => {
    console.log("maptest called");
    return this.state.applicants.map(
      (applicant) => {
        let _id = applicant.application.application.id;
        console.log(_id);
        let status = applicant.application.application.status;
        let userName = applicant.student.student.name;
        let appliedjob = applicant.application.job.title;
        let date = applicant.application.application.date_applied;
        let jobID = applicant.application.application.jobID;
        let userID = applicant.application.application.userID;
        return (
          <tr>
            <td>{status}</td>
            <td
              onClick={() => {
                this.setState({
                  viewApplicant: { status, userName, appliedjob, date, _id, jobID, userID },
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
  applicantProfile = (status, userName, appliedjob, date, _id) => {
    return (
      <ApplicantProfile
        status={status}
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
    let modifyapplication = {
      date_applied: this.state.viewApplicant.date,
      status: "interview",
      jobID: parseInt(this.state.viewApplicant.jobID),
      userID: parseInt(this.state.viewApplicant.userID)
    }
    this.setState({ applicantStatusColor: " green " });
    axios
      .put(`https://sawongdomain.com/updateapplication/${this.state.viewApplicant._id}`, modifyapplication, {
        headers: {
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({refresh: this.getRandomInt()});
        console.log(this.state.refresh);
        this.getApplicantsList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  reject = () => {
    this.setState({ applicantStatusColor: " red " });
    let modifyapplication = {
      date_applied: this.state.viewApplicant.date,
      status: "rejected",
      jobID: parseInt(this.state.viewApplicant.jobID),
      userID: parseInt(this.state.viewApplicant.userID)
    }
    axios
      .put(`https://sawongdomain.com/updateapplication/${this.state.viewApplicant._id}`, modifyapplication, {
        headers: {
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({refresh: this.getRandomInt()});
        this.getApplicantsList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  clear = () => {
    this.setState({ applicantStatusColor: "" });
    let modifyapplication = {
      date_applied: this.state.viewApplicant.date,
      status: "accepted",
      jobID: parseInt(this.state.viewApplicant.jobID),
      userID: parseInt(this.state.viewApplicant.userID)
    }
    axios
      .put(`https://sawongdomain.com/updateapplication/${this.state.viewApplicant._id}`, modifyapplication, {
        headers: {
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({refresh: this.getRandomInt()});
        this.getApplicantsList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  applicantStatusColor;
  closeApplicantView = () => {
    this.setState({ viewApplicant: null });
  };
  render() {
    return (
      <div className="applicants-page-container">
        <div className="applicant-list-wrapper">
          <Table className="job-list-table" key={this.state.refresh} striped bordered hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>Applicant Name</th>
                <th>Applied Job</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody className="table-body">{this.mapfunctiontest()}</tbody>
          </Table>{" "}
          {this.state.viewApplicant
            ? this.applicantProfile(
              this.state.viewApplicant.status,
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
