import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  render() {
    return (
      <div className="login-page-container">
        <div className="login-wrapper">
          Login
          <br></br>
          <input defaultValue={"Username"} />
          <br></br>
          <input defaultValue={"Password"} />
        </div>
        <div className="signup-wrapper">
          Signup
          <br></br>
          <input defaultValue={"Username"} />
          <br></br>
          <input defaultValue={"Password"} />
        </div>
      </div>
    );
  }
}
