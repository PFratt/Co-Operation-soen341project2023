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
    };
    this.listUsers();
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
  modify = () => {};
  userProfile = (name, email, usertype) => {
    return (
      <UserProfile
        userType={usertype}
        userName={name}
        userEmail={email}
        deleteUser={this.deleteUser}
        modify={this.modify}
        hideSelectedUser={this.hideSelectedUser}
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
  deleteUser = () => {
    alert("remove user called");
  };
  hideSelectedUser = () => {
    this.setState({ selectedUser: null });
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
                this.state.selectedUser.usertype
              )
            : null}
        </div>
      </div>
    );
  }
}
