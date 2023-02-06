import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Icon } from "@fluentui/react/lib/Icon";
import LoginPage from "./LoginPage";
import CandidatePage from "../candidatePage/CandidatePage";
import EmployerPage from "../employerPage/EmployerPage";
import AdminPage from "../adminPage/AdminPage";
import ErrorPage from "./ErrorPage";
import "./css/Home.css";
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  render() {
    return (
      <div className="homepage-container">
        <TempLinkAccess />
        <div className="selected-page-container">
          <Routes>
            <Route path={"/"} element={<LoginPage />} />
            <Route
              path={"/candidate"}
              element={
                <ProtectedRoute user={true}>
                  {" "}
                  <CandidatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/employer/*"}
              element={
                <ProtectedRoute user={true}>
                  {" "}
                  <EmployerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path={"/admin"}
              element={
                <ProtectedRoute user={true}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />{" "}
            <Route path={"*"} element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    );
  }
}
const TempLinkAccess = ({ props }) => {
  return (
    <div className="test-menu">
      <a href="./#/candidate" className=" test-link">
        {" "}
        candidate
      </a>
      <a href="./#/employer" className=" test-link">
        employer
      </a>
      <a href="./#/admin" className=" test-link">
        admin
      </a>
      <a href="./" className=" test-link">
        home
      </a>
    </div>
  );
};
const ProtectedRoute = ({ user, redirectPath = "/", children }) => {
  console.log(user);
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
