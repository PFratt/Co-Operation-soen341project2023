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
        employer page maybe search bar here?<br></br>
        <a href="./#/employer/applicants" className=" test-link">
          <button> Particular applicants Job View</button>
        </a>
        <br></br>
        <a href="./#/employer/" className=" test-link">
          <button>My Job List view </button>
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
