import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { Routes, Route } from "react-router-dom";
import MyJobs from "./MyJobs";
import Applicants from "./Applicants";

export default class EmployerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  render() {
    return (
      <div className="employer-page-container">
        employer page <br></br>
        <a href="./#/employer/applicants" className=" test-link">
          Particular applicants Job View
        </a>
        <br></br>
        <a href="./#/employer/" className=" test-link">
          My Job List view
        </a>
        <br></br>
        <Routes>
          <Route path={"/"} element={<MyJobs />} />
          <Route path={"/applicants"} element={<Applicants />} />
        </Routes>
      </div>
    );
  }
}
