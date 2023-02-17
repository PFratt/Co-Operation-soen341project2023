import * as React from "react";
import axios from "axios";
import { Icon } from "@fluentui/react/lib/Icon";

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
  redirect = (response) => {
    this.props.cookies.set("authToken", response.data.accessToken, {
      maxAge: 3600,
    });
    this.props.cookies.set("userType", this.state.userType, { maxAge: 3600 });
    window.location = "./";
  };
  login = () => {
    let inputEmail = document.getElementById("loginUser").value;
    let inputPassword = document.getElementById("loginPassword").value;

    let loginInfo = {
      email: inputEmail,
      password: inputPassword,
      userType: this.state.userType,
    };
    // let testLoginInfo = {
    //   email: "qianywang25@gmail.com",
    //   password: "abc123",
    //   userType: "student",
    // };
    axios
      .post("https://sawongdomain.com/login", loginInfo, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log("login api response");
        this.redirect(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  signUp = () => {
    let username = document.getElementById("signupUser").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let signupInfo = {
      name: username,
      email: email,
      password: password,
      userType: this.state.userType,
    };
    // let testSignupInfo = {
    //   name: "qian",
    //   email: "qianywang25@gmail.com",
    //   password: "abc123",
    //   userType: "student",
    // };
    axios
      .post("https://sawongdomain.com/signup", signupInfo, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        this.redirect(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  selectUser = (name) => {
    this.setState({
      userType: name,
      candidateButton: "",
      employerButton: "",
      adminButton: "",
    });
    if (name === "student")
      this.setState({ candidateButton: "selected-user-type" });

    if (name === "employer")
      this.setState({ employerButton: "selected-user-type" });

    if (name === "admin") this.setState({ adminButton: "selected-user-type" });
  };
  render() {
    return (
      <div className="login-page-container">
        <div className="login-wrapper">
          Login
          <UserTypeButtons
            candidateButton={this.state.candidateButton}
            employerButton={this.state.employerButton}
            adminButton={this.state.adminButton}
            selectUser={this.selectUser}
          />
          <input
            id="loginUser"
            className="login-input"
            placeholder={"User Email"}
          />
          <br></br>
          <input
            id="loginPassword"
            className="login-input"
            type="password"
            placeholder={"Password"}
          />
          <br></br>
          <button className="login-button" onClick={this.login}>
            Login
          </button>
        </div>
        <div className="signup-wrapper">
          Signup
          <UserTypeButtons
            candidateButton={this.state.candidateButton}
            employerButton={this.state.employerButton}
            adminButton={this.state.adminButton}
            selectUser={this.selectUser}
          />
          <input
            id="signupUser"
            className="login-input"
            placeholder={"Username"}
          />
          <br></br>
          <input
            id="signupEmail"
            className="login-input"
            placeholder={"Email"}
          />
          <br></br>
          <input
            id="signupPassword"
            className="login-input"
            type="password"
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
const UserTypeButtons = ({
  candidateButton,
  employerButton,
  adminButton,
  selectUser,
}) => {
  return (
    <div className="user-type-wrapper">
      <button
        className={candidateButton}
        onClick={() => {
          selectUser("student");
        }}
      >
        {" "}
        Candidate
      </button>
      <button
        className={employerButton}
        onClick={() => {
          selectUser("employer");
        }}
      >
        {" "}
        Employer
      </button>
      <button
        className={adminButton}
        onClick={() => {
          selectUser("admin");
        }}
      >
        {" "}
        Admin
      </button>
    </div>
  );
};
