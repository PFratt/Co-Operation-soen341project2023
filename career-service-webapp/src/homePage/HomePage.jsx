import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { Icon } from "@fluentui/react/lib/Icon";
import LoginPage from "./LoginPage";
import CandidatePage from "../candidatePage/CandidatePage";
import EmployerPage from "../employerPage/EmployerPage";
import AdminPage from "../adminPage/AdminPage";
import ErrorPage from "./ErrorPage";
import "./css/Home.css";
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
        {/* test menu to navigate components before implementing login, */}
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
          <a href="./Co-Operation-soen341project2023" className=" test-link">
            home
          </a>
        </div>
        <div className="selected-page-container">
          <Routes>
            <Route path={"/"} element={<LoginPage />} />
            <Route path={"/candidate"} element={<CandidatePage />} />
            <Route path={"/employer/*"} element={<EmployerPage />} />
            <Route path={"/admin"} element={<AdminPage />} />
            <Route path={"*"} element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    );
  }
}
