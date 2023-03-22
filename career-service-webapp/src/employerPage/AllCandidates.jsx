import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import axios from "axios";
import { Table } from "react-bootstrap";
import ApplicantProfile from "./ApplicantProfile";
const fakeCandidates = [
  {
    userName: "name1",
    info: "good",
  },
  {
    userName: "name2",
    info: "bad",
  },
  {
    userName: "name3",
    info: "ok",
  },
  {
    userName: "qian4",
    info: "great",
  },
  {
    userName: "name5",
    info: "meh",
  },
];
export default class Applicants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateList: []
    };
    this.getCandidateList();
  }

  getCandidateList = async () => {
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
        })
      ]);

      const [studentsResponse, profilesResponse] = response;

      const studentListWithProfiles = studentsResponse.data.map((student) => {
        const profile = profilesResponse.data.find((profile) => profile.userID == student.id);
        if (profile) {
          return { student, profile };
        }
        return null; // skip this entry
      }).filter(Boolean); // filter out null entries

      console.log(studentListWithProfiles);

      this.setState({ candidateList: studentListWithProfiles });
    } catch (error) {
      console.log(error);
    }
  };



  mapfunctiontest = () => {
    console.log("maptest called");
    return this.state.candidateList.map((student) => {
      return (
        <tr>
          <td>{student.student.name}</td>
          <td>{student.profile.headline}</td>
          <td>{student.profile.description}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="all-candidate-page-container">
        <div className="all-candidate-list-wrapper">
          <Table className="all-candidate-list-table" striped bordered hover>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Headline</th>
                <th>Curriculum Vitae</th>
              </tr>
            </thead>
            <tbody>{this.mapfunctiontest()}</tbody>
          </Table>{" "}
        </div>
      </div>
    );
  }
}
