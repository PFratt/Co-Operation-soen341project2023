import * as React from "react";

import { Table } from "react-bootstrap";
import { Icon } from "@fluentui/react/lib/Icon";
import UserProfile from "./UserProfile";
const fakeUserList = [
  {
    userType: "student",
    userName: "qian1",
    userEmail: "email.com ",
  },
  {
    userType: "employer",
    userName: "qian2",
    userEmail: "email.com",
  },
  {
    userType: "admin",
    userName: "qian3",
    userEmail: "email.com",
  },
  {
    userType: "student",
    userName: "qian4",
    userEmail: "email.com",
  },
  {
    userType: "student",
    userName: "qian5",
    userEmail: "email.comn",
  },
];
export default class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: null,
    };
  }
  listUsers = () => {
    console.log("maptest called");
    return fakeUserList.map(({ userType, userName, userEmail }) => {
      return (
        <tr>
          <td>{userType}</td>
          <td
            onClick={() => {
              this.setState({
                selectedUser: { userType, userName, userEmail },
              });
            }}
          >
            {userName}
          </td>
          <td>{userEmail}</td>
        </tr>
      );
    });
  };
  userProfile = (userType, userName, userEmail) => {
    return (
      <UserProfile
        userType={userType}
        userName={userName}
        userEmail={userEmail}
        deleteUser={this.deleteUser}
        hideSelectedUser={this.hideSelectedUser}
      />
    );
  };
  addUser = () => {
    alert("add user called");
  };
  deleteUser = () => {
    alert("remove user called");
  };
  hideSelectedUser = () => {
    this.setState({ selectedUser: null });
  };
  render() {
    return (
      <div className="admin-page-container">
        <div className="user-list-wrapper">
          <Table className="job-list-table" striped bordered hover>
            <thead>
              <tr>
                <th>UserType</th>
                <th>UserName</th>
                <th>UserEmail</th>
              </tr>
            </thead>
            <tbody>{this.listUsers()}</tbody>
          </Table>{" "}
          <button onClick={this.addUser}>add User</button>
        </div>
        <div className="job-application-wrapper">
          {this.state.selectedUser
            ? this.userProfile(
                this.state.selectedUser.userType,
                this.state.selectedUser.userName,
                this.state.selectedUser.userEmail
              )
            : null}
        </div>
      </div>
    );
  }
}
