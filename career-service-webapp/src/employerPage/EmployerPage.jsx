import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { Routes, Route } from "react-router-dom";
import MyJobs from "./MyJobs";
import Applicants from "./Applicants";
import AllCandidates from "./AllCandidates";

export default class EmployerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  refresh = () => {
    console.log("before");
    window.setTimeout(function () {
      window.location.assign("./#/employer/applicants");
      console.log("after");
    }, 100);
    window.location.reload();
  }

  render() {
    return (
      <div className="employer-page-container">
        <div className="employer-navbar">
          <a href="./#/employer/applicants" className=" test-link">
            <button className="employer-options button-9">
              {" "}
              My Applicants
            </button>
          </a>
          <a href="./#/employer/" className=" test-link">
            <button className="employer-options button-9">My Jobs </button>
          </a>
          <a href="./#/employer/all-candidates/" className=" test-link">
            <button className="employer-options button-9">
              Candidate Browsing
            </button>
          </a>
        </div>
        <Routes>
          <Route path={"/"} element={<MyJobs cookies={this.props.cookies} />} />
          <Route
            key={Math.random()}
            path={"/applicants"}
            element={<Applicants refresh={this.refresh} cookies={this.props.cookies} />}
          />
          <Route
            path={"/all-candidates"}
            element={<AllCandidates cookies={this.props.cookies} />}
          />
        </Routes>
      </div>
    );
  }
}
