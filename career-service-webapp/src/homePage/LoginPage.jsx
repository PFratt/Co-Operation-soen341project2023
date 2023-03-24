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
      loginToggle: "true",
    };
  }
  redirect = (response) => {
    this.props.cookies.set("authToken", response.data.accessToken, {
      maxAge: 3600,
    });
    this.props.cookies.set("userID", response.data.user.id, {
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
        console.log(response);
        this.redirect(response);
      })
      .catch(function (error) {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          alert("Try Visiting and Allowing sawongdomain.com in your browser");
          window.open("https://sawongdomain.com", "_blank", "noreferrer");
        }
        if (error.code === "ERR_BAD_REQUEST") {
          alert(error.response.data.message);
        }
      });
  };
  validEmail = () => {
    let comCheck = this.state.signupEmail.slice(-4);
    let caCheck = this.state.signupEmail.slice(-3);
    let emailEnd = comCheck === ".com" || caCheck === ".ca" ? true : false;
    console.log(comCheck);
    if (this.state.signupEmail.includes("@") && emailEnd) {
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
          if (error.code === "ERR_NETWORK") {
            alert("Try Visiting and Allowing sawongdomain.com in your browser");
            window.open("https://sawongdomain.com", "_blank", "noreferrer");
          }
          if (error.code === "ERR_BAD_REQUEST") {
            alert(error.response.data.message);
          }
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
  toggleLogin = () => {
    this.setState({ loginToggle: !this.state.loginToggle });
  };
  render() {
    let allowLoginSignup = this.checkDisplayLogin();

    return (
      <div className="login-page-container">
        <label className="toggle">
          <input type="checkbox" />
          <span className="slider"></span>
          <span
            class="labels"
            onClick={this.toggleLogin}
            data-on="Signup"
            data-off="Login"
          ></span>
        </label>
        {this.state.loginToggle ? (
          <div className="login-wrapper">
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
                <button className="login-button button-9 login" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="signup-wrapper">
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
                <button className="login-button button-9 login" type="submit">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        )}
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
        className={candidateButton + " button-9 usertype"}
        onClick={() => {
          selectUser("student");
        }}
      >
        {" "}
        Candidate
      </button>
      <button
        className={employerButton + " button-9 usertype"}
        onClick={() => {
          selectUser("employer");
        }}
      >
        {" "}
        Employer
      </button>
      <button
        className={adminButton + " button-9 usertype"}
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
