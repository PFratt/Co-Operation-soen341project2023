import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { Icon } from "@fluentui/react/lib/Icon";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  render() {
    return (
      <>
        Login Page
        <br></br>
        <input defaultValue={"Username"} />
        <br></br>
        <input defaultValue={"Password"} />
        this is just a proof that it works
        {/* <div className="router-page-container">
          <div className="selected-page-container">
            {console.log(process.env.PUBLIC_URL)}
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/calendar"} element={<CalendarApp />} />
              <Route path={"/school"} element={<SchoolApp />} />
              <Route path={"/snake"} element={<SnakeGame />} />
              <Route path={"*"} element={<NoPage />} />
            </Routes>
          </div>
        </div> */}
      </>
    );
  }
}
