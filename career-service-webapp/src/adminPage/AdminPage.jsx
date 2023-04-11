import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import { Routes, Route } from "react-router-dom";
import UserList from "./UserList";
import JobList from "./JobList";
import "./css/Admin.css";

export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  refresh = () => {
    console.log("before");
    window.setTimeout(function () {
      window.location.assign("./#/admin");
      console.log("after");
    }, 100);
    window.location.reload();
  };

  render() {
    return (
      <div className="employer-page-container">
        <div className="employer-navbar">
          <a href="./#/admin/" className=" test-link">
            <button className="employer-options button-9"> All Users</button>
          </a>
          <a href="./#/admin/joblist/" className=" test-link">
            <button className="employer-options button-9">All Jobs </button>
          </a>
        </div>
        <Routes>
          <Route
            path={"/"}
            element={<UserList cookies={this.props.cookies} />}
          />
          <Route
            key={Math.random()}
            path={"/joblist"}
            element={<JobList cookies={this.props.cookies} />}
          />
        </Routes>
      </div>
    );
  }
}
