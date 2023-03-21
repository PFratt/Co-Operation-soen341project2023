import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Icon } from "@fluentui/react/lib/Icon";
import LoginPage from "./LoginPage";
import CandidatePage from "../candidatePage/CandidatePage";
import EmployerPage from "../employerPage/EmployerPage";
import AdminPage from "../adminPage/AdminPage";
import ErrorPage from "./ErrorPage";
import Cookies from "universal-cookie";

import "./css/Home.css";

const cookies = new Cookies();
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateAccess: false,
      employerAccess: false,
      adminAccess: false,
    };
    this.checkAccess();
  }

  componentDidMount() {
    //timeouts needed to add "delay"
    if (this.state.candidateAccess)
      setTimeout(() => {
        window.location = "./#/candidate";
      }, 0);
    if (this.state.employerAccess)
      setTimeout(() => {
        window.location = "./#/employer";
      }, 0);
    if (this.state.adminAccess)
      setTimeout(() => {
        window.location = "./#/admin";
      }, 0);
  }
  checkAccess = () => {
    let userType = String(cookies.get("userType"));
    if (userType === "student") {
      this.state.candidateAccess = true;
    }
    if (userType === "employer") {
      this.state.employerAccess = true;
    }
    if (userType === "admin") {
      this.state.adminAccess = true;
    }
  };
  logout = () => {
    cookies.remove("authToken");
    cookies.remove("userType");
    window.location = "./";
  };
  render() {
    return (
      <div className="homepage-container">
        {/* temporary access links for quick testing, this should be done by routing but well leave it for development */}
        <TempLinkAccess logout={this.logout} />
        <div className="selected-page-container">
          <Routes>
            {/* login page, default page, login and signup */}
            <Route
              path={"/"}
              element={
                <LoginPage cookies={cookies} shouldUpdate={this.shouldUpdate} />
              }
            />
            <Route
              path={"/candidate"}
              element={
                <ProtectedRoute user={this.state.candidateAccess}>
                  {" "}
                  {/* brings to main candidate page */}
                  <CandidatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/employer/*"}
              element={
                <ProtectedRoute user={this.state.employerAccess}>
                  {" "}
                  {/* brings to main employer page */}
                  <EmployerPage cookies={cookies} />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/admin"}
              element={
                <ProtectedRoute user={this.state.adminAccess}>
                  {/* brings to main admin page */}
                  <AdminPage />
                </ProtectedRoute>
              }
            />{" "}
            {/* error page in case a bad link is manually inputted or some routing issue */}
            <Route path={"*"} element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    );
  }
}
//temporary link access for development
const TempLinkAccess = ({ logout }) => {
  return (
    <div className="menu">
      <button className="button-9 logout" onClick={logout}>
        {" "}
        logout
      </button>
    </div>
  );
};
//protects the redirect links so that rerouting only works if a condition is fulfilled
const ProtectedRoute = ({ user, redirectPath = "/", children }) => {
  console.log(user);
  if (!user) {
    cookies.remove("authToken");
    cookies.remove("userType");
    window.location = "./";
    return;
  }

  return children;
};
