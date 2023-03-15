import * as React from "react";
import axios from "axios";
import { Icon } from "@fluentui/react/lib/Icon";
import "./css/Home.css";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usertype: "",
      candidateButton: "",
      employerButton: "",
      adminButton: "",
      loginEmail: "",
      loginPassword: "",
      signupUsername: "",
      signupEmail: "",
      signupPassword: "",
    };
  }
  redirect = (response) => {
    this.props.cookies.set("authToken", response.data.accessToken, {
      maxAge: 3600,
    });
    this.props.cookies.set("userType", this.state.usertype, { maxAge: 3600 });
    window.location = "./";
  };
  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  };
  login = (event) => {
    event.preventDefault();

    let loginInfo = {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
      usertype: this.state.usertype,
    };
    console.log(loginInfo);

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
        if (error.code === "ERR_NETWORK") {
          alert("Try Visiting and Allowing sawongdomain.com in your browser");
          window.open("https://sawongdomain.com", "_blank", "noreferrer");
        }
      });
  };
  validEmail = () => {
    let comCheck = this.state.signupEmail.slice(-4);
    console.log(comCheck);
    if (this.state.signupEmail.includes("@") && comCheck === ".com") {
      return true;
    } else return false;
  };
  signUp = (event) => {
    event.preventDefault();
    if (this.validEmail()) {
      let signupInfo = {
        name: this.state.signupUsername,
        email: this.state.signupEmail,
        password: this.state.signupPassword,
        usertype: this.state.usertype,
      };
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
          console.log(error.code);
        });
    } else {
      alert("enter valid email");
    }
  };
  selectUser = (name) => {
    this.setState({
      usertype: name,
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
  checkDisplayLogin = () => {
    if (
      this.state.employerButton != "" ||
      this.state.candidateButton != "" ||
      this.state.adminButton != ""
    ) {
      return "login-true";
    } else return "login-false";
  };
  render() {
    let allowLoginSignup = this.checkDisplayLogin();

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
          <div className={allowLoginSignup}>
            <form onSubmit={this.login}>
              <input
                name="loginEmail"
                className="login-input"
                placeholder={"User Email"}
                value={this.state.loginEmail}
                onChange={this.handleInputChange}
              />
              <br></br>
              <input
                name="loginPassword"
                className="login-input"
                type="password"
                placeholder={"Password"}
                value={this.state.loginPassword}
                onChange={this.handleInputChange}
              />
              <br></br>
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="signup-wrapper">
          Signup
          <UserTypeButtons
            candidateButton={this.state.candidateButton}
            employerButton={this.state.employerButton}
            adminButton={this.state.adminButton}
            selectUser={this.selectUser}
          />
          <div className={allowLoginSignup}>
            <form onSubmit={this.signUp}>
              <input
                name="signupUsername"
                className="login-input"
                placeholder={"Full Name"}
                value={this.state.signupUsername}
                onChange={this.handleInputChange}
              />
              <br></br>
              <input
                name="signupEmail"
                className="login-input"
                placeholder={"Email"}
                value={this.state.signupEmail}
                onChange={this.handleInputChange}
              />
              <br></br>
              <input
                name="signupPassword"
                className="login-input"
                type="password"
                placeholder={"Password"}
                value={this.state.signupPassword}
                onChange={this.handleInputChange}
              />
              <br></br>
              <button className="login-button" type="submit">
                Sign up
              </button>
            </form>
          </div>
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
