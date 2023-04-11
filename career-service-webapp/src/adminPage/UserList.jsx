import * as React from "react";

import { Table } from "react-bootstrap";
import { Icon } from "@fluentui/react/lib/Icon";
import UserProfile from "./UserProfile";
import axios from "axios";

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
      userList: [{ userID: "N/A" }],
      selectedUserID: "",
      profiles: [],
      selectUserProfile: null,
      userHeadline: "",
      userDescription: "",
      isStudent: false,
      newHeadline: "",
      newDescription: "",
      showModify: "none",
      wordCountHead: null,
      wordCountDescription: null
    };
    this.listUsers();
    this.getUserProfiles();
  }
  listUsers = async () => {
    axios
      .get(`https://sawongdomain.com/users`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
        },
      })
      .then((response) => {
        this.setState({ userList: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  getUserProfiles = () => {
    axios
      .get(`https://sawongdomain.com/profiles/`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
        },
      })
      .then((response) => {
        this.setState({ profiles: response.data });
        console.log("profiles array is: ", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  editAPI = () => {
    let data = {
      headline: this.state.userHeadline,
      description: this.state.userDescription,
    };
    axios
      .patch(
        `https://sawongdomain.com/modifyprofile/${this.state.selectedUserID}`,
        data,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: this.props.cookies.get("authToken"),
            "Access-Control-Allow-Headers": "Authorization",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  modify = () => {
      this.setState({ showModify: "block" });
  };
  cancelModify = () => {
    this.setState({ showModify: "none" });
  }
  saveEdits = () => {
    if (document.getElementById("headline").value.trim() != "") {
      this.setState({ userHeadline: this.state.newHeadline });
    }
    if (document.getElementById("description").value.trim() != "") {
      this.setState({ userDescription: this.state.newDescription });
    }
    setTimeout(() => {
      console.log("NEW SAVED HEADLINE IS : ");
      console.log(this.state.userHeadline);
      console.log("NEW SAVED DESCRIPTION IS : " + this.state.userDescription);
    }, 500);
    this.cancelModify();
  }
  saveModify = () => {
    this.saveEdits();
    setTimeout(() => {
      this.editAPI();
    }, 1);
  };
  userProfile = (name, email, usertype) => {
    return (
      <UserProfile
        userType={usertype}
        userName={name}
        userEmail={email}
        userHeadline={this.state.userHeadline}
        userDescription={this.state.userDescription}
        isStudent={this.state.isStudent}
        showModify={this.state.showModify}
        wordCountHead={this.state.wordCountHead}
        wordCountDescription={this.state.wordCountDescription}
        deleteUser={this.deleteUser}
        modify={this.modify}
        cancelModify={this.cancelModify}
        saveModify={this.saveModify}
        hideSelectedUser={this.hideSelectedUser}
        readHeadline={this.readHeadline}
        readDescription={this.readDescription}
      />
    );
  };
  mapfunctiontest = () => {
    console.log("maptest called");

    if (this.state.userList.length == 0) {
      return (
        <tr>
          <td align="center" colSpan="5">
            There are no job postings yet.
          </td>
        </tr>
      );
    } else
      return this.state.userList.map(({ name, email, usertype }) => {
        return (
          <tr>
            <td
              onClick={() => {
                this.setState({
                  selectedUser: {
                    name,
                    email,
                    usertype,
                  },
                });
                setTimeout(() => {
                  this.getUserProfile();
                }, 100);
              }}
            >
              {name}
            </td>
            <td>{email}</td>
            <td>{usertype}</td>
          </tr>
        );
      });
  };
  addUser = () => {
    alert("add user called");
  };
  getUserProfile = () => {
    this.getUserID();
    console.log("this is profiles:", this.state.profiles);
    for (let i = 0; i < this.state.profiles.length; i++){
      console.log("for ran");
      setTimeout(() => {
        if (this.state.profiles[i].userID == this.state.selectedUserID){
          this.setState({selectUserProfile: this.state.profiles[i]});
          this.setState({userHeadline: this.state.profiles[i].headline})
          this.setState({userDescription: this.state.profiles[i].description})
          console.log("headline is:", this.state.userHeadline);
        }
      }, 200)
    }
  }
  getUserID = () => {
    console.log("this is the userList: ", this.state.userList);
    console.log(this.state.selectedUser);
    for (let i = 0; i < this.state.userList.length; i++) {
      setTimeout(() => {
        if (
          this.state.userList[i].name == this.state.selectedUser.name &&
          this.state.userList[i].email == this.state.selectedUser.email &&
          this.state.userList[i].usertype == this.state.selectedUser.usertype
        )
        {
          this.setState({ selectedUserID: this.state.userList[i].id });
          console.log("selected User ID:", this.state.selectedUserID);
          if(this.state.userList[i].usertype == "student"){
            this.setState({isStudent: true})
          }
          else{
            this.setState({isStudent: false})
          }
        }
      }, 100)
    }
  }
  deleteUser = () => {
    console.log("deleteUser was called");
    this.getUserID();

    setTimeout(() => {
    axios
    .delete(
      `https://sawongdomain.com/deleteuser/${this.state.selectedUserID}`,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: this.props.cookies.get("authToken"),
          "Access-Control-Allow-Headers": "Authorization",
        },
      }
    )
      .then((response) => {
        console.log(response.data);
          window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    }, 1);
    alert("User deleted successfully.");
  };
  readHeadline = (inputHeadline) => {
    this.setState({ newHeadline: inputHeadline.target.value });
    this.setState({wordCountHead: this.getWordCount(inputHeadline.target.value),});
  };
  readDescription = (inputDescription) => {
    this.setState({ newDescription: inputDescription.target.value });
    this.setState({ wordCountDescription: this.getWordCount(inputDescription.target.value),});
  };
  hideSelectedUser = () => {
    this.setState({ selectedUser: null });
  };
  getWordCount = (str) => {
    return str.split(" ").filter(function (num) {
      return num != "";
    }).length;
  };
  render() {
    return (
      <div className="admin-page-container">
        {" "}
        <div className="user-list-wrapper">
          <Table className="job-list-table" striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>{this.mapfunctiontest()}</tbody>
          </Table>{" "}
        </div>
        <div className="job-application-wrapper">
          {this.state.selectedUser
            ? this.userProfile(
                this.state.selectedUser.name,
                this.state.selectedUser.email,
                this.state.selectedUser.usertype,
                this.state.userHeadline,
                this.state.userDescription,
                this.state.isStudent,
                this.state.showModify,
                this.state.wordCountHead,
                this.state.wordCountDescription
              )
            : null}
        </div>
        <div className="add-user-wrapper">
            
        </div>
      </div>
    );
  }
}
