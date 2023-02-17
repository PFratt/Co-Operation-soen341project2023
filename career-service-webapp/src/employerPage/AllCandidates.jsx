import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";

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
    this.state = {};
  }
  mapfunctiontest = () => {
    console.log("maptest called");
    return fakeCandidates.map(({ userName, info }) => {
      return (
        <tr>
          <td>{userName}</td>
          <td>{info}</td>
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
                <th>Detail summary</th>
              </tr>
            </thead>
            <tbody>{this.mapfunctiontest()}</tbody>
          </Table>{" "}
        </div>
      </div>
    );
  }
}
