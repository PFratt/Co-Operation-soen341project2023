import * as React from "react";
import { Icon } from "@fluentui/react/lib/Icon";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "",
      candidateButton: "",
      employerButton: "",
      adminButton: "",
    };
  }
  login = () => {
    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPassword").value;
    //replace alert by api login call
    alert(
      "Login \n" +
        "username: " +
        username +
        " password: " +
        password +
        " user: " +
        this.state.userType
    );
    document.cookie = "auth=someauthtoken;";
  };
  signUp = () => {
    let username = document.getElementById("signupUser").value;
    let password = document.getElementById("signupPassword").value;
    //replace alert by api login call
    alert(
      "Signup\n" +
        "username: " +
        username +
        " password: " +
        password +
        " user: " +
        this.state.userType
    );
    document.cookie = "auth=someauthtoken;";
  };
  selectUser(name) {
    this.setState({
      userType: name,
      candidateButton: "",
      employerButton: "",
      adminButton: "",
    });
    if (name === "candidate")
      this.setState({ candidateButton: "selected-user-type" });

    if (name === "employer")
      this.setState({ employerButton: "selected-user-type" });

    if (name === "admin") this.setState({ adminButton: "selected-user-type" });
  }
  render() {
    return (
      <div className="login-page-container">
        <div className="user-type-wrapper">
          <button
            className={this.state.candidateButton}
            onClick={() => {
              this.selectUser("candidate");
            }}
          >
            {" "}
            Candidate
          </button>
          <button
            className={this.state.employerButton}
            onClick={() => {
              this.selectUser("employer");
            }}
          >
            {" "}
            Employer
          </button>
          <button
            className={this.state.adminButton}
            onClick={() => {
              this.selectUser("admin");
            }}
          >
            {" "}
            Admin
          </button>
        </div>
        <div className="login-wrapper">
          Login
          <br></br>
          <input
            id="loginUser"
            className="login-input"
            placeholder={"Username"}
          />
          <br></br>
          <input
            id="loginPassword"
            className="login-input"
            placeholder={"Password"}
          />
          <br></br>
          <button className="login-button" onClick={this.login}>
            Login
          </button>
        </div>
        <div className="signup-wrapper">
          Signup
          <br></br>
          <input
            id="signupUser"
            className="login-input"
            placeholder={"Username"}
          />
          <br></br>
          <input
            id="signupPassword"
            className="login-input"
            placeholder={"Password"}
          />
          <br></br>
          <button className="login-button" onClick={this.signUp}>
            Sign up
          </button>
        </div>
      </div>
    );
  }
}
